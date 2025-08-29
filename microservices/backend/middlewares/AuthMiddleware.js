import jwt from "jsonwebtoken";
import appConfig from "../config/app.config.js";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "There is no token" });

  jwt.verify(token, appConfig.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token is invalid" });
    req.user = user;
    next();
  });
}