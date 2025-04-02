'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { GenresContext } from '@/lib/genresProvider';
import Row from '@/components/Row/Row';

function ListBySearch() {
    const genres = useContext(GenresContext);
    const searchParams = useSearchParams();
      const searchString = searchParams.get('q');
    
    const [url, setUrl] = useState(`/search/movie?api_key=efcd4adc614afb568e483ea646cf5b28&query=${searchString}&language=en-US&page=1`);

    useEffect(() => {
        if (searchString) {
            setUrl(`/search/movie?api_key=efcd4adc614afb568e483ea646cf5b28&query=${searchString}&language=en-US&page=1`);
        }
    }, [searchString]);

    if (!searchString) {
        return (
            <div className="min-h-screen bg-[#0e0e0e] pt-[72px] pb-4">
                <div className="text-white text-center">
                    Please enter a search term
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0e0e0e] pt-[72px] pb-4">
            <div className="text-white relative">
                <Row 
                    fetchUrl={url}
                    title={`Search for: ${searchString}`}
                    amount={20}
                    hasIcon={false}
                />
            </div>
        </div>
    );
}

export default ListBySearch;