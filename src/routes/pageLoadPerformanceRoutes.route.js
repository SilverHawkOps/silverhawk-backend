// routes/infraRoutes.js
import express from "express";
import lighthouse from "lighthouse";
import * as ChromeLauncher from "chrome-launcher";

const infraRoutes = express.Router();

infraRoutes.post("/", async (req, res) => {
  try {
    // Launch Chrome
    const chrome = await ChromeLauncher.launch({ chromeFlags: ["--headless"] });

    const options = {
      logLevel: "info",
      output: "json", // can also be "html"
      onlyCategories: ["performance"], // categories; "accessibility", "best-practices", "seo"
      port: chrome.port,
    };

    const runnerResult = await lighthouse(req.body.url, options);

    const { lhr } = runnerResult;

    await chrome.kill();

    return res.status(200).json(lhr);
  } catch (error) {
    console.log(error);

    res.status(500).json({
        message: "someting went wrong"
    })
  }
});

export default infraRoutes;
