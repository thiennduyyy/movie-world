'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/components/axios';
import { Movie } from '@/lib/types/types';

function MoviePlayer() {
    const params = useParams();
    const id = params.id as string;
    const [movie, setMovie] = useState<Movie>({} as Movie);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchMovie() {
            try {
                setLoading(true);
                const movie = await axios.get(
                    `/movie/${id}?api_key=efcd4adc614afb568e483ea646cf5b28&language=en-US`
                );
                setMovie(movie.data);
                setError('');
            } catch (err) {
                setError('Failed to load movie');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchMovie();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex pb-[72px]">
            <div className="min-h-screen w-[96rem] bg-inherit flex flex-col mx-auto">
                <iframe 
                    allowFullScreen
                    className="w-full h-[52rem] mt-[100px] mb-0 mx-auto"
                    title={movie.original_title}
                    src={`https://2embed.cc/embed/${movie.imdb_id}`}
                />
                <div className='flex flex-col gap-y-4 mt-6'>
                <h2 className="mt-6 text-white text-xl font-semibold">Discussion</h2>
                <div className="border border-white p-2.5 rounded w-2/5 bg-[#18202c]">
                    <textarea 
                        className="w-full min-h-[100px] bg-transparent text-white text-sm font-light placeholder-gray-400 outline-none resize-none"
                        placeholder="Write comment here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button 
                    className="cursor-pointer text-white border-none text-sm font-semibold rounded-2xl mr-3 hover:bg-[#2d9bdf] px-6 py-3 flex mb-3 bg-[#2391d6] w-fit"
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
    );
}

export default MoviePlayer;