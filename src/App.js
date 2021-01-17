import React, { useState, useEffect } from 'react'
import './App.css';
import SearchInput from "./components/SearchInput"
import SearchResults from './components/SearchResults'
import Nominations from './components/Nominations'
import axios from 'axios'
import baseURL from "./request"

function App() {
  const [searchTerm , setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [nomMovie, setNomMovie] = useState({});
  const [nomIDS, setNomIDS] = useState([])

  useEffect(() => {
    FetchMovies()
    if (searchTerm === '' || loading) {
      setResults([]) ;
      setMovies([]);
    }

  }, [searchTerm])

  useEffect(() => {
    let nominations = JSON.parse(localStorage.getItem("nominations")) || []
    const IDS = nominations.map((movie) => movie.imdbID) || [];
    setNomIDS(IDS)
  }, [nomMovie])

  const FetchMovies = async () => {
    try {
      const response = await axios.get(baseURL + searchTerm)
      setResults(response.data);
      setLoading(false);
      if (response.data.Response === "True" && searchTerm !== '') {
        setMovies(response.data.Search)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} setLoading={setLoading}/>
      <div className='main'>
        <SearchResults results={results} loading={loading} searchTerm={searchTerm} movies={movies} setNomMovie={setNomMovie} nomIDS={nomIDS}/>
        <Nominations nomMovie={nomMovie} setNomIDS={setNomIDS}/>
      </div>
    </div>
  );
}


export default App;
