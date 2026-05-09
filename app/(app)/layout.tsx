import Menu from "@/components/Menu/Menu";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="p-4 pb-24">{children}</main>
      <Menu />
    </>
  );
}
