import React, { useState, useEffect } from 'react';
import './banner.css'
import axios from '../axios'
import request from '../requests'

// const BASE_URL = "https://image.tmdb.org/t/p/original/"

const Banner = () => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(request.fetchNetflixOriginals)
                const randomNumber = Math.floor(Math.random() * res.data.results.length)
                setMovie(res.data.results[randomNumber])
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])

    const truncate = (str, n) => {
        return str.length > n ? str.substring(0, n - 1) + "..." : str
    }
    if (movie.overview) {
        console.log(movie, movie.overview.substring(0, 60));
    }
    return (
        movie &&
        <header className='banner' style={
            {
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
            }
        }>

            <div className="banner__contents">
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My list</button>
                </div>
                {movie.overview &&
                    <h1 className="banner__description">{truncate(movie.overview, 300)} </h1>
                }
            </div>
            <div className="banner--fadeBottom" />
        </header >

    );
};

export default Banner;