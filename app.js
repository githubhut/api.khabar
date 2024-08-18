const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; // You can use any port you prefer

// Middleware to handle JSON request bodies
app.use(express.json());

app.get('/',async (req,res)=>{
    res.json({"message":"ok"});
})

// Define a route to query the external API
app.get('/api/data', async (req, res) => {
  try {
    const category=req.query.category;
    const p = req.query.page;
    const pageSize=req.query.pageSize;
    // Replace with the actual API URL you want to query
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=3705a1cedf15419caaa898fb5f01a905&page=${p}&pageSize=${pageSize}`;

    // Make a GET request to the external API
    const response = await axios.get(apiUrl);

    // Send the JSON response from the external API back to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error querying external API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
