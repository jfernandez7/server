const express = require('express')
const app = express()
const port = 3000;
const db = require('./queries')


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (request, response) => {
  
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)

app.get('/pweets', db.getPweets)
app.get('/pweets/:id', db.getPweetById)
app.post('/pweets', db.createPweet)

app.get('/profile/:id', db.getProfile)


app.listen(port, () => {
console.log(`App running on port ${port}.`)
})

