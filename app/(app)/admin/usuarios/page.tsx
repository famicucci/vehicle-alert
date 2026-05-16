"use client";

import { Typography } from "@/components/Typography";
import UsersList from "./components/UsersList";

const AdminUsuariosPage = () => (
  <>
    <Typography variant="h2" bold className="text-center mb-4">
      Usuarios
    </Typography>
    <UsersList />
  </>
);

export default AdminUsuariosPage;
