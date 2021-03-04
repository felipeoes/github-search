import React from "react";
import { useAuth } from "../contexts/auth";
import AuthRoutes from "../routes/authRoutes";
import AppRoutes from "../routes/appRoutes";

export default function Routes() {
  const { signed } = useAuth();

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
