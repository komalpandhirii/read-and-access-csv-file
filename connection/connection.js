const config = require('../connection/config');
const mysql = require('mysql')

const knex = require('knex')
({
    client : 'mysql',
    connection:{
        host : config.host,
        user:config.user,
        password:config.password,
        database:config.database
    }
})

knex.raw('use flatFiles').then(() => console.log('db connected'))

module.exports = knex;