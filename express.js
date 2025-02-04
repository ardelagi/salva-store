const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Bot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Uptime monitoring active on port ${PORT}`);
});