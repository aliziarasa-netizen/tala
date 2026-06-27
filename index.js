const express = require('express');
const axios = require('axios');
const app = express();

// ۱. لینک کامل BrsApi خودت را اینجا بذار
const BRS_API_URL = 'https://Api.BrsApi.ir/Market/Gold_Currency.php?key=BZebdMkfZGGIPMjAIz5UcN6qiJzsLixi';

// ۲. ساب‌دامین اختصاصی جدیدت که به ورکر تستی وصل کردی
const TEST_WORKER_URL = 'https://tala.chat0003.ir';

app.get('/', async (req, res) => {
    let brsData;

    // مرحله اول: تست دریافت از BrsApi (داخل ایران)
    try {
        const response = await axios.get(BRS_API_URL, { timeout: 15000 });
        brsData = response.data;
    } catch (error) {
        return res.status(500).send("❌ ارور در مرحله ۱ (گرفتن دیتا از BrsApi): " + error.message);
    }

    // مرحله دوم: تست ارسال به کلادفلر از طریق ساب‌دامین اختصاصی (بدون فیلتر)
    try {
        await axios.post(TEST_WORKER_URL, brsData, { timeout: 15000 });
    } catch (error) {
        return res.status(500).send("❌ ارور در مرحله ۲ (شوت کردن به کلادفلر): " + error.message);
    }

    // اگه مسیر کاملاً باز باشه
    res.send("✅ شاهکار کردی حاجی! اطلاعات با موفقیت به کلادفلر شلیک شد و قفل شبکه شکست.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Test Push Bridge is running on port ${port}`);
});
