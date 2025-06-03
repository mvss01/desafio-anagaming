import { NextRequest, NextResponse } from "next/server";

const REGIONS = "us,uk,eu";
const MARKETS = "h2h";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const segments = url.pathname.split("/");
        const sportKey = segments[segments.length - 1];

        const response = await fetch(
            `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${process.env.API_KEY}&regions=${REGIONS}&markets=${MARKETS}`
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Erro ao buscar dados da Odds API" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching odds API:", error);
        return NextResponse.json([], { status: 500 });
    }
}
