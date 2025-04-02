'use client';

import React, { useEffect, useState, useContext } from "react";
import axios from '../components/axios';
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Row from "@/components/Row/Row";
import { moviesURL } from "@/lib/requests";
import { GenresContext } from "@/lib/genresProvider";

const BannerSlider = dynamic(() => import("@/components/BannerSlider/BannerSlider"), {
  ssr: false
});

const getGenres = async () => {
  let genresList: { [key: string]: string } = {};

  const genres = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US"
  );
  genres.data.genres.filter((genre: any) => (genresList[`${genre.id}`] = genre.name));
  return genresList;
};

function Home() {
  const [genres, setGenres] = useState({});
  const genresContext = useContext(GenresContext);

  useEffect(() => {
    document.title = "Movieworld";
    getGenres().then((res) => setGenres(res));
  }, []);

  return (JSON.stringify(genres) !== "{}" &&
    <>
      <div className="bg-gradient-to-b from-gray-900 to-black">
        <BannerSlider />
        <div className="mt-8">
            <Row title="Popular" hasIcon={true} fetchUrl={moviesURL.popular} amount={5} />
            <Row title="Top Rated" hasIcon={true} fetchUrl={moviesURL.topRated} amount={5} />
            <Row title="Upcoming" hasIcon={true} fetchUrl={moviesURL.upcoming} amount={5} />
            <Row title="Now playing" hasIcon={true} fetchUrl={moviesURL.nowPlaying} amount={5} />
        </div>
      </div>
    </>
  );
}

export default Home;
