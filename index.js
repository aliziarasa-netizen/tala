const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
    try {
        // لینک اصلی BrsApi خودت که توکن داره رو اینجا بذار
        const response = await axios.get('https://Api.BrsApi.ir/Market/Gold_Currency.php?key=BZebdMkfZGGIPMjAIz5UcN6qiJzsLixi');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "خطا در ارتباط با سرور مبدا" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Bridge is running on port ${port}`);
});
