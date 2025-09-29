const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse application/json
app.use(bodyParser.json());

// 📌 مسار الاستقبال للـ webhook
app.post('/webhook', (req, res) => {
  const logPath = path.join(__dirname, 'webhook.log');
  const payload = {
    timestamp: new Date().toISOString(),
    company: req.body.company || "Al-azab.co",
    event: req.body.event,
    email: req.body.email,
    status: req.body.status
  };

  // ✍️ كتابة في ملف لوج
  fs.appendFileSync(logPath, JSON.stringify(payload) + '\n', 'utf8');

  console.log("📩 Webhook received:", payload);
  res.status(200).send({ message: 'Webhook received successfully', data: payload });
});

app.listen(PORT, () => {
  console.log(`🚀 Al-azab.co Webhook server running on http://localhost:${PORT}`);
});
