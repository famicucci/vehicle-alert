import { auth } from "@/auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const AppHeader = async () => {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const role = (session?.user as { role?: string })?.role;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-between px-4 bg-white border-b border-gray-100">
      <div className="flex items-center truncate max-w-[70%]">
        <span className="text-xs text-gray-400 truncate">{email}</span>
        {role === "ADMIN" && (
          <Link
            href="/admin/usuarios"
            className="text-xs font-medium text-primary ml-2 shrink-0 hover:underline"
          >
            Admin
          </Link>
        )}
      </div>
      <SignOutButton />
    </header>
  );
};

export default AppHeader;
