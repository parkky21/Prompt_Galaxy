import {neon} from "@neondatabase/serverless";

export const GET = async (request, { params }) => {

    try {
        const id =(await params).id
        const sql= neon(`${process.env.DATABASE_URL}`)

        const prompts= await sql`SELECT
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
                                         prompt.creator_id = users.id
                                 WHERE
                                     prompt.creator_id = ${id}

        `;

        if(prompts.length === 0) return new Response("No prompts found", { status: 404 });
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 