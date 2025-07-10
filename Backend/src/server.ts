import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect(env.MONGODB_CONNECTION_STRING)
    .then( () => {
        console.log("MongoDB connected successfully");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } )
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });



