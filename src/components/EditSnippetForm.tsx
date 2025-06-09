"use client"

import { Editor } from "@monaco-editor/react"
import type { Snippets } from "@prisma/client"
import { useState } from "react"
import { Button } from "./ui/button"
import { saveSnippet } from "@/action"


const EditSnippetForm = ({snippet}: {snippet:Snippets}) => {

    const [code, setCode] = useState(snippet.code)
    const saveSnippetAction = saveSnippet.bind(null, snippet.id, code)

    const changeEventHandler = (value:string = "") => { // agar kisi ne kuch nahi likha ya change kiya to isliye empty string bhi daal diya as a default value  
        setCode(value)
    }

  return (
    <div className="flex items-center justify-center flex-col w-full ">
        <form action={saveSnippetAction} className="py-8 flex items-center justify-between px-12 w-full">
            <h1 className="font-bold text-3xl">Your Code Editor:</h1>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-500 cursor-pointer w-30">Save</Button>
        </form>
      <Editor
        height={"75vh"}
        width={"77vw"}
        defaultLanguage="java"
        theme="vs-dark"
        defaultValue={code}
        onChange={changeEventHandler}
      />
      
    </div>
  )
}
// for the code editor download a npm module ::: npm i @monaco-editor/react -legacy-peer-deps

export default EditSnippetForm
