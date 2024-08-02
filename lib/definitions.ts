
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    icon: string;
    birthday: string;
  };
  
  export type FellowTraveler = {
    id: number;
    user_id: string;
    fellow_id: string;
  };
  
  export type TripboardUser = {
    id: number;
    user_id: string;
    board_id: string;
  };
  
  export type TripBoard = {
    id: string;
    title: string;
    startday: string;
    endday?: string;
    thumbnail: string;
    owner_id: string;
    last_update: string;
  };
  
  export type TripCard = {
    id: string;
    board_id: string;
    memo?: string;
    thumbnail_id: number;
    location_pointx?: number;
    location_pointy?: number;
  };
  
  export type CardPicture = {
    id: string;
    card_id: string;
    picture?: string;
    photo_date?: string;
  };