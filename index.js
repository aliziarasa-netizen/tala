const express = require('express');
const axios = require('axios');
const app = express();

// ۱. لینک کامل BrsApi خودت
const BRS_API_URL = 'https://Api.BrsApi.ir/Market/Gold_Currency.php?key=BZebdMkfZGGIPMjAIz5UcN6qiJzsLixi';

// ۲. لینک ورکر تستی کلادفلر
const TEST_WORKER_URL = 'https://testpooool.aliziaye1382.workers.dev/';

app.get('/', async (req, res) => {
    let brsData;

    // مرحله اول: تست دریافت از BrsApi
    try {
        const response = await axios.get(BRS_API_URL, { timeout: 15000 });
        brsData = response.data;
    } catch (error) {
        return res.status(500).send("❌ ارور در مرحله ۱ (گرفتن دیتا از BrsApi): " + error.message);
    }

    // مرحله دوم: تست ارسال به کلادفلر
    try {
        await axios.post(TEST_WORKER_URL, brsData, { timeout: 15000 });
    } catch (error) {
        return res.status(500).send("❌ ارور در مرحله ۲ (شوت کردن به کلادفلر): " + error.message);
    }

    // اگه از هر دو مرحله جون سالم به در برد
    res.send("✅ تست با موفقیت انجام شد! اطلاعات شلیک شد به کلادفلر.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Test Push Bridge is running on port ${port}`);
});
