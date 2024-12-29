import {neon} from "@neondatabase/serverless";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        const sql = neon(`${process.env.DATABASE_URL}`)
        const newPrompt = await sql`INSERT INTO prompt (creator_id,prompt,tag)  VALUES (${userId}, ${prompt}, ${tag}) RETURNING *`;
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
