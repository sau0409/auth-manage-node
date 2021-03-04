const axios = require("axios").default;

describe("authAPiSpec", function () {
    describe("check server status", function () {
        it("should return ok", async function() {
            let res = await axios.get('http://localhost:3000/serverStatus');
            expect(res.status).toEqual(200);
        })
    })

    describe("check auth apis", function() {
        it("should signup user", async function() {
            let res = await axios.post('http://localhost:3000/auth/signup', {
                "userid": "test",
                "password": "test123"
            });
            expect(res.status).toEqual(200);
        });
        it("should login user", async function() {
            let res = await axios.post('http://localhost:3000/auth/login', {
                "userid": "test",
                "password": "test123"
            });
            expect(res.status).toEqual(200);
        });
        it("should delete user", async function() {
            let res = await axios.post('http://localhost:3000/auth/delete', {
                "userid": "test",
                "password": "test123"
            });
            expect(res.status).toEqual(200);
        });
    })
})