const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// File path to store visit count
const VISIT_COUNT_FILE = './visitCount.json';

// Middleware to serve static files (your HTML and other assets)
app.use(express.static('public'));

// Endpoint to get the current visit count
app.get('/api/visit-count', (req, res) => {
  fs.readFile(VISIT_COUNT_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading visit count');
    }
    const visitData = JSON.parse(data);
    res.json(visitData);
  });
});

// Endpoint to increment the visit count
app.post('/api/increment-visit', (req, res) => {
  fs.readFile(VISIT_COUNT_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading visit count');
    }
    const visitData = JSON.parse(data);
    visitData.count += 1;

    fs.writeFile(VISIT_COUNT_FILE, JSON.stringify(visitData), (err) => {
      if (err) {
        return res.status(500).send('Error saving visit count');
      }
      res.json({ count: visitData.count });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
