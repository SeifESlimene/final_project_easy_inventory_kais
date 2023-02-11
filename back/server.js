import express from "express";
import cors from "cors";
import morgan from "morgan";

import { login } from "./routes/login.js";
import { register } from "./routes/register.js";
import { invoice } from "./routes/invoice.js";
import { product } from "./routes/product.js";
import { products } from "./routes/products.js";
import { user } from "./routes/user.js";
import { post } from "./routes/post.js";

import { connectDb } from "./helpers/connectdb.js";
import authorized from "./helpers/authmiddleware.js";
import { permitted } from "./helpers/rolemiddleware.js";



// Initialize express app
const app = express();

// Connect Database
connectDb();

app.get("/", (req, res) => {
  res.send("Hello From Server!");
});

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/register", register);
app.use("/login", login);
app.use("/post", post);
app.use("/products", products);
app.use("/invoice", invoice);
app.use("/user", user);
app.use("/product", authorized, permitted, product);

const PORT = process.env.PORT || 5008;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
