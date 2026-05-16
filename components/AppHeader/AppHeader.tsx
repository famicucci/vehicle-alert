import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";

const AppHeader = async () => {
  const session = await auth();
  const email = session?.user?.email ?? "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-between px-4 bg-white border-b border-gray-100">
      <span className="text-xs text-gray-400 truncate max-w-[70%]">{email}</span>
      <SignOutButton />
    </header>
  );
};

export default AppHeader;
