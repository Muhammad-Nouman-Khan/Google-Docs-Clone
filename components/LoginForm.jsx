"use client";
import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const handleSubmit = async (e) => {
    try {
      const res = await signInWithPopup(auth, provider);
      router.push("/home");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form action={handleSubmit}>
      <button
        className="bg-pink-400 text-white p-1 rounded-md m-1 text-lg"
        type="submit"
        name="action"
        value="google"
      >
        Sign In With Google
      </button>
    </form>
  );
};

export default LoginForm;
