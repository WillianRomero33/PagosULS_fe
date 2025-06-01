import React, { createContext, useState, useContext } from 'react';

interface UserData {
  firstName: string;
  lastName: string;
  carnet: string;
  career: string;
  email: string;
}

interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "Willian Antonio",
    lastName: "Romero Alvarado",
    carnet: "RA01137239",
    career: "Lic. en Ciencias de la Computación",
    email: "ra01137239@uls.edu.sv"
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};