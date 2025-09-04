import { createContext } from 'react';

interface User {
  id: number;
  userType: string;
  email?: string;
  name?: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);
