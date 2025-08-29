import User from '../models/User.js';

class UserRepository {
	async register(username, password) {
		try {
			const user = await User.create({username, password});
			return user;
		} catch (e) {
			throw e;
		}
	}

	async getUserByUsername(username) {
		return await User.findOne({where: {username: username}, raw: true});
	}
	
	// async logout(req, res) {
	// 	try {
	// 		console.log(req.body);
	// 		const {username, password} = req.body;
	// 		if (!username || !password) {
	// 			return res.status(400).json({ error: 'Username and password are required' });
	// 		}
			
	// 		const user = await User.create({ username, password });

	// 		res.status(201).json({
	// 			message: 'User created successfully',
	// 			user: {
	// 				id: user.id,
	// 				username: user.username,
	// 				created_at: user.created_at
	// 			}
	// 		});
	// 	} catch (e) {
	// 		res.status(500).json(e);
	// 	}
	// }    
}

export default new UserRepository();