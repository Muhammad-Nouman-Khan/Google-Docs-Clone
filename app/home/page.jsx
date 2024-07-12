"use client";
import Header from "@/components/Header";
import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { Folder } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import DocumentRow from "@/components/DocumentRow";

export default function AuthenticatedApp() {
  const [user, loadingAuth] = useAuthState(auth);
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push("/");
    }
  }, [user, loadingAuth, router]);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const handleOpen = () => setOpen(!open);

  const userDocsRef = user && collection(db, "userDocs", user.email, "docs");
  const [snapshot, loading, error] = useCollectionOnce(
    user && query(userDocsRef, orderBy("timestamp", "desc"))
  );

  const createDocument = async () => {
    if (!input) return;
    try {
      await addDoc(userDocsRef, {
        fileName: input,
        timestamp: serverTimestamp(),
      });
      setInput("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (loadingAuth || loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const modal = (
    <Dialog open={open} handler={handleOpen}>
      <DialogBody>
        <input
          className="outline-none w-full"
          placeholder="Enter name of document..."
          type="text"
          value={input}
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
          onChange={(e) => setInput(e.target.value)}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="blue"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>

        <Button variant="gradient" color="blue" onClick={createDocument}>
          <span>Create</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );

  return (
    <main>
      <Header />
      {modal}
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <MoreVert />
          </div>
          <div>
            <div
              onClick={() => setOpen(true)}
              className="relative h-52 w-40 border cursor-pointer hover:border-blue-700"
            >
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

          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
