// import { Editor } from "@monaco-editor/react";
import EditSnippetForm from "@/components/EditSnippetForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";


type EditSnippetPageProps = {
    params: Promise<{id: string}>
}
const EditPageSnippet = async({params}:EditSnippetPageProps) => {
    const id = (await params).id
    const parsedId = parseInt(id, 10);

    if(isNaN(parsedId)){
        notFound()
    }

    const snippet = await prisma.snippets.findUnique({
        where:{
            id: parsedId,
        }
    })
    if (!snippet) {
        return <h1>Snippet Not Found</h1>; // * Important for error handling 
    }
  return (    
      <EditSnippetForm snippet={snippet}/>
  );
};



export default EditPageSnippet;
