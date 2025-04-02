'use client';

import React, { useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GenresContext } from '../../lib/genresProvider';

const base_url = "https://image.tmdb.org/t/p/w500/";

type CardProps = {
  movie: {
    id: number;
    first_air_date?: string;
    poster_path?: string;
    name?: string;
    original_title?: string;
    vote_average: number;
    release_date?: string;
    genre_ids: number[];
  };
};

function Card({ movie }: CardProps) {
  const context = useContext(GenresContext);
  const router = useRouter();

  if (!context) {
    throw new Error('GenresContext is not provided');
  }

  const { setTab, genreList } = context;

  const scoreColor = useCallback((x: number): string => {
    if (x >= 7) {
      return 'text-green-600';
    } else if (x >= 5 && x < 7) {
      return 'text-yellow-500';
    } else {
      return 'text-red-600';
    }
  }, []);

  const handleMovieClick = useCallback(() => {
    try {
      const path = movie.first_air_date ? `/tv/${movie.id}` : `/movies/${movie.id}`;
      router.push(path);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [movie.first_air_date, movie.id, router]);

  const handleGenreClick = useCallback((genreId: number) => {
    try {
      setTab('Movies');
      const mediaType = movie.first_air_date ? 'tv' : 'movie';
      router.push(`/genres/${genreId}?type=${mediaType}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [movie.first_air_date, router, setTab]);

  return (
    <div className="w-full transition-transform bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-700/30">
      <div className="relative pb-[150%] overflow-hidden">
        <img
          draggable="false"
          key={movie.id}
          onClick={handleMovieClick}
          className="absolute inset-0 w-full h-full cursor-pointer hover:opacity-80 transition-opacity object-cover"
          src={movie.poster_path ? `${base_url}${movie.poster_path}` : `/notavailable.jpg`}
          alt={movie.name || 'Movie Poster'}
        />
      </div>
      <div className="w-full p-4 pb-6">
        <h4
          className="text-sm font-bold truncate cursor-pointer hover:opacity-80 transition-opacity text-gray-100"
          onClick={handleMovieClick}
        >
          {movie.original_title || movie.name}
        </h4>
        <div className="flex items-center mt-2">
          <img alt="imdb" src="/imdb.png" className="w-6 h-auto" />
          <p className={`ml-1 text-sm font-bold ${scoreColor(movie.vote_average)}`}>
            {movie.vote_average.toFixed(1)}
          </p>
          <p className="ml-1 text-xs font-medium text-gray-400">
            | {movie.release_date || movie.first_air_date}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {movie.genre_ids.slice(0, 2).map((id) => (
            <div
              key={id}
              className="px-3 py-1 bg-[#2d2d2d] rounded-full cursor-pointer hover:bg-[#383838] transition-colors border border-2 border-[#383838]"
              onClick={() => handleGenreClick(id)}
            >
              <p className="text-sm font-medium text-gray-300 truncate">
                {genreList[id]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;