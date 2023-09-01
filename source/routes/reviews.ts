import express from "express";
import controller from "../controllers/reviews";
const router = express.Router();

router.get("/reviews/Android/:app", controller.getAndroidReviews);
router.get("/reviews/iOS/:app", controller.getiOSReviews);

export = router;
