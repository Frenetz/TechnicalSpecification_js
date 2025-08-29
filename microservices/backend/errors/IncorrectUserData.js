export default class IncorrectUserData extends Error {
	constructor(message="Incorrect Login or Password") {
		super(message);
		this.name = "IncorrectUserData";
	}
}