import {neon} from "@neondatabase/serverless";

export const GET = async (request, { params }) => {
    try {
        const sql= neon(`${process.env.DATABASE_URL}`)

        const prompts = await sql`SELECT * FROM prompt WHERE creator_id = ${params.id}`;

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 