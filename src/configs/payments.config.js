const dotenv = require('dotenv').config();

const paymentConfig = {
    paypal: {
        clientId: process.env.PAYPAL_CLIENT_ID,
        clientSecret: process.env.PAYPAL_CLIENT_SECRET,
        mode: process.env.PAYPAL_MODE || 'sandbox', // 'sandbox' or 'live'
    },
    stripe: {
        apiKey: process.env.STRIPE_API_KEY,
    },
    vnPay: {
        merchantId: process.env.VNPAY_MERCHANT_ID,
        secretKey: process.env.VNPAY_SECRET_KEY,
        returnUrl: process.env.VNPAY_RETURN_URL,
    },
    momo: {
        partnerCode: process.env.MOMO_PARTNER_CODE,
        accessKey: process.env.MOMO_ACCESS_KEY,
        secretKey: process.env.MOMO_SECRET_KEY,
        returnUrl: process.env.MOMO_RETURN_URL,
    },
};

module.exports = paymentConfig;