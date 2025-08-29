import RefreshToken from "../models/RefreshToken.js";

class TokenRepository {
	async saveRefreshToken(user_id, refresh_token) {
		try {
			RefreshToken.create({user_id, refresh_token});
		} catch (e) {
			throw e;
		}
	}

	async findByRefreshToken(refresh_token) {
		try {
			const token = await RefreshToken.findOne({
				where: { refresh_token }
			});

			return token;
		} catch (e) {
			throw e;
		}
	}

	async destroyRefreshToken(user_id) {
		try {
			await RefreshToken.destroy({
				where: { user_id }
			});
		} catch (e) {
			throw e;
		}
	}		

}

export default new TokenRepository();