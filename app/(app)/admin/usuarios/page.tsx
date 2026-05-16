import { auth } from "@/auth";
import { Typography } from "@/components/Typography";
import UsersList from "./components/UsersList";

const AdminUsuariosPage = async () => {
  const session = await auth();
  const currentUserId = Number(session?.user?.id);

  return (
    <>
      <Typography variant="h2" bold className="text-center mb-4">
        Usuarios
      </Typography>
      <UsersList currentUserId={currentUserId} />
    </>
  );
};

export default AdminUsuariosPage;
