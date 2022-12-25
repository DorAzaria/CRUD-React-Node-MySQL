# CRUD-React-Node-MySQL

CRUD project for NodeJS and MySQL with React. 

## Create

#### On client/App.js

```js

  const [movieName, setMovieName] = useState("");
  const [review, setReviewName] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
```

```js

  <label>Movie name:</label>
  <input type="text" name="movieName" onChange={(e) => {
    setMovieName(e.target.value);
  }}/>

  <label>Review:</label>
  <input type="text" name="review" onChange={(e) => {
    setReviewName(e.target.value);
  }}/>
  
  const submitReview = () => {
    if(movieName!=="" && review !== "") {
      Axios.post("http://localhost:3001/api/insert", {movieName:movieName, 
      movieReview: review,})
      .then(() => {
        setMovieList([...movieReviewList, {movieName: movieName, movieReview: review},])
      });
    }
  };
```

```js
 return (
    <div className="App">
    
        ....
        
        <button onClick={submitReview()}>Submit</button>
        ....
        
    </div>
  );
```


#### On server/index.js
```js
  app.post('/api/insert/', (req, res) => {

      const movieName = req.body.movieName;
      const movieReview = req.body.movieReview;

      const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?);";
      db.query(sqlInsert, [movieName, movieReview], (err, result) => {
          console.log(err);
   });
});
```



## Read
#### On client/App.js

```js
  const [movieReviewList, setMovieList] = useState([]);
```

```js
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  }, []);
```

```js
 return (
    <div className="App">
    
        ....
        
       {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movie_name}</h1>
              <p>{val.movie_review}</p>
            </div>
            );
        })}
        
        ....
        
    </div>
  );
```

#### On server/index.js

```js
  app.get('/api/get', (req, res) => {
      const sqlSelect = "SELECT * FROM movie_reviews";
      db.query(sqlSelect, (err, result) => {
          res.send(result); 
      });
  });
```


## Update
#### On client/App.js

```js
  const [movieReviewList, setMovieList] = useState([]);
```

```js
  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", 
    {movieName: movie,
    movieReview: newReview});
    setNewReview("");
  }
```


```js
 return (
    <div className="App">
    
        ....
        
      {movieReviewList.map((val) => {
          return {
              <button onClick={() => {
                updateReview(val.movie_name);
              }}>Update</button>
            );
        })}
        
        ....
        
    </div>
  );
```


#### On server/index.js

```js

app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ? ;";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if(err) {
            console.log(err);
        }
    
        
    });
});

```

## Delete
