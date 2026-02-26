import { generateEmbeddings } from "../ai/generateEmbeddings.js";
import { prisma } from "../lib/prisma.js";

export const chunkProcessingHandler = async(job : any) => {
    const chunkId = job.id;
    try{
        const chunk = await prisma.chunk.findFirst({
            where : {id : chunkId}
        });
        if(!chunk){
            throw new Error("Chunk not found in DB");
        }
        const embedding = await generateEmbeddings(chunk.content);
    }
    catch(e){
        throw e;
    }
}