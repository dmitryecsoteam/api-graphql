const JWT = {
    createToken: (email) => {
        if (email === 'test1@mail.com' || email === 'test@mail.com') return 'test_token';
    },
    verifyToken: (token) => {
        if (token === 'valid_token') return { email: 'test@mail.com' };
        if (token === 'non_exist_user_token') return { email: 'random_user@mail.com' }
    }
}

module.exports = JWT;