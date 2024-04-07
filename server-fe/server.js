const express = require('express');
const cors = require('cors');
const app = express();
const https = require("https");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const port = 3001;

app.use(express.json());
app.use(cors())
app.post("/api/search", async (req, res) => {
  //   const id = req.params.id;
  const targetUrl = `https://localhost:9200/ce-search-api-vector-index0/_search`;
  console.log("Received request:", req.method, req.url);

  const OPEN_SEARCH_USERNAME = "ce-search-api";
  const OPEN_SEARCH_PASSWORD = process.env.OPENSEARCH_PASSWORD;

  try {
    const response = await axios({
      method: "POST",
      url: targetUrl,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${OPEN_SEARCH_USERNAME}:${OPEN_SEARCH_PASSWORD}`).toString("base64"),
      },
      httpsAgent: agent,
    });

    console.log("Proxy response:", response.status, response.data)

    // Forward the API response to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    console.log(JSON.stringify(error.response, null, 2));
    console.error("Proxy error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server Proxy FE is running on ${port}`);
})