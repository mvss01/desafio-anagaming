export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface SportCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
    isActive: boolean;
}

export interface Team {
    id: string;
    name: string;
    logo?: string;
    country?: string;
}

export interface Match {
    id: string;
    homeTeam: Team;
    awayTeam: Team;
    date: string;
    time: string;
    status: "upcoming" | "live" | "finished";
    category: string;
    league: string;
    odds: {
        home: number;
        draw?: number;
        away: number;
    };
}

export interface Odd {
    id: string;
    match: Match;
    bookmaker: string;
    homeOdd: number;
    drawOdd?: number;
    awayOdd: number;
    margin: number;
    lastUpdated: string;
}

export interface FavoriteCategory {
    id: string;
    categoryId: string;
    order: number;
}

// Extend NextAuth types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface User {
        id: string;
    }
}
