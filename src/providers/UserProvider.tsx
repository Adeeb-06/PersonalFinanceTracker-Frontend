"use client";
import React, { ReactNode } from "react";
import UserContext from "@/app/context/UserContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuth } from "./FirebaseAuthProvider";

interface Props {
  children: ReactNode;
}

const UserProvider = ({ children }: Props) => {
  const { firebaseUser, authLoading } = useAuth();

  const fetchUserData = async () => {
    try {
      const res = await api.get(`api/users/${firebaseUser?.email}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error: unknown) {
      throw error;
    }
  };

  const {
    data: userData,
    isLoading: isUserLoading,
    refetch: refetchUser,
    error: userError,
  } = useQuery({
    queryKey: ["userData", firebaseUser?.email],
    queryFn: () => fetchUserData(),
    enabled: !!firebaseUser?.email && !authLoading,
  });

  const data = {
    userData,
    refetchUser,
    isUserLoading,
    userError,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserProvider;
