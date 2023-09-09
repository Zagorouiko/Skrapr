const axios = require("axios");

interface Review {
  version: String | null;
  date: String;
  rating: String;
  review: String;
}

export default async function AppleScraper(
  appID: string,
  rating?: string,
  date?: string
) {
  let entriesArray: Review[] = [];
  for (let j = 0; j < 10; j++) {
    let jsonFeed = await axios.get(
      `https://itunes.apple.com/us/rss/customerreviews/page=${
        j + 1
      }/id=${appID}/sortby=mostrecent/json`
    );

    if (!jsonFeed.data.feed.entry) { break }
    
    for (let i = 0; i < jsonFeed.data.feed.entry.length; i++) {
      let entry = jsonFeed.data.feed.entry[i];
      let reviewObject: Review = {
        version: entry["im:version"].label,
        date: entry.updated.label,
        rating: entry["im:rating"].label,
        review: entry.content.label,
      };
      entriesArray.push(reviewObject);
    }
  }
  return entriesArray;
}
