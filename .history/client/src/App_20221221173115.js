import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState("");
  const [review, setReviewName] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {movieName:movieName, movieReview: review,});  

    setMovieList([...movieReviewList, {movieName: movieName, movieReview: review}]);                   
  };

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
          return <h1>Movie Name: {val.movie_name} | Movie Review: {val.movie_review} </h1>
        })}
      </div>
    </div>
  );
}

export default App;
