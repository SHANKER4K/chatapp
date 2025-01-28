import React from "react";
import { CardTitle } from "@/components/ui/card";
import Link from "next/link";

function Confirmations() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-10">
        <CardTitle>Confirm your email</CardTitle>
        <p className="text-sm text-gray-500">
          We have sent you an email with a confirmation link. Please click on
          the link to confirm your email.
        </p>
        <Link href="/login">
          <p className="text-blue-500 underline">Back to login</p>
        </Link>
      </div>
    </div>
  );
}

export default Confirmations;
