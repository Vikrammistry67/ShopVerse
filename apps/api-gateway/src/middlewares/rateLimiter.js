import rateLimit from "express-rate-limit";

// 🔐 AUTH
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many auth requests"
});

// 💳 PAYMENT
export const paymentLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "Too many payment requests"
});

// 🤖 AI
export const aiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "AI limit exceeded"
});

// 👤 USER (cart/order/notification/seller)
export const userLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30
});

// 🛒 PRODUCT
export const productLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100
});