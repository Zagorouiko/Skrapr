import browserObject from "./browser";

interface Review {
  version: String | null;
  date: String;
  rating: String;
  review: String;
}

export default async function scraper(
  appUrl: string,
  _rating?: string,
  _date?: string
) {
  const browser = await browserObject();
  if (!browser) {
    return;
  }
  let page = await browser.newPage();
  console.log(`Navigating to ${appUrl}...`);
  await page.goto(appUrl);

  // Wait for the reviews section to load
  await page.waitForSelector(".tU8Y5c");

  // Open/click the "See all Reviews" modal
  let linkElements = await page.$$(".VfPpkd-vQzf8d");

  for (let j = 0; j < linkElements.length; j++) {
    let text = await page.evaluate(
      (link: any) => link.innerText,
      linkElements[j]
    );
    if (text.indexOf("See all reviews") > -1) {
      await linkElements[j].click();
    }
  }
  // Wait for the modal to load
  await page.waitForSelector(".VfPpkd-cnG4Wd");

  async function grabReviews(page: any, _rating?: string, _date?: string) {
    const reviews: Review[] = await page.evaluate(
      (evalRating: string, evalDate: string) => {
        const reviewElements = document.querySelectorAll(".RHo1pe");
        const ratingElements = document.querySelectorAll(".iXRFPc");
        const dateElements = document.querySelectorAll(".bp9Aid");
        let reviews = [];
        let rating;
        let date;
        let review: string | null | undefined;

        // First 3 reviews repeat on the front page so iteration must be offset
        for (let n = 3; n < reviewElements.length; n++) {
          rating = ratingElements[n].getAttribute("aria-label");
          date = (dateElements[n] as HTMLElement).innerText;

          if (n < 6) {
            const reviewElement =
              reviewElements[n - 3].querySelector(".h3YV2d");
            review = reviewElement
              ? (reviewElement as HTMLElement).innerText
              : null;
          } else {
            const reviewElement =
              reviewElements[n - 3].querySelector(".h3YV2d");
            review = reviewElement
              ? (reviewElement as HTMLElement).innerText
              : null;
          }

          if (!review || !rating || !date) {
            continue;
          }

          let obj: Review = {
            version: null,
            date: date,
            rating: rating,
            review: review,
          };

          reviews.push(obj);
        }
        return reviews;
      }
    );

    return reviews;
  }

  const targetDivClassName = "fysCi";
  const scrollTargetDivToBottom = async () => {
    await page.evaluate((targetDivClassName: string) => {
      const targetDiv = document.querySelector(`.${targetDivClassName}`);
      if (targetDiv) {
        targetDiv.scrollTop = targetDiv.scrollHeight;
      }
    }, targetDivClassName);
  };

  // Scroll down the infinite loading modal
  let previousHeight = 0;
  let currentHeight = await page.evaluate((targetDivClassName: string) => {
    const targetDiv = document.querySelector(`.${targetDivClassName}`);
    return targetDiv ? targetDiv.scrollHeight : 0;
  }, targetDivClassName);

  while (previousHeight !== currentHeight) {
    await scrollTargetDivToBottom();
    await page.waitForTimeout(1000); // Wait for a brief moment for new content to load

    previousHeight = currentHeight;
    currentHeight = await page.evaluate((targetDivClassName: string) => {
      const targetDiv = document.querySelector(`.${targetDivClassName}`);
      return targetDiv ? targetDiv.scrollHeight : 0;
    }, targetDivClassName);
  }
  console.log(_rating, _date);
  return await grabReviews(page, _rating, _date);
}
