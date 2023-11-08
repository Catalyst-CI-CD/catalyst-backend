import express from "express";

import { userRouter } from "./routes/users.route";
import morganMiddleware from "./middlewares/morgan.middleware";
import { globalErrorHandler } from "./middlewares/globalError.middleware";
export const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morganMiddleware);
}

// Mount routes
app.use("/api/v1/users/", userRouter);


app.use(globalErrorHandler);
