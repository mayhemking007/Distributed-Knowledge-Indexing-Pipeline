import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { generateEmbeddings } from "../ai/generateEmbeddings.js";

export const queryRouter = Router();

queryRouter.post('/', async (req, res) => {
    const {query, documentId} = req.body;
    try{
        const doc = await prisma.document.findFirst({
            where : {id : documentId}
        });
        if(!doc){
            res.status(403).json({
                success : false,
                error : "Document not found"
            });
            return;
        }
        if(doc!.status != 'COMPLETE'){
            res.status(400).json({
                success : false,
                error : "Document is not processed"
            });
            return;
        }
        const queryEmbeddings = await generateEmbeddings(query as string);
        if(queryEmbeddings) console.log("Query embeddings generated");
        const queryVectorString = `[${queryEmbeddings.join(',')}]`;

        

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            error : "Internal Server Error"
        })
    }
});