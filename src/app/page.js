import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function PrivatePage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen border p-2 gap-10 ">
      <div className="text-xl">Welcome to my chatApp</div>
      <div className="flex gap-5">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>register</Button>
        </Link>
      </div>
    </div>
  );
}
