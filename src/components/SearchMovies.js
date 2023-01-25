import React, { useState } from "react"
import MovieCard from "./MovieCard";

export default function SearchMovies(props){

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([])

    const searchMovies = async(e) => {
        e.preventDefault();


        const url = `https://api.themoviedb.org/3/search/movie?api_key=3c6af1f313c48658e36b25e840fdcd37&language=en-US&query=${query}&page=1&include_adult=false`;

        try{
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        }catch(err){
            console.err(err);
        }
        
    }

    return(
        <>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input className="input" type="text" name="query" 
                placeholder="i.e. Harry Potter" value={query}
                onChange={(e) => setQuery(e.target.value)}
                ></input>
                <button className="button" type="submit">Submit</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie=> (
                    <MovieCard movie={movie}  key={movie.id} />
                ))}
            </div>
        </>
    )
}