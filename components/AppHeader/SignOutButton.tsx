"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const SignOutButton = () => (
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
  >
    <LogOut size={16} />
  </button>
);

export default SignOutButton;
