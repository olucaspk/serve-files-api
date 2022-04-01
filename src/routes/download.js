import express from "express";
import chalk from "chalk";
import fs from "fs";
import "dotenv/config";

const router = express.Router();

router.get("/", (req, res) => {
    if (!req.body.developerPassword || !req.body.script || !req.body.module) {
        res.status(404).send("Bad request");
        console.log(`${chalk.bold.red("BAD REQUEST")} Parameters ${JSON.stringify(req.body)}`);
        return;
    }

    const { developerPassword, script, module } = req.body;
    if (developerPassword != process.env.DEVELOPER_PASSWORD) {
        res.status(401).send("Authorization is mandatory");
        console.log(`${chalk.bold.red("UNAUTHORIZED")} Parameters ${JSON.stringify(req.body)}`);
        return;
    }

    const fileDirectory = `./src/resources/dist/${script}/${module}`;
    if (!fs.existsSync(fileDirectory)) {
        res.status(501).send("File doesn't exists");
        console.log(`${chalk.bold.red("NOT IMPLEMENTED")} Parameters ${JSON.stringify(req.body)}`);
        return;
    }

    res.status(200).download(fileDirectory);
});

export default router;