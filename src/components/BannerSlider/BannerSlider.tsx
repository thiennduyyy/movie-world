"use client";
import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axios';
import { useRouter } from 'next/navigation';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';
import { moviesURL } from '@/lib/requests';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
}

function BannerSlider() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        const request = await axios.get(moviesURL.popular);
        if (isMounted) {
          setMovies(request.data.results);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const truncate = useCallback((str: string, n: number): string => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }, []);

  const handleWatchClick = useCallback((movieId: number) => {
    try {
      router.push(`/movie/${movieId}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [router]);

  return (
    <Swiper
      loop={true}
      navigation={true}
      modules={[Autoplay, Navigation, Thumbs]}
      grabCursor={true}
      autoplay={{
        disableOnInteraction: false,
        delay: 5000
      }}
      pagination={{
        clickable: false
      }}
      className="relative h-screen w-full"
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={movie.id || index}>
          <header
            className="relative w-full h-screen text-white bg-cover"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
              backgroundPosition: 'center center'
            }}
          >
            <div className="absolute top-56 left-36 z-10 w-[56rem]">
              <h1 className="text-4xl font-extrabold mb-8">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={() => movie?.id && handleWatchClick(movie.id)}
                  className="cursor-pointer text-white border-none text-sm font-semibold rounded-2xl hover:bg-[#bd251a] px-8 py-4 flex mb-3 bg-[#b12117]"
                >
                  WATCH
                </button>
                <button className="cursor-pointer text-white border-none text-sm font-semibold rounded-2xl hover:bg-[#2d9bdf] px-8 py-4 flex mb-3 bg-[#2391d6]">
                  My List
                </button>
              </div>
              <p className="text-lg font-light leading-7">
                {truncate(movie?.overview!, 300)}
              </p>
            </div>
            <div className="absolute bottom-0 w-full h-28 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-black to-transparent"></div>
          </header>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BannerSlider;