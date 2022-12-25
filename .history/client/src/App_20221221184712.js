import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState("");
  const [review, setReviewName] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  }, []);



  const submitReview = () => {
    if(movieName!=="" && review !== "") {
      Axios.post("http://localhost:3001/api/insert", {movieName:movieName, 
      movieReview: review,})
      .then(() => {
        setMovieList([...movieReviewList, {movieName: movieName, movieReview: review},])
      });
    }
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };


  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/delete/update", 
    {movieName: movie,
    movieReview: newReview});

    setNewReview("");
  }

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      

      <div className='form'>
        <label>Movie name:</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }}/>
        <label>Review:</label>
        <input type="text" name="review" onChange={(e) => {
          setReviewName(e.target.value)
        }}/>

        <button onClick={submitReview()}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movie_name}</h1>
              <p>{val.movie_review}</p>

              <button onClick={() => {deleteReview(val.movie_name)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value);
              }}/>
              <button onClick={() => {
                updateReview(val.movieName)
              }}>Update</button>
            </div>
            );
        })}
      </div>
    </div>
  );
}

export default App;
