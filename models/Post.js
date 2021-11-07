const db = require('./db')

const Post = db.sequelize.define('Postagens',{
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
});

//Post.sync({force: true})
//executar somente uma vez para fazer a criação da tabela

module.exports = Post