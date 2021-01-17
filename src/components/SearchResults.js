import React from 'react'
import Loader from "./Loader"
import DisplayMovies from './DisplayMovies'

const SearchResults = ({results, loading, setNomMovie, movies, nomIDS}) => {
        return (
            <div className="results-container">
                <p className="title">Your Search Results Here...</p>
                {results.Response === "True" && <p>We found {results.totalResults} matches for your search</p>}
                {loading && <Loader/>}
                <DisplayMovies movies={movies} setNomMovie={setNomMovie} nomIDS={nomIDS}/>
            </div>
        )
    }
export default SearchResults;
