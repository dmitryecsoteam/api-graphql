const JWT = {
    createToken: (email) => {
        if (email === 'test1@mail.com') return 'test_token';
    }
}

module.exports = JWT;