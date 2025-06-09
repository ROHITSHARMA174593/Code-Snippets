import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import React from 'react'

const CreateSnippetPage = () => {

    const createSnippet = async(formData:FormData) => {
        "use server"
        const title = formData.get("title") as string
        const code = formData.get("code") as string
        

        const snippet = await prisma.snippets.create({
            data:{
                title,
                code
            }
        })
        console.log("Created Snippet : ",snippet)

        redirect("/")
    }

  return (
    <form action={createSnippet} className='w-full h-screen mt-5 px-20'>
      <div>
        <Label className='py-3 text-4xl font-bold '>Title</Label>
        <Input type='text' placeholder='Write only Java code inside TextArea' id='title' name='title'/>
      </div>
      <div>
        <Label className='py-3 text-4xl font-bold '>Code</Label>
        <Textarea placeholder='' id='code' name='code' />
      </div>
      <Button type='submit' className='w-full h-10 mt-5 cursor-pointer text-2xl'>New</Button>
    </form>
  )
}

export default CreateSnippetPage
