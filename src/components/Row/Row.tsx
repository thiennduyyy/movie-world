'use client';

import React, { useState, useEffect, useCallback } from "react";
import axios from '../axios';
import Card from "../Card/Card";
import { useRouter } from "next/navigation";

type Movie = {
  id: number;
  first_air_date?: string;
  poster_path?: string;
  name?: string;
  original_title?: string;
  vote_average: number;
  release_date?: string;
  genre_ids: number[];
};

type RowProps = {
  title: string;
  fetchUrl: string;
  amount: number;
  hasIcon?: boolean;
};

function Row({ title, fetchUrl, amount, hasIcon }: RowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleSeeAll = useCallback(() => {
    if (title === 'Top rated') {
      router.push('/movies?sort=top_rated');
    } else if (title === 'Upcoming') {
      router.push('/movies?sort=upcoming');
    } else if (title === 'Now playing') {
      router.push('/movies?sort=now_playing');
    } else {
      router.push('/movies?sort=popular');
    }
  }, [router, title]);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-4">
      <div className="flex items-center justify-between mb-6">
        {hasIcon ? (
          <div className="flex items-end gap-x-2">
            <img
              className="h-8 w-auto"
              src={`/${title}.png`}
              alt={`${title} logo`}
            />
            <h2 className="text-[#4d93f8] text-lg font-bold">{title}</h2>
          </div>
        ) : (
          <h2 className="text-lg font-bold">{title}</h2>
        )}
        {amount < 20 && (
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleSeeAll}
          >
            <p className="text-sm sm:text-base text-white">See all</p>
            <img
              className="ml-2 w-2 sm:w-3 h-auto"
              src="/rightArrow.png"
              alt="Go to"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies?.slice(0, amount).map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Row;