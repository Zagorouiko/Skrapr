import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/reviews";
import 'dotenv/config'
require('dotenv').config()

const router: Express = express();

/** Logging */
router.use(morgan("dev"));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept, Authorization");
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
  }
  next();
});

const port = process.env.PORT || 3000;

router.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/** Routes */
router.use("/", routes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});