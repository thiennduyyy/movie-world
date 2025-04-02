'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from '@/components/axios';
import { TVShow, Season } from '@/lib/types/types';
import EpisodeHandler from '@/components/EpisodeHandler/EpisodesHandler';

function TVShowPlayer() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const season = searchParams.get('s');
    const episode = searchParams.get('e');
    
    const [tvShow, setTvShow] = useState<TVShow>({} as TVShow);
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        async function fetchShow() {
            try {
                const tvShow = await axios.get(
                    `/tv/${id}?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`
                );
                setTvShow(tvShow.data);
                
                const seasonsList = tvShow.data.seasons?.filter(
                    (season: Season) => season.season_number > 0
                ) || [];
                setSeasons(seasonsList);
            } catch (error) {
                console.error('Error fetching TV show:', error);
            }
        }
        
        if (id) {
            fetchShow();
        }
    }, [id]);

    if (!season || !episode) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex pb-[72px]">
            <div className="min-h-screen w-[96rem] bg-inherit flex flex-col mx-auto">
                <iframe 
                    className="w-full h-[52rem] mt-[100px] mb-0 mx-auto"
                    title={tvShow.original_name}
                    src={`https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`}
                    allowFullScreen
                />
                
                {seasons && (
                    <EpisodeHandler 
                        seasons={seasons}
                        season={season}
                        episode={Number(episode)}
                        count={seasons.length}
                    />
                )}

                <h2 className="mt-6 text-white text-xl font-semibold">Discussion</h2>
                <div className="mt-6 border border-white rounded w-2/5 bg-[#18202c]">
                    <div className="border-b border-white p-2.5">
                        <textarea 
                            className="w-full min-h-[100px] bg-transparent text-white placeholder-gray-400 outline-none resize-none"
                            placeholder="Write comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-[#272f3d] rounded-b">
                        <button 
                            className="px-4 py-2 text-white hover:bg-[#323d4f] transition-colors rounded-b disabled:opacity-50"
                            disabled={!comment.trim()}
                            onClick={() => {
                                // TODO: Implement comment posting functionality
                                console.log('Posting comment:', comment);
                                setComment('');
                            }}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TVShowPlayer;