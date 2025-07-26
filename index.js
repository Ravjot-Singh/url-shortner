import 'dotenv/config'
import cors from 'cors';
import mongoose from "mongoose";
import express from "express";
import UrlRoutes from "./src/routes/URL.routes.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/url", UrlRoutes);


app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message: message,
        error: err,
    });
});


(async () => {
    try {

        await mongoose.connect(`${process.env.MONGODB_URL}URLs`);

        app.listen(process.env.PORT || 8000, () => {
            console.log(`app is listening on port ${process.env.PORT || 8000}`);
        });

        app.on("error", (error) => {
            console.log("Error occurred in app");
            throw error;
        });

    } catch (error) {
        console.error("ERROR in DB connection or app setup:", error);
        process.exit(1);
    }
})();
