import User from '../models/User.js';
import UserRepository from '../repositories/UserRepository.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appConfig from '../config/app.config.js';

class UserService {
	async register(username, password) {
		password = await bcrypt.hash(password, 10);
		return await UserRepository.register(username, password);
	}

	async getUserByUsername(username) {
		return await UserRepository.getUserByUsername(username);
	}	

	async checkUserDataCorrect(username, password) {
		const user = await UserRepository.getUserByUsername(username);
		if (!user) {
			return null;
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return null;
		}
		return user;
	}

	async login(req, res) {
		try {
			const {username, password} = req.body;
			if (!username || !password) {
				return res.status(400).json({ error: 'Username and password are required' });
			}
			
			const user = await User.create({ username, password });

			res.status(201).json({
				message: 'User created successfully',
				user: {
					id: user.id,
					username: user.username,
					created_at: user.created_at
				}
			});
		} catch (e) {
			res.status(500).json(e);
		}
	}

	generateAccessToken(user_id, username) {
		const access_token = jwt.sign(
			{ id: user_id, username: username },
			appConfig.JWT_ACCESS_SECRET,
			{ expiresIn: "1m" }
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
}

export default new UserService();