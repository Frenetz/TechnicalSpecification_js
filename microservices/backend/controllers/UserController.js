import User from '../models/User.js';
import UserService from '../services/UserService.js';
import TokenService from '../services/TokenService.js';
import UserDataRequiredError from '../errors/UserDataRequiredError.js';
import UserAlreadyExistsError from '../errors/UserAlreadyExistsError.js';
import IncorrectUserData from '../errors/IncorrectUserData.js';

class UserController {
	async register(req, res, next) {
		try {
            const { username, password } = req.body || {};
            if (!username || !password) {
                throw new UserDataRequiredError("Username and password are required");
            }
            
            const getUserByUsername = await UserService.getUserByUsername(username);
            if (getUserByUsername) {
                throw new UserAlreadyExistsError;
            }

            const user = await UserService.register(username, password);

            res.status(201).json({message: 'User created successfully', user});
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const {username, password} = req.body || {};
            if (!username || !password) {
                throw new UserDataRequiredError("Username and password are required");
            }
            
            const user = await UserService.checkUserDataCorrect(username, password);
            if (!user) {
                throw new IncorrectUserData("Username or password is incorrect");
            }

            const access_token = TokenService.generateAccessToken(user.id, user.username);
            const refresh_token = TokenService.generateRefreshToken(user.id, username);
            TokenService.saveRefreshToken(user.id, refresh_token);

            res.status(200).json({
                message: 'You were successfully logged id',
                access_token: access_token,
                refresh_token: refresh_token,
            });
		} catch (e) {
			next(e);
		}
	}
    
	async refresh_token(req, res) {
		try {
            const { refresh_token } = req.body;

            const access_token = TokenService.refreshAccessToken(refresh_token);

            res.status(200).json({ access_token: access_token });
		} catch (e) {
			res.status(500).json(e);
		}
	}
    
	async logout(req, res) {
		try {
            const authHeader = req.headers["authorization"];
            const access_token = authHeader && authHeader.split(" ")[1];
            await TokenService.destroyRefreshToken(access_token);

            res.status(200).json({
                message: 'You have successfully logged out',
            });
		} catch (e) {
			res.status(500).json(e);
		}
	}
}

export default new UserController();