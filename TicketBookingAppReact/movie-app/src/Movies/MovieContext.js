import React, { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movieTitle, setMovieTitle] = useState('');

    return (
        <MovieContext.Provider value={{ movieTitle, setMovieTitle }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovie = () => useContext(MovieContext);