import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from '../axios'
import './row.css'

const BASE_URL = "https://image.tmdb.org/t/p/original/"

const Row = ({ title, fetchURL, isLargeRow }) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(fetchURL);
                //console.table(res.data.results);
                setMovies(res.data.results)
            } catch (error) {
                console.log(error);
            }

        }
        fetchData()
    }, [fetchURL])
    //console.log(movies);
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }
    return (
        <div className='row' >
            <h2>{title}</h2>
            <div className="row__posters">
                {movies && movies.map(
                    movie =>
                        <img className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            key={movie.id}
                            src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name} />

                )}

            </div>
            {/* <YouTube videoId="" opts={opts} /> */}

        </div >
    );
};

export default Row;