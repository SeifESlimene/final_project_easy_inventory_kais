import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export const connectDb = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        throw err;
      }
      console.log("DataBase connected .....");
    }
  );
};
