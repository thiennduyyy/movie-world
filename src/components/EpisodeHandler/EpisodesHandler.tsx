"use client";
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type EpisodeHandlerProps = {
  seasons: { season_number: number; episode_count: number }[];
  season: string;
  episode: number;
  count: number;
};

export default function EpisodesHandlerWrapper(props: EpisodeHandlerProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EpisodeHandler {...props} />
    </Suspense>
  );
}

function EpisodeHandler({ seasons, season, episode, count }: EpisodeHandlerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeSeason, setActiveSeason] = useState<string>(season);
  const [episodeCount, setEpisodeCount] = useState<number>(0);

  useEffect(() => {
    const selectedSeason = seasons.find(
      (season) => season.season_number.toString() === activeSeason
    );
    setEpisodeCount(selectedSeason ? selectedSeason.episode_count : 0);
  }, [activeSeason, seasons]);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-white mr-2 min-w-[100px]">Seasons:</p>
        {seasons.map((item, index) => (
          <div
            key={index}
            className={`w-9 h-9 flex items-center justify-center rounded-md cursor-pointer ${
              item.season_number.toString() === activeSeason
                ? 'bg-[#bd251a] hover:bg-[#b12117]'
                : 'bg-[#323d4f] hover:bg-[#383838]'
            }`}
            onClick={() => setActiveSeason(item.season_number.toString())}
          >
            <p
              className={`text-white font-$
                {item.season_number.toString() === activeSeason ? 'medium' : 'normal'}`}
            >
              {item.season_number}
            </p>
          </div>
        ))}

      </div>
      <div className="flex flex-wrap items-center gap-2 mt-5">
        <p className="text-white mr-2 min-w-[100px]">Episodes:</p>
        {Array.from({ length: episodeCount }, (_, index) => (
          <div
            key={index}
            className={`w-9 h-9 flex items-center justify-center rounded-md cursor-pointer ${
              Number(episode) === index + 1 && activeSeason === season
                ? 'bg-[#2d9bdf] hover:bg-[#2391d6]'
                : 'bg-[#323d4f] hover:bg-[#383838]'
            }`}
            onClick={() => {
              if (index + 1 !== episode) {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.set('s', activeSeason);
                newParams.set('e', (index + 1).toString());
                const currentPath = window.location.pathname;
                router.push(`${currentPath}?${newParams.toString()}`);
              }
            }}
          >
            <p
              className={`text-white font-$
                {Number(episode) === index + 1 && activeSeason === season ? 'medium' : 'normal'}`}

            >
              {index + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}