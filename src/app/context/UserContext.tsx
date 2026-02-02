import { useSession } from "next-auth/react";
import { createContext } from "react";


const UserContext = createContext(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || null;
    return (    
    <UserContext.Provider value={userEmail}>
      {children}
    </UserContext.Provider>
  );
}