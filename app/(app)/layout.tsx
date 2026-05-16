import Menu from "@/components/Menu/Menu";
import AppHeader from "@/components/AppHeader/AppHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <main className="p-4 pt-16 pb-24">{children}</main>
      <Menu />
    </>
  );
}
