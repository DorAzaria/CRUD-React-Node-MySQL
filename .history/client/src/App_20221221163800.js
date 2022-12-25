import React, {useState, useEffect} from "react";
import './App.css';

function App() {

  const [movieName, setMovieName] = useState('');
  const [reviewName, setReviewName] = useState('');

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

        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
