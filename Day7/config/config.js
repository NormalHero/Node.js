module.exports = {
    server_port: 3000,
    db_url: 'mongodb://127.0.0.1:27017/frontend',
    db_schemas: [{file:'./member_schema', collection:'member2', schemaName:'MemberSchema', modelName:'MemberModel'}],
    facebook: {
        clientID: '4643606445655032',
        clientSecret: '13220a7c8fef0aaea6c60a4173dd7494',
        callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback'
    }
}