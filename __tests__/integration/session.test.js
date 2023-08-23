const request = require('supertest')

const app = require('../../src/app')
const { User } = require("../../src/models");
const truncate = require('../utils/truncate')


describe ("Authentication", () => {
    beforeEach(async () => {
            await truncate();
        }
    )

    // it("should create a new user", async () => {
    //     const user = await User.create({name: "Andre", email: "123@gmail.com", password_hash: "123"});
    //     console.log(user);
    //     expect(user.email).toBe("123@gmail.com")
    // });

    it("should auth with valid credentials", async () => {
        const user = await User.create({name: "teste", email: "teste123@gmail.com", password_hash: "123"});

        const response = await request(app)
            .post('/sessions')
            .send({
                email: "123@gmail.com", 
                password: "123"
            });
        
            expect(response.status).toBe(200);
    },40000);
});