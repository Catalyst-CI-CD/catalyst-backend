import express from "express";
import "dotenv/config";

// import { DatabaseManager } from "./config/db";
import { router } from "./routes/users.route";

const app = express();

//  connect to db
// const prisma = new DatabaseManager();
// global.prisma = prisma;

app.use(express.json());

// routes
app.use("/api/v1/users/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
