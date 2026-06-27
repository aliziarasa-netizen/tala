const express = require('express');
const axios = require('axios');
const app = express();

// ۱. لینک کامل BrsApi خودت رو اینجا بذار
const BRS_API_URL = 'https://Api.BrsApi.ir/Market/Gold_Currency.php?key=BZebdMkfZGGIPMjAIz5UcN6qiJzsLixi';

// ۲. لینک ورکر تستی کلادفلرت رو اینجا بذار
const TEST_WORKER_URL = 'https://testpooool.aliziaye1382.workers.dev/';

app.get('/', async (req, res) => {
    try {
        // دریافت دیتا از BrsApi (داخل ایران)
        const response = await axios.get(BRS_API_URL);
        
        // شوت کردن دیتا برای ورکر تستی کلادفلر
        await axios.post(TEST_WORKER_URL, response.data);
        
        res.send("✅ تست با موفقیت انجام شد! اطلاعات از ران‌فلر به ورکر تستی کلادفلر شلیک شد.");
    } catch (error) {
        res.status(500).send("❌ خطا در سمت ران‌فلر: " + error.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Test Push Bridge is running on port ${port}`);
});
