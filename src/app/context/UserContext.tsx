"use client"
import React,{ createContext, Dispatch, SetStateAction } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import { useSession } from "next-auth/react";


interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  balance: number;
}


interface UserCont{
    userData: User;
    refetchUser: () => Promise<QueryObserverResult<User[], Error>>;
    isUserLoading: boolean,
    userError: Error | null
}

const UserContext = createContext<UserCont | null>(null);


export default UserContext