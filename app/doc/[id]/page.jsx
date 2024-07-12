"use client";
import { auth, db } from "@/firebase";
import { doc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextEditor from "@/components/TextEditor";
import { signOut } from "firebase/auth";

const Doc = ({ params }) => {
  const [user, loadingAuth] = useAuthState(auth);
  const router = useRouter();
  const { id } = params;
  const docRef = user && doc(db, "userDocs", user.email, "docs", id);
  const [snapshot, loadingDoc, error] = useDocumentOnce(docRef);

  // Handle redirection in useEffect to ensure it only happens after auth state is resolved
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push("/");
    }
  }, [user, loadingAuth, router]);

  useEffect(() => {
    // Redirect if user tries to access a URL they do not have access to...
    if (!loadingDoc && snapshot && !snapshot.data()?.fileName) {
      router.replace("/home");
    }
  }, [snapshot, loadingDoc, router]);

  if (loadingAuth || loadingDoc) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer" onClick={() => router.push("/home")}>
          <Image src="/logo.png" alt="Google Docs" width={50} height={30} />
        </span>
        <div className="flex-grow px-2">
          <h2 className="font-bold">{snapshot?.data()?.fileName}</h2>
          <div className="hidden sm:flex items-center  text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
            <p className="option">Extensions</p>
            <p className="option">Help</p>
          </div>
        </div>
        <button className="hidden md:inline-flex items-center justify-center px-5 py-2 bg-light-blue-100 rounded-full space-x-1 hover:bg-[#B2D7EF]">
          <LockOutlinedIcon fontSize="small" />
          <span className="text-sm">Share</span>
        </button>
        <img
          onClick={() => signOut(auth)}
          src={user?.photoURL}
          className="rounded-full h-10 w-10 ml-2 cursor-pointer"
          alt=""
        />
      </header>
      <TextEditor id={id} />
    </div>
  );
};

export default Doc;
