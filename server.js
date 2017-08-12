const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.set('view engine','hbs')

hbs.registerPartials(__dirname + '/views/partials')


app.use((request,response,next) => {
    var now = new Date().toString()
    var log = `${now}: ${request.method} ${request.url}`
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err) => {
        if (err){
            console.log('Unable to append on to sever.log fine');
        }
    })
    next()
})
// app.use((request,response,next) => {
//     response.render('mantaince')
// })
app.use(express.static(__dirname + '/public'))
hbs.registerHelper('getCurrentYear',() => {
    //return 'trst'
    return new Date().getFullYear()
});

app.get('/',(request,response) => {
    //response.send('<h1>Hello Express!</h1>')
    response.render('home.hbs',{
        pageTitle   :   'Home Page',
        someParagraph   :   'This is the home page'
    })
})

app.get('/about',(request,response) => {
    response.render('about.hbs',{
        pageTitle   :   'About Page',
    })
})

app.get('/bad',(req,res) => {
    res.send(
        {
            status : 'Unable to hander request correctly'
        }
    )
}
)

app.listen(3000,() => {
    console.log('Server is up and running');
});
