import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";


// export const dynamic = "force-dynamic"; //? isme jo hmaara home route tha vo bhi dynamic ho gaya tha iss line ko likhne se run the command npx next build --no-lint ! Dynamic symbol is f and static symbol is o
// export const revalidate = 0; //? handle caching according to time

export default async function Home() {
  const snippets = await prisma.snippets.findMany();

  return (
    <div>
      <div className="flex items-center justify-between h-16 w-full px-8">
        <h1 className="text-4xl font-semibold">Snippets</h1>
        <Link href={"/snippets/new"}>
          <Button>New</Button>
        </Link>
      </div>

      {snippets.map((elem, index) => {
        return (
          <div
            key={elem.id} // Ensure unique key for each item
            className={`flex items-center justify-between w-[90%] sm:w-[80%] m-auto px-6 sm:px-12 py-4 mt-7 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              // Cycle through 5 background colors based on index
              [
                "bg-gradient-to-r from-blue-600 to-blue-800",
                "bg-gradient-to-r from-purple-600 to-purple-800",
                "bg-gradient-to-r from-emerald-600 to-emerald-800",
                "bg-gradient-to-r from-rose-600 to-rose-800",
                "bg-gradient-to-r from-indigo-600 to-indigo-800",
              ][index % 5]
            }`}
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white tracking-tight truncate">
              {elem.title}
            </h1>
            <Link href={`/snippets/${elem.id}`}>
              <Button className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200">
                View
              </Button>
            </Link>
          </div>
        );
      })}
      
    </div>
  );
}
