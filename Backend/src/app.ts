import "dotenv/config";
import express , {NextFunction, Response, Request} from "express"
import wordRouter from "./routes/vocabulary.router";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());


// app.get("/", (req, res) => {
//     res.send("Hello, World!");
// });

app.use("/api/words", wordRouter);

app.use((req, res, next)=>{
    next(new Error("route not found"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err : unknown, req : Request, res : Response, next : NextFunction)=>{
    let errorMessage = "An unknown error occurred";
    if(err instanceof Error) errorMessage = err.message
    res.status(500).json({error: errorMessage})
})

export default app