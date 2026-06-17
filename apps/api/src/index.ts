import express from "express";
import cors from "cors";
import userRoutes from "./modules/auth/auth.routes.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
