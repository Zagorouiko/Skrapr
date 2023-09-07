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
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
function AppleScraper(appID, rating, date) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("testing");
        let entriesArray = [];
        for (let j = 0; j < 10; j++) {
            let jsonFeed = yield axios.get(`https://itunes.apple.com/us/rss/customerreviews/page=${j + 1}/id=${appID}/sortby=mostrecent/json`);
            for (let i = 0; i < jsonFeed.data.feed.entry.length; i++) {
                let entry = jsonFeed.data.feed.entry[i];
                let reviewObject = {
                    version: entry["im:version"].label,
                    date: entry.updated.label,
                    rating: entry["im:rating"].label,
                    review: entry.content.label,
                };
                entriesArray.push(reviewObject);
            }
        }
        return entriesArray;
    });
}
exports.default = AppleScraper;
