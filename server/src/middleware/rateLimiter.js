import { ratelimit } from "../utils/upstash.js";

export const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) return res.status(429).json({
            success: false,
            message: "Too many requests, please try again later"
        })
        next();
    } catch (error) {
        console.log("rateLimiter error:", error);
        next(error);
    }
}

