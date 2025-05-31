"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export const saveSnippet = async(id:number, code:string) => {
    await prisma.snippets.update({
        where:{
            id
        },
        data:{
            code
        },
        
    })  
    redirect(`/snippets/${id}`) 
}


export const deleteSnippet = async(id:number) => {
    await prisma.snippets.delete({
        where:{
            id
        }
    })  
    redirect("/")  
}