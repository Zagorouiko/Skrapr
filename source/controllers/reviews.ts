import { Request, Response, NextFunction } from "express";
import playStoreScraper from "../PlayStoreScraper";
import AppleScraper from "../AppleStoreScraper";

interface Review {
  version: String | null;
  date: String;
  rating: String;
  review: String;
}

const getAndroidReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const appName: string = req.params.app;
  const filters = req.query;
  let reviews: Review[] | undefined = await playStoreScraper(
    `https://play.google.com/store/apps/details?id=com.${appName}`
  );

  if (reviews) {
    //Filter by rating & date
    if (filters.rating && (filters.beforeDate || filters.afterDate)) {
      let dateFiltered;
      const ratingFiltered = reviews.filter(function (review: any) {
        if (review.rating.includes(filters.rating)) {
          return review;
        }
      });

      if (filters.afterDate) {
        const afterDate: number = Date.parse(filters.afterDate.toString());
        dateFiltered = ratingFiltered.filter(function (review: any) {
          const reviewDate = Date.parse(review.date);
          if (reviewDate >= afterDate) {
            return review;
          }
        });
      }

      if (filters.beforeDate) {
        const beforeDate: number = Date.parse(filters.beforeDate.toString());
        dateFiltered = ratingFiltered.filter(function (review: any) {
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
      const ratingFiltered = reviews.filter(function (review: any) {
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
      const beforeDate: number = Date.parse(filters.beforeDate.toString());
      const dateFiltered = reviews.filter(function (review: any) {
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
      const afterDate: number = Date.parse(filters.afterDate.toString());
      const dateFiltered = reviews.filter(function (review: any) {
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
};

const getiOSReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = req.params.app;
  const filters = req.query;
  let reviews: Review[] = await AppleScraper(id);
  if (reviews) {
    //Filter by rating & date
    if (filters.rating && (filters.beforeDate || filters.afterDate)) {
      let dateFiltered;
      const ratingFiltered = reviews.filter(function (review: any) {
        if (review.rating.includes(filters.rating)) {
          return review;
        }
      });

      if (filters.afterDate) {
        const afterDate: number = Date.parse(filters.afterDate.toString());
        dateFiltered = ratingFiltered.filter(function (review: any) {
          const reviewDate = Date.parse(review.date);
          if (reviewDate >= afterDate) {
            return review;
          }
        });
      }

      if (filters.beforeDate) {
        const beforeDate: number = Date.parse(filters.beforeDate.toString());
        dateFiltered = ratingFiltered.filter(function (review: any) {
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
      const ratingFiltered = reviews.filter(function (review: any) {
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
      const beforeDate: number = Date.parse(filters.beforeDate.toString());
      const dateFiltered = reviews.filter(function (review: any) {
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
      const afterDate: number = Date.parse(filters.afterDate.toString());
      const dateFiltered = reviews.filter(function (review: any) {
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
};

export default { getiOSReviews, getAndroidReviews };
