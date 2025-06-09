import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as action from "@/action"

type SnippetDetailProps = {
  params: Promise<{ id: string }>;
};

const snippetDetailPage = async ({ params }: SnippetDetailProps) => {
  const id = (await params).id;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    notFound();
  }

  const snippet = await prisma.snippets.findUnique({
    where: {
      id: parsedId,
    },
  });

  if (!snippet) {
    return <h1>Snippet Not Found</h1>; //* important for error handling
  }

  const deleteSnippetAction = action.deleteSnippet.bind(null, snippet.id)
  
  return (
    <div className="flex items-center justify-center flex-col w-full">
        <div className="bg-blue-600 py-6 w-full">
            <h1 className="font-bold text-5xl text-center text-white">Your Details</h1>
        </div>
      <div className="flex items-center justify-between px-10 mt-5 w-full">
        <h1 className="font-bold text-2xl">{snippet.title}</h1>
        <div className="flex items-center gap-4">
          <Link href={`/snippets/${snippet.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <form action={deleteSnippetAction}>
            <Button type="submit">Delete</Button>
          </form>
        </div>
      </div>
      <pre className="flex items-center justify-center w-[80vw] min-h-[45vh] mt-12  bg-gray-400 text-3xl font-bold">
        {/* jaisa humne likha hai vaisa dikhane ke liye pre tag ka use liya hai  */}
        {snippet.code}
      </pre>
    </div>
  );
};

export default snippetDetailPage;

