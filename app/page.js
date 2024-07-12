import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center m-4 h-screen">
      <Image src="/docs.png" width={300} height={150} alt="googledocs" />
      <LoginForm />
    </div>
  );
}
