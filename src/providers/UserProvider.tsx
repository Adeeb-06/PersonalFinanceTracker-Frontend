"use client"
import React, { ReactNode, useState } from "react";
import UserContext from "@/app/context/UserContext";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}



const UserProvider = ({ children }: Props) => {
  const{data: session} = useSession()

  const fetchUserData = async()=>{
    try {
        const res = await axios.get(`http://localhost:9000/api/users/${session?.user.email}`)
         return res.data
    } catch (error:unknown) {
        throw error
    }
  }

  const {
    data: userData,
    isLoading: isUserLoading,
    refetch: refetchUser,
    error: userError
  } = useQuery({
    queryKey:["userData" , session?.user],
    queryFn: ()=> fetchUserData(),
    enabled: !!session?.user
  })


  const data = {
    userData,
    refetchUser,
    isUserLoading,
    userError
  }

  return (<UserContext.Provider value={data}>{children}</UserContext.Provider>)
};

export default UserProvider;
