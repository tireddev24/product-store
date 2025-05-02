import rateLimit from "express-rate-limit";

export const loginLimit = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: {
    status: 429,
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
});
