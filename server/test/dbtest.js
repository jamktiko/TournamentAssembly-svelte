const assert = require("chai").assert;
const expect = require("chai").expect;

const { connect } = require("../db/conn");
const lib = require("../db/lib");

describe("Database testing", () => {
	it("Testing connection", async () => {
		assert.strictEqual(await connect(), true);
	});

	const testUser = {
		username: "testuser",
		password: "testuser",
		tournaments: [],
	};

	describe("Method lib testing", async () => {
		describe("Registering tests", () => {
			it("Register new user", async () => {
				const newUser = await lib.registerUser(
					testUser.username,
					testUser.password,
					testUser.tournaments
				);

				assert.strictEqual(newUser.username, testUser.username);
				assert.strictEqual(newUser.success, true);
				expect(newUser.token).to.be.a("string");
			});

			it("Username allready exists", async () => {
				const failingUser = await lib.registerUser(
					testUser.username,
					testUser.password,
					testUser.tournaments
				);
				assert.strictEqual(failingUser.success, false);
			});

			it("Username validation", async () => {
				const usrVal = await lib.registerUser("", "test", []);

				assert.strictEqual(usrVal.success, false);
			});

			it("Password validation", async () => {
				const pswVal = await lib.registerUser("test", "", []);

				assert.strictEqual(pswVal.success, false);
			});
		});

		describe("Login tests", async () => {
			const loggedIn = await lib.loginUser(
				testUser.username,
				testUser.password
			);

			it("Logging in", async () => {
				assert.strictEqual(loggedIn.username, testUser.username);
				assert.strictEqual(loggedIn.success, true);
				expect(loggedIn.id).to.exist;
				expect(loggedIn.token).to.be.a("string");
			});

			it("Login usr validation", async () => {
				const usrVal = await lib.loginUser("", testUser.password);

				assert.strictEqual(usrVal.success, false);
			});

			it("Login psw validation", async () => {
				const pswVal = await lib.loginUser(testUser.username, "");

				assert.strictEqual(pswVal.success, false);
			});
		});

		describe("User deletion tests", () => {
			it("Deleting an user", async () => {
				const loggedIn = await lib.loginUser(
					testUser.username,
					testUser.password
				);

				const delUsr = await lib.deleteById(loggedIn.id);

				assert.strictEqual(delUsr.success, true);
			});

			it("Check if user is deleted", async () => {
				const usrSearch = await lib.loginUser(
					testUser.username,
					testUser.password
				);

				assert.strictEqual(usrSearch.success, false);
			});
		});
	});
});
