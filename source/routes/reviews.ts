import express from "express";
import controller from "../controllers/reviews";
const router = express.Router();

router.get("/reviews/Android/:app", async (req, res, next) => {
    try {
      const androidReviews = await controller.getAndroidReviews(req, res, next);
      res.json(androidReviews);
    } catch (error) {
      next(error); 
    }
  });

router.get("/reviews/iOS/:app", async (req, res, next) => {
    try {
      const iOSReviews = await controller.getiOSReviews(req, res, next);
      res.json(iOSReviews);
    } catch (error) {
      next(error);
    }
  });

export = router;
