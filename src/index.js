import express from "express";
import downloadRoute from "./routes/download.js";

const app = express();
app.use(express.json());

app.use("/download", downloadRoute);

app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});