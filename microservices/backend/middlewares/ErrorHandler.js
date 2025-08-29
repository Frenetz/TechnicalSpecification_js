import UserAlreadyExistsError from "../errors/UserAlreadyExistsError.js";
import UserDataRequiredError from "../errors/UserDataRequiredError.js";
import IncorrectUserData from "../errors/IncorrectUserData.js";

export default function errorHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof UserAlreadyExistsError) {
        return res.status(409).json({ error: err.message });
    }

	if (err instanceof UserDataRequiredError) {
		return res.status(400).json({error: err.message});
	}

    if (err instanceof IncorrectUserData) {
        return res.status(400).json({error: err.message});
    }

    return res.status(500).json({ error: "Internal Server Error" });
}