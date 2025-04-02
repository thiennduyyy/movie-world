'use client';
import { use } from "react";
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { GenresContext } from '@/lib/genresProvider';
import Row from '@/components/Row/Row';

function ListByGenres({ params }: { params: Promise<{ genre_id: string }> }) {
    const searchParams = useSearchParams();
  const type = searchParams.get('type');
    const genresContext = useContext(GenresContext);

    if (!genresContext) {
        throw new Error('GenresContext is not provided');
    }

    const { genreList } = genresContext;
    
    const { genre_id } = use(params);
    console.log('type, genre', type, genre_id);
    const [url, setUrl] = useState(`/discover/${type}?api_key=efcd4adc614afb568e483ea646cf5b28&with_genres=${genre_id}`);

    useEffect(() => {
        if (type && genre_id) {
            setUrl(`/discover/${type}?api_key=efcd4adc614afb568e483ea646cf5b28&with_genres=${genre_id}`);
        }
    }, [genre_id, type]);

    if (!genre_id || !type || !genreList) {
        return (
            <div className="min-h-screen bg-[#0e0e0e] pt-[72px] pb-4">
                <div className="text-white text-center">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0e0e0e] pt-[72px] pb-4">
            <div className="text-white relative min-h-[560rem]">
                <Row 
                    fetchUrl={url}
                    title={`Genre: ${genreList[genre_id]}`}
                    amount={20}
                    hasIcon={false}
                />
            </div>
        </div>
    );
}

export default ListByGenres;