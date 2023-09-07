"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = __importDefault(require("./browser"));
function scraper(appUrl, _rating, _date) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield (0, browser_1.default)();
        if (!browser) {
            return;
        }
        let page = yield browser.newPage();
        console.log(`Navigating to ${appUrl}...`);
        yield page.goto(appUrl);
        // Wait for the reviews section to load
        yield page.waitForSelector(".tU8Y5c");
        // Open/click the "See all Reviews" modal
        let linkElements = yield page.$$(".VfPpkd-vQzf8d");
        for (let j = 0; j < linkElements.length; j++) {
            let text = yield page.evaluate((link) => link.innerText, linkElements[j]);
            if (text.indexOf("See all reviews") > -1) {
                yield linkElements[j].click();
            }
        }
        // Wait for the modal to load
        yield page.waitForSelector(".VfPpkd-cnG4Wd");
        function grabReviews(page, _rating, _date) {
            return __awaiter(this, void 0, void 0, function* () {
                const reviews = yield page.evaluate((evalRating, evalDate) => {
                    const reviewElements = document.querySelectorAll(".RHo1pe");
                    const ratingElements = document.querySelectorAll(".iXRFPc");
                    const dateElements = document.querySelectorAll(".bp9Aid");
                    let reviews = [];
                    let rating;
                    let date;
                    let review;
                    // First 3 reviews repeat on the front page so iteration must be offset
                    for (let n = 3; n < reviewElements.length; n++) {
                        rating = ratingElements[n].getAttribute("aria-label");
                        date = dateElements[n].innerText;
                        if (n < 6) {
                            const reviewElement = reviewElements[n - 3].querySelector(".h3YV2d");
                            review = reviewElement
                                ? reviewElement.innerText
                                : null;
                        }
                        else {
                            const reviewElement = reviewElements[n - 3].querySelector(".h3YV2d");
                            review = reviewElement
                                ? reviewElement.innerText
                                : null;
                        }
                        if (!review || !rating || !date) {
                            continue;
                        }
                        let obj = {
                            version: null,
                            date: date,
                            rating: rating,
                            review: review,
                        };
                        reviews.push(obj);
                    }
                    return reviews;
                });
                return reviews;
            });
        }
        const targetDivClassName = "fysCi";
        const scrollTargetDivToBottom = () => __awaiter(this, void 0, void 0, function* () {
            yield page.evaluate((targetDivClassName) => {
                const targetDiv = document.querySelector(`.${targetDivClassName}`);
                if (targetDiv) {
                    targetDiv.scrollTop = targetDiv.scrollHeight;
                }
            }, targetDivClassName);
        });
        // Scroll down the infinite loading modal
        let previousHeight = 0;
        let currentHeight = yield page.evaluate((targetDivClassName) => {
            const targetDiv = document.querySelector(`.${targetDivClassName}`);
            return targetDiv ? targetDiv.scrollHeight : 0;
        }, targetDivClassName);
        while (previousHeight !== currentHeight) {
            yield scrollTargetDivToBottom();
            yield page.waitForTimeout(1000); // Wait for a brief moment for new content to load
            previousHeight = currentHeight;
            currentHeight = yield page.evaluate((targetDivClassName) => {
                const targetDiv = document.querySelector(`.${targetDivClassName}`);
                return targetDiv ? targetDiv.scrollHeight : 0;
            }, targetDivClassName);
        }
        console.log(_rating, _date);
        return yield grabReviews(page, _rating, _date);
    });
}
exports.default = scraper;
