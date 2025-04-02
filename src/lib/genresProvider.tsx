"use client";
import axios from 'axios';
import React, { useEffect, createContext, useState, ReactNode, JSX } from 'react';

type GenresList = Record<string, string>;

type GenresContextType = {
    genreList: GenresList;
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
};

const getGenres = async (): Promise<GenresList> => {
    let genresList: GenresList = {};

    const movieGenres = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US');
    const tvGenres = await axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US');

    movieGenres.data.genres.forEach((genre: { id: number; name: string }) => {
        if (genre.name === 'Science Fiction') {
            genresList[`${genre.id}`] = 'Sci-Fi';
        } else {
            genresList[`${genre.id}`] = genre.name;
        }
    });

    tvGenres.data.genres.forEach((genre: { id: number; name: string }) => {
        if (genre.name.includes('&')) {
            let shortGenre = genre.name.split(' & ');
            genresList[`${genre.id}`] = shortGenre[0];
        } else {
            genresList[`${genre.id}`] = genre.name;
        }
    });

    return genresList;
};

const GenresContext = createContext<GenresContextType | undefined>(undefined);

type GenresProviderProps = {
    children: ReactNode;
};

function GenresProvider({ children }: GenresProviderProps): JSX.Element {
    const [genreList, setGenreList] = useState<GenresList>({});
    const [tab, setTab] = useState<string>('Home');

    useEffect(() => {
        document.title = 'Film with me';
        getGenres().then(res => setGenreList(res));
    }, []);

    return (
        <GenresContext.Provider value={{ genreList, tab, setTab }}>
            {children}
        </GenresContext.Provider>
    );
}

export { GenresContext, GenresProvider };