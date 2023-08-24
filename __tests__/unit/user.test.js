const bcrypt = require('bcryptjs');
const { User } = require('../../src/models');
const truncate = require('../utils/truncate');

describe ('User', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should encrypt user pass', async () =>{
        const user = await User.create({
            name : 'teste 1', 
            email: 'teste@teste.com123', 
            password: '123456'});

            const compareHase = await bcrypt.compare(user.password, user.password_hash);

            expect(compareHase).toBe(true);
        expect();
    });
});