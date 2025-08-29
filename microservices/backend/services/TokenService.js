import jwt from "jsonwebtoken";
import appConfig from '../config/app.config.js';
import TokenRepository from "../repositories/TokenRepository.js";

class TokenService {
	generateAccessToken(user_id, username) {
		const access_token = jwt.sign(
			{ id: user_id, username: username },
			appConfig.JWT_ACCESS_SECRET,
			{ expiresIn: "15m" }
		);
		return access_token;
	}

	generateRefreshToken(user_id, username) {
		const refresh_token = jwt.sign(
			{ id: user_id, username: username },
			appConfig.JWT_REFRESH_SECRET,
			{ expiresIn: "7d" }
		)
		return refresh_token;
	}

	saveRefreshToken(user_id, refresh_token) {
		TokenRepository.saveRefreshToken(user_id, refresh_token);
	}

	refreshAccessToken(refresh_token) {
		const payload = jwt.verify(refresh_token, appConfig.JWT_REFRESH_SECRET);
		const user_id = payload.id;
		const username = payload.username;
		return this.generateAccessToken(user_id, username);
	}

	async findByRefreshToken(refresh_token) {
		return await TokenRepository.findByRefreshToken(refresh_token);
	}

	async destroyRefreshToken(access_token) {
		const payload = jwt.verify(access_token, appConfig.JWT_ACCESS_SECRET);
		const user_id = payload.id;
		await TokenRepository.destroyRefreshToken(user_id);
	}	
}

export default new TokenService();