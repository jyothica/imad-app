var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
  title: 'Article One | Jyothica Tauro',
  heading: 'Article One',
  date: 'August 22,2017',
  content: ` <p>This is the content of my first article.. This is the content of my first article..This is the content of my first article..This is the content of my first article..</p>
                <p>This is the content of my first article.. This is the content of my first article..This is the content of my first article..This is the content of my first article..</p>
                <p>This is the content of my first article.. This is the content of my first article..This is the content of my first article..This is the content of my first article..</p> <hr/>`
   
  
},
    'article-two': {
        title: 'Article Two | Jyothica Tauro',
        heading: 'Article Two',
        date: 'August 23,2017',
        content: ` <p>This is the content of my second article.. </p><hr/>`
        
    },
    'article-three': {
        title: 'Article Three | Jyothica Tauro',
        heading: 'Article Three',
        date: 'August 24,2017',
        content: ` <p>This is the content of my third article.. </p><hr/>`
    }
};

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
   // var comment = data.comment;
    var htmlTemplate = `
        <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width-device-width, initial-scale=1">
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href='/'>Here</a>
                </div>
                <hr/>
                <h3>${heading}</h3>
                <div>
                    ${date}
                    </div>
                <div>
                    ${content}
            </div>
            <div id='display'></div>
            <h3>Comments</h3>
            You can place your comments here : 
            
            <textarea name="comment" cols="25" rows="8"></textarea>
            
            <input type="submit" value="Submit" id="submit_btn"></input>
            <input type="reset" value="Reset"></input>
            
            <p><b>Your comments: </b>
            <span id='display'></span></p>
           
        </body>
    </html>`;
    return htmlTemplate;
}    



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {
    // URL: /submit-name?name=xxxx
    var name = req.query.name;
    //get the name from the request
    //var name = req.params.name;
    names.push(name);
    // JSON : Javascript Object Notation
    res.send(JSON.stringify(names)); 

});

app.get('/:articleName', function (req, res) {
    //articleName == article-one
    //articles[articleName] == {} content object for article one
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
