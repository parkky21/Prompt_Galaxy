import {neon} from "@neondatabase/serverless";

export const GET = async (request) => {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`)
        const prompts = await sql`
            SELECT
                prompt.id AS post_id,
                prompt.prompt,
                prompt.tag,
                users.id AS user_id,
                users.email,
                users.username,
                users.image
            FROM
                prompt
                    INNER JOIN
                users
                ON
                    prompt.creator_id = users.id;
        `;
        if(prompts.length === 0) return new Response("No prompts found", { status: 404 });

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 