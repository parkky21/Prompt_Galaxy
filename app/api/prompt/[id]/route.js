import {neon} from "@neondatabase/serverless";

export const GET = async (request, { params }) => {
    try {
        const id =(await params).id
        const sql = neon(`${process.env.DATABASE_URL}`)

        const prompt = await sql`SELECT * FROM prompt WHERE id = ${id}`;

        if (prompt.length===0) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        const id =(await params).id
        const sql = neon(`${process.env.DATABASE_URL}`)

        // Find the existing prompt by ID
        const existingPrompt = await sql`SELECT * FROM prompt WHERE id = ${id}`;

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }
        const {updatedPrompt} = await sql`UPDATE prompt SET prompt = ${prompt}, tag = ${tag} WHERE id = ${id} RETURNING *`;

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const id =(await params).id
        const sql = neon(`${process.env.DATABASE_URL}`)
        const {deletedPrompt} = await sql`DELETE FROM prompt WHERE id = ${id} RETURNING *`;

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};
