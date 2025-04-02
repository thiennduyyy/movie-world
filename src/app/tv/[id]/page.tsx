'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from '@/components/axios';
import { TVShowDetail, Season } from '@/lib/types/types';

const base_url = "https://image.tmdb.org/t/p/w200";

export default function TVShow() {
    const params = useParams();
      const router = useRouter();
      const id = params.id;
    // const [seasons, setSeasons] = useState<Season[]>([]);
    const [detail, setDetail] = useState<TVShowDetail>({
        show: {} as TVShowDetail['show'],
        credits: { casts: [], director: {} as TVShowDetail['credits']['director'] },
        genres: []
    });

    useEffect(() => {
        async function fetchDetail() {
            try {
                const seasons: Season[] = [];
                const tvShow = await axios.get(`/tv/${id}?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`);
                const credits = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`);
                
                const genres = tvShow.data.genres.map((genre: { name: string }) => genre.name);
                const casts = credits.data.cast?.slice(0, 5).map((cast: any) => ({
                    name: cast.name,
                    character: cast.character,
                    profile_path: cast.profile_path
                }));
                const director = (tvShow.data.created_by?.length > 0)
                    ? {
                        name: tvShow.data.created_by[0].name,
                        profile_path: tvShow.data.created_by[0].profile_path
                      }
                    : credits.data.crew?.find(({job}: {job: string}) => job === "Director" || job === "Executive Producer");

                document.title = tvShow.data.name || tvShow.data.original_name;

                tvShow.data.seasons?.forEach((season: Season) => {
                    if (season.season_number > 0) {
                        seasons.push(season);
                    }
                });

                // setSeasons(seasons);
                setDetail({ 
                    show: tvShow.data,
                    credits: { casts, director }, 
                    genres 
                });
            } catch (error) {
                console.error('Error fetching TV show details:', error);
            }
        }
        
        if (id) {
            fetchDetail();
        }
    }, [id]);

    const scoreColor = (x: number): string => {
        if (x >= 7) {
            return 'text-[#179617]';
        } else if (x >= 5 && x < 7) {
            return 'text-[#ffc107]';
        } else {
            return 'text-red-600';
        }
    };

    const { show, credits: { casts, director }, genres } = detail;

    if (JSON.stringify(show) === '{}') {
        return null;
    }

    const runtime = show.runtime; // Ensure runtime is optional and defaults to 0

    return (
        JSON.stringify(show) !== "{}" && (
            <header className="relative min-h-screen w-full text-white overflow-hidden" style={{
                backgroundSize: "cover",
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${show?.backdrop_path})`
            }}>
                <div className="absolute h-fit w-[50rem] left-32 top-1/2 -translate-y-1/2 z-10">
                    <h1 className="text-4xl font-[900] mb-4 text-white [text-shadow:_0_1px_0_rgb(36_36_36)]">
                        {show?.name || show.original_name}
                    </h1>

                    {runtime && <div className="flex">
                        <img 
                            src='/clock.png' 
                            alt='clock'
                            className="my-auto mr-2 ml-0 w-6 h-6" 
                        />
                        <p className="my-auto mx-0 text-base">
                            {`${Math.floor(runtime / 60)} hours ${runtime - Math.floor(runtime / 60) * 60} minutes`}
                        </p>
                    </div>}

                    <div className="mt-2 flex">
                        <img 
                            alt="imdb" 
                            src='/imdb.png'
                            className="w-8 h-auto"
                        />
                        <p className="my-auto ml-2 font-bold text-base" style={{ color: scoreColor(parseFloat(show.vote_average?.toFixed(1))) }}>
                            {show.vote_average?.toFixed(1)}
                        </p>
                    </div>

                    <div className="inline-flex my-3 mx-0 cursor-pointer">
                        {genres.map((genre, index) => (
                            <React.Fragment key={index}>
                                <p className="my-auto font-medium font-['Muli'] text-sm text-white hover:text-[#cabfbf] cursor-pointer">
                                    {genre}
                                </p>
                                {index < (genres.length - 1) && (
                                    <p className="mx-2">&nbsp;|&nbsp;</p>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="mt-3 w-auto flex">
                        <button 
                            onClick={() => router.push(`/tv/${show.id}/watch?s=1&e=1`)}
                            className="cursor-pointer text-white border-none text-sm font-semibold rounded-2xl mr-3 hover:bg-[#bd251a] px-6 py-3 flex mb-3 bg-[#b12117]"
                        >
                            PLAY
                        </button>
                        <button className="cursor-pointer text-white border-none text-sm font-semibold rounded-2xl mr-3 hover:bg-[#2d9bdf] px-6 py-3 flex mb-3 bg-[#2391d6]">
                            Add to list
                        </button>
                    </div>

                    <div className="w-[85%]">
                        <p className="leading-6 mt-2 text-sm max-w-full font-normal mb-3">
                            {show?.overview}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-[#d3ce12]">Director:</h3>
                        <div className="flex flex-col w-36 mt-3">
                            <img 
                                alt={director?.name}
                                src={director?.profile_path ? (base_url + director.profile_path) : '/default-user.png'}
                                className="w-20 h-20 rounded-[10%] object-cover mx-auto"
                            />
                            <p className="mt-2 mb-0 mx-auto text-center font-medium text-xs">
                                {director?.name}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 w-[85%]">
                        <h3 className="text-base font-semibold text-[#d3ce12]">Top cast:</h3>
                        <div className="flex mt-3 gap-3">
                            {casts.map((actor, index) => (
                                <div key={index} className="flex flex-col w-36">
                                    <img 
                                        alt={actor.name}
                                        src={actor.profile_path ? (base_url + actor.profile_path) : '/default-user.png'}
                                        className="w-20 h-20 rounded-[10%] object-cover mx-auto"
                                    />
                                    <p className="mt-2 mb-0 mx-auto text-center font-medium text-xs">
                                        {actor.name}
                                    </p>
                                    <p className="m-0 mx-auto text-center text-xs">
                                        {actor.character}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute h-full left-0 w-3/4 object-cover bg-gradient-to-l from-transparent to-[rgba(1,1,1,0.8)]"></div>
                <div className="absolute h-[15%] top-0 w-full object-cover bg-gradient-to-b from-[rgba(1,1,1,0.8)] to-transparent"></div>
            </header>
        )
    );
}