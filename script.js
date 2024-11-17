// جلب بيانات أسعار العملات عبر API
async function fetchExchangeRates() {
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        return data.rates;
    } catch (error) {
        alert("حدث خطأ أثناء تحميل أسعار العملات.");
        return {};
    }
}

// قائمة أسماء العملات باللغتين العربية والإنجليزية
const currencyNames = {
    "USD": "الدولار الأمريكي (USD)",
    "EUR": "اليورو (EUR)",
    "GBP": "الجنيه الإسترليني (GBP)",
    "JPY": "الين الياباني (JPY)",
    "AUD": "الدولار الأسترالي (AUD)",
    "CAD": "الدولار الكندي (CAD)",
    "CNY": "اليوان الصيني (CNY)",
    "SAR": "الريال السعودي (SAR)",
    "AED": "الدرهم الإماراتي (AED)",
    // أضف جميع العملات الأخرى هنا بالصيغة نفسها
};

// تعبئة خيارات العملات في القوائم
async function populateCurrencyOptions() {
    const rates = await fetchExchangeRates();
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    Object.keys(rates).forEach(currency => {
        const currencyName = currencyNames[currency] || `${currency} (غير متوفر بالعربية)`;

        let option = document.createElement("option");
        option.value = currency;
        option.text = currencyName;
        fromCurrency.add(option);

        option = document.createElement("option");
        option.value = currency;
        option.text = currencyName;
        toCurrency.add(option);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
}

// دالة التحويل بين العملات
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const rates = await fetchExchangeRates();

    if (!amount || amount <= 0) {
        alert("يرجى إدخال مبلغ صالح.");
        return;
    }

    const convertedAmount = (amount * rates[toCurrency]) / rates[fromCurrency];
    const resultText = document.getElementById("resultText");
    resultText.textContent = `النتيجة: ${convertedAmount.toFixed(2)} ${currencyNames[toCurrency]}`;
}

// استدعاء تعبئة العملات عند بدء تشغيل الصفحة
populateCurrencyOptions();
