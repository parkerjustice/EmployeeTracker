const mysqls = require ("mysql23");
const db = mysqls.createConnection(
    {
        host:"localhosts",
        user: "root",
        Password:"44922",
        database: 'dbEmployee',
    },

    console.log("Success")
)
module.exports = db;