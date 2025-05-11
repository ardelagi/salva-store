
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Bot is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Uptime monitoring active on port ${PORT}`);
});
