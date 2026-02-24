import { documentParser } from "../lib/documentParser.js";
import { prisma } from "../lib/prisma.js";

export const DocumentSplitHandler = async (job : any) => {
    const docId = job.id;
    try{
        const doc = await prisma.document.findFirst({
            where : {id : docId}
        });
        if(!doc) throw new Error(`Cannot find document with id ${docId}`);
        const content = await documentParser(doc);
        

    }
    catch(e){
        console.log(e);
        throw e;
    }
} 