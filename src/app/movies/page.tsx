import React from 'react';
import { moviesURL } from '@/lib/requests';
import Row from '@/components/Row/Row';

function Movies() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pb-4 pt-[72px]">
      <div className="text-white relative">
        <Row 
          title="Top rated" 
          fetchUrl={moviesURL.nowPlaying} 
          amount={10}
        />
        <Row 
          title="Airing today" 
          fetchUrl={moviesURL.popular} 
          amount={10}
        />
        <Row 
          title="Popular" 
          fetchUrl={moviesURL.topRated} 
          amount={10}
        />
        <Row 
          title="TV on the air" 
          fetchUrl={moviesURL.upcoming} 
          amount={10}
        />
      </div>
    </div>
  );
}

export default Movies;