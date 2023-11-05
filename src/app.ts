import express from "express";

import { globalErrorHandler } from "./middlewares/errorHandler/globalErrorHandler.middleware";
import { undefinedRoutesErrorHandler } from "./middlewares/errorHandler/undefinedRoutes.middleware";
import { userRouter } from "./routes/users.route";
import morganMiddleware from "./middlewares/morgan.middleware";

export const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morganMiddleware);
}

// Mount routes
app.use("/api/v1/users/", userRouter);

// Undefined Routes and Global Error Handler
app.all("*", undefinedRoutesErrorHandler);
app.use(globalErrorHandler);
