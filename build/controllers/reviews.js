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
const PlayStoreScraper_1 = __importDefault(require("../PlayStoreScraper"));
const AppleStoreScraper_1 = __importDefault(require("../AppleStoreScraper"));
const getAndroidReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const appName = req.params.app;
    const filters = req.query;
    let reviews = yield (0, PlayStoreScraper_1.default)(`https://play.google.com/store/apps/details?id=com.${appName}`);
    if (reviews) {
        //Filter by rating & date
        if (filters.rating && (filters.beforeDate || filters.afterDate)) {
            let dateFiltered;
            const ratingFiltered = reviews.filter(function (review) {
                if (review.rating.includes(filters.rating)) {
                    return review;
                }
            });
            if (filters.afterDate) {
                const afterDate = Date.parse(filters.afterDate.toString());
                dateFiltered = ratingFiltered.filter(function (review) {
                    const reviewDate = Date.parse(review.date);
                    if (reviewDate >= afterDate) {
                        return review;
                    }
                });
            }
            if (filters.beforeDate) {
                const beforeDate = Date.parse(filters.beforeDate.toString());
                dateFiltered = ratingFiltered.filter(function (review) {
                    const reviewDate = Date.parse(review.date);
                    if (reviewDate <= beforeDate) {
                        return review;
                    }
                });
            }
            return res.status(200).json({
                message: dateFiltered,
            });
        }
        //Filter by rating
        if (filters.rating) {
            const ratingFiltered = reviews.filter(function (review) {
                if (review.rating.includes(filters.rating)) {
                    return review;
                }
            });
            return res.status(200).json({
                message: ratingFiltered,
            });
        }
        //Filter before this date
        if (filters.beforeDate) {
            const beforeDate = Date.parse(filters.beforeDate.toString());
            const dateFiltered = reviews.filter(function (review) {
                const reviewDate = Date.parse(review.date);
                if (reviewDate <= beforeDate) {
                    return review;
                }
                return reviewDate;
            });
            return res.status(200).json({
                message: dateFiltered,
            });
        }
        //Filter after this date
        if (filters.afterDate) {
            const afterDate = Date.parse(filters.afterDate.toString());
            const dateFiltered = reviews.filter(function (review) {
                const reviewDate = Date.parse(review.date);
                if (reviewDate >= afterDate) {
                    return review;
                }
                return reviewDate;
            });
            return res.status(200).json({
                message: dateFiltered,
            });
        }
        //Return all reviews
        if (!filters.date && !filters.rating) {
            return res.status(200).json({
                message: reviews,
            });
        }
    }
});
const getiOSReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.app;
    const filters = req.query;
    let reviews = yield (0, AppleStoreScraper_1.default)(id);
    if (reviews) {
        //Filter by rating & date
        if (filters.rating && (filters.beforeDate || filters.afterDate)) {
            let dateFiltered;
            const ratingFiltered = reviews.filter(function (review) {
                if (review.rating.includes(filters.rating)) {
                    return review;
                }
            });
            if (filters.afterDate) {
                const afterDate = Date.parse(filters.afterDate.toString());
                dateFiltered = ratingFiltered.filter(function (review) {
                    const reviewDate = Date.parse(review.date);
                    if (reviewDate >= afterDate) {
                        return review;
                    }
                });
            }
            if (filters.beforeDate) {
                const beforeDate = Date.parse(filters.beforeDate.toString());
                dateFiltered = ratingFiltered.filter(function (review) {
                    const reviewDate = Date.parse(review.date);
                    if (reviewDate <= beforeDate) {
                        return review;
                    }
                });
            }
            return res.status(200).json({
                message: dateFiltered,
            });
        }
        //Filter by rating
        if (filters.rating) {
            const ratingFiltered = reviews.filter(function (review) {
                if (review.rating.includes(filters.rating)) {
                    return review;
                }
            });
            return res.status(200).json({
                message: ratingFiltered,
            });
        }
        //Filter before this date
        if (filters.beforeDate) {
            const beforeDate = Date.parse(filters.beforeDate.toString());
            const dateFiltered = reviews.filter(function (review) {
                const reviewDate = Date.parse(review.date);
                if (reviewDate <= beforeDate) {
                    return review;
                }
            });
            return res.status(200).json({
                message: dateFiltered,
            });
        }
        //Filter after this date
        if (filters.afterDate) {
            const afterDate = Date.parse(filters.afterDate.toString());
            const dateFiltered = reviews.filter(function (review) {
                const reviewDate = Date.parse(review.date);
                if (reviewDate >= afterDate) {
                    return review;
                }
            });
            return res.status(200).json({
                message: dateFiltered,
            });
        }
        //Return all reviews
        if (!filters.date && !filters.rating) {
            return res.status(200).json({
                message: reviews,
            });
        }
    }
});
exports.default = { getiOSReviews, getAndroidReviews };
