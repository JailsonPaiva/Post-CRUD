const express = require('express')
const app = express()
const Post = require('./models/Post')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')


//CONFIG
    //TEMPLATE ENGINE
    app.engine('handlebars', handlebars({
        defaultLayout: 'main',runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: false,
            }
    }))
    app.set('view engine', 'handlebars')

    //BODY PARSER
    app.use(bodyparser.urlencoded({estended: false}))
    app.use(bodyparser.json())

    //ROTAS
    app.get('/', function(req,res){
        Post.findAll({order: [['id', 'DESC']]}).then(
          function(posts) {
                res.render('home', {posts: posts})
            }
        )
    })

    app.get('/post', function(req, res){
        res.render('CriarPost')
    })

    //CRIANDO
    app.post('/criar', function(req,res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then( () => res.redirect('/')).catch( (erro)=> console.log(`Ocorreu um erro: ${erro}`))
    })

    //ATUALIZANDO UM POST
    app.get('/att/:id', function(req,res){
        Post.findOne({where: {id: req.params.id}}).then(
            function(post) {
                  res.render('AttPost', {post: post})
              }
          )
    })

    app.post('/attpost/:id', function(req, res){
        Post.update(
            {
                titulo: req.body.novoTitulo,
                conteudo: req.body.novoConteudo
             },
            {
                where: {id: req.params.id}
            }).then( () => res.redirect('/')).catch( (erro)=> console.log(`Ocorreu um erro: ${erro}`))
    })

    //DELETANDO UM POST
    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {id: req.params.id}}).then(
            () => {
                res.send('Postagem deletada com sucesso!')
            }
        ).catch( (erro) => {
            res.send('Esta postagem não existe!')
        })
    })

    app.listen(8080, () => console.log('Servidor rodando!!!'))