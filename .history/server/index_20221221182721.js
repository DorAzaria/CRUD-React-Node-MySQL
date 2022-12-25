const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CRUDDataBase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));




app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result); 
    });
});




app.post('/api/insert/', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?);";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    });
});


app.delete('/api/delete/:movie', (req, res) => {
    const name = req.params.movie;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movie_name = ? ;";
    db.query(sqlDelete, "", (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log(name);
        
    });
});


app.listen(3001, () => {
    console.log("running on port 3001");
});