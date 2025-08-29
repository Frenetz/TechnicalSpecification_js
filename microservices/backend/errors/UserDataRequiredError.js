export default class UserDataRequiredError extends Error {
	constructor(message="Username and password are required") {
		super(message);
		this.name = "UserDataRequiredError";
	}
}