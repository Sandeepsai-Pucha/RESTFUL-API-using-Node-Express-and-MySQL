const mySql = require('mysql')
const dbConfig = require('../config/db.config')

const connection =  mySql.createConnection({
    host: "localhost",
    user: "root",
    password: 'Sandeepsai@204',
    database:'mydb'
});

connection.connect(error => {
    if (error) {
        console.log(error,"Check with the error")
        throw error;}
    console.log('Successfully Connected to the Database...')
});

module.exports = connection;

