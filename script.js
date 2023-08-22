const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;


app.use(express.json());

async function fetchNumbersFromURL(url) {
  try {
    const response = await axios.get(url, { timeout: 500 });
    if (response.status === 200) {
      return response.data.numbers || [];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

app.get('/numbers', async (req, res) => {
  const urls = req.query.url || []; 
  const mergedNumbers = [];

  for (const url of urls) {
    const numbers = await fetchNumbersFromURL(url);
    mergedNumbers.push(...numbers);
  }

  
  const uniqueNumbers = Array.from(new Set(mergedNumbers)).sort((a, b) => a - b);

  res.json({ numbers: uniqueNumbers }); 
});

app.listen(port, () => {
  console.log(`Number Management Service listening at http://localhost:${port}`);
});