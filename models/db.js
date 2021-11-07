const Sequelize = require('sequelize')

//CONEXÃO COM O BANCO DE DADOS MYSQL
const sequelize = new Sequelize('forum_crud', 'root', '@123mudar', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}