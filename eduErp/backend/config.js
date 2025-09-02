
const PORT = 5555;
const mongoDBURL = 'mongodb+srv://root:root123@mycluster01.etaqdin.mongodb.net/eduErp?retryWrites=true&w=majority&appName=MyCluster01';
const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = '24h';

module.exports = { PORT, mongoDBURL, JWT_SECRET, JWT_EXPIRES_IN };

