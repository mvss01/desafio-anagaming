export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Sport {
    key: string;
    title: string;
    group: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Event {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: Bookmaker[];
}

export interface Bookmaker {
    key: string;
    title: string;
    last_update: string;
    markets: Market[];
}

export interface Market {
    key: string;
    last_update: string;
    outcomes: Outcome[];
}

export interface Outcome {
    name: string;
    price: number;
}
