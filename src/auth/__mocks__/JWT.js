const JWT = {
    createToken: (email) => {
        if (email === 'test1@mail.com' || email === 'test@mail.com') return 'test_token';
    }
}

module.exports = JWT;