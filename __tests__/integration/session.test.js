const request = require('supertest')

const app = require('../../src/app')
const factory = require("../factories");
const truncate = require('../utils/truncate')


describe ("Authentication", () => {
    beforeEach(async () => {
            await truncate();
        }
    )

    it("should auth with valid credentials", async () => {
        const user = await factory.create('User',{
            email: "teste123@gmail.com",
            password: "123"
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: "teste123@gmail.com", 
                password: "123"
            });
        
            expect(response.status).toBe(200);
    });


    it("should deny auth with invalid credentials", async () => {
        const user = await factory.create('User',{
            email: "teste1234@gmail.com", 
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: "teste12345@gmail.com", 
                password: "12345"
            });
        
            expect(response.status).toBe(401);
    });

    it("should get a jwt token when auth", async () => {
        const user = await factory.create('User',{
            email: "teste12345@gmail.com", 
            password: "12345"
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: "teste12345@gmail.com", 
                password: "12345"
            });
            expect(response.body).toHaveProperty("token");
    });
    it("should be able to access private routes when auth", async () => {
        const user = await factory.create('User',{
            email: "teste12345@gmail.com", 
            password: "12345"
        });
        
        const response = await request(app)
            .get("/dashboard")
            .set("Authorization", `Bearer ${user.genToken()}`);
            
            expect(response.status).toBe(200 );
    });

    it("shouldn't be able to access private routes when not auth", async () => {
               
        const response = await request(app)
            .get("/dashboard");
            
            expect(response.status).toBe(401);
    });

    it("shouldn't be able to access private routes with invalid jwt token", async () => {
               
        const response = await request(app)
            .get("/dashboard")
            .set("Authorization", `Bearer 4444`);
            
            expect(response.status).toBe(401);
    });

});