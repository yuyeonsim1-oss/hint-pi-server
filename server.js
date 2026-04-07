const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const PI_API_KEY = process.env.PI_API_KEY;
app.get("/", (req, res) => {
  res.send("Pi payment server running");
});


app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    res.send({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "approve failed" });
  }
});
app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    res.send({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "complete failed" });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {   
  console.log("server running on " + PORT);
});
