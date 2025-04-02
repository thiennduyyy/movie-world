import React from 'react';
import { tvURL } from '@/lib/requests';
import Row from '@/components/Row/Row';

function TvShows() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-4 pt-[72px]">
      <div className="text-white relative">
        <Row 
          title="Top rated" 
          fetchUrl={tvURL.topRated} 
          amount={10}
        />
        <Row 
          title="Airing today" 
          fetchUrl={tvURL.airingToday} 
          amount={10}
        />
        <Row 
          title="Popular" 
          fetchUrl={tvURL.popular} 
          amount={10}
        />
        <Row 
          title="TV on the air" 
          fetchUrl={tvURL.onTheAir} 
          amount={10}
        />
      </div>
    </div>
  );
}

export default TvShows;