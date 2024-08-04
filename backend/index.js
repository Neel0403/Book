import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

// connect mongodb
try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB CONNECTED");
} catch (error) {
    console.log("Error: ", error);
}

// routes
import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"

app.use("/book", bookRoute);
app.use("/user", userRoute);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})