"use client";
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Row from '@/components/Row/Row';

export default function SearchPageWrapper(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage {...props} />
    </Suspense>
  );
}

function SearchPage() {
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