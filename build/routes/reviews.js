"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const reviews_1 = __importDefault(require("../controllers/reviews"));
const router = express_1.default.Router();
router.get("/reviews/Android/:app", reviews_1.default.getAndroidReviews);
router.get("/reviews/iOS/:app", reviews_1.default.getiOSReviews);
module.exports = router;
