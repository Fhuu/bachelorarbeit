module.exports = {
	getCsrf : async () => {
		let csrf = await fetch('/v1/csrf');
		csrf = (await csrf.json()).csrfToken;
		console.log(csrf);
		return csrf;
	}
}