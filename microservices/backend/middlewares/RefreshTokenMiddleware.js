import jwt from "jsonwebtoken";
import appConfig from "../config/app.config.js";
import TokenService from "../services/TokenService.js";

export default async function refreshTokenMiddleware(req, res, next) {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(401).json({ error: "Refresh token is required" });
  }

  const stored = await TokenService.findByRefreshToken(refresh_token);
  if (!stored) {
    return res.status(403).json({ error: "Refresh token is invalid or expired" });
  }

  jwt.verify(refresh_token, appConfig.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Refresh token is invalid or expired" });
    }

    req.user = user;
    next();
  });
}