import Header from "@/components/Header";
import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { Folder } from "@mui/icons-material";

export default function AuthenticatedApp() {
  return (
    <main>
      <Header />

      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <MoreVert />
          </div>
          <div>
            <div className="relative h-52 w-40 border cursor-pointer hover:border-blue-700">
              <Image src="/plus.png" layout="fill" alt="New document" />
            </div>
            <h2 className="ml-2 mt-2 font-semibold text-sm text-gray-800">
              Blank document
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-800">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My documents</h2>
            <p className="mr-12">Date Created</p>
            <Folder />
          </div>
        </div>
      </section>
    </main>
  );
}
