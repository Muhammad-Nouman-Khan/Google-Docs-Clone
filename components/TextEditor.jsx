import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

const TextEditor = ({ id }) => {
  const [user] = useAuthState(auth);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!user) return;

    const fetchDocument = async () => {
      const docRef = doc(db, "userDocs", user.email, "docs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        if (docData.editorState) {
          const contentState = convertFromRaw(docData.editorState);
          setEditorState(EditorState.createWithContent(contentState));
        }
      }
    };

    fetchDocument();
  }, [user, id]);

  const onEditorStateChange = async (editorState) => {
    setEditorState(editorState);
    if (!user) return;

    const docRef = doc(db, "userDocs", user.email, "docs", id);
    await setDoc(
      docRef,
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      { merge: true }
    );
  };

  return (
    <div className="bg-[#FBF9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="demo-toolbar-custom flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border min-h-screen"
      />
    </div>
  );
};

export default TextEditor;
