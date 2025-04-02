// Movie types
export type Movie = {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  original_title?: string;
  backdrop_path?: string;
  poster_path?: string;
  overview?: string;
  vote_average: number;
  runtime?: number;
  genres?: { id: number; name: string }[];
  release_date?: string;
  first_air_date?: string;
  imdb_id?: string;
};

// TV Show types
export type Season = {
  season_number: number;
  episode_count: number;
  name?: string;
  overview?: string;
  air_date?: string;
  poster_path?: string;
};

export type Creator = {
  id: number;
  name: string;
  profile_path?: string;
  gender?: number;
  credit_id?: string;
};

export type Episode = {
  id: number;
  name: string;
  overview?: string;
  episode_number: number;
  air_date?: string;
  still_path?: string;
  vote_average?: number;
};

export type TVShow = {
  id: number;
  name: string;
  original_name?: string;
  backdrop_path?: string;
  poster_path?: string;
  overview?: string;
  vote_average: number;
  first_air_date?: string;
  genres?: { id: number; name: string }[];
  created_by?: Creator[];
  seasons?: Season[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  status?: string;
  type?: string;
  networks?: { id: number; name: string; logo_path?: string }[];
  last_air_date?: string;
  homepage?: string;
  in_production?: boolean;
  runtime?: number;
};

export type TVShowCredit = {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path?: string;
    order: number;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path?: string;
  }[];
};

export type TVShowDetail = {
  show: TVShow;
  credits: {
    casts: {
      name: string;
      character: string;
      profile_path?: string;
    }[];
    director: {
      name: string;
      profile_path?: string;
      character?: string;
    };
  };
  genres: string[];
};