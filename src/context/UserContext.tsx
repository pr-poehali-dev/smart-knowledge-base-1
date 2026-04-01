import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "manager" | "employee";

export interface CompanyBranding {
  companyName: string;
  logoUrl: string | null;
  primaryColor: string;
  accentColor: string;
  favicon: string | null;
}

export interface CurrentUser {
  id: string;
  name: string;
  role: UserRole;
  plan: string;
  companyId: string;
}

interface UserContextType {
  user: CurrentUser;
  branding: CompanyBranding;
  setUser: (user: CurrentUser) => void;
  setBranding: (branding: CompanyBranding) => void;
}

const defaultBranding: CompanyBranding = {
  companyName: "Умная база знаний",
  logoUrl: null,
  primaryColor: "#4f46e5",
  accentColor: "#7c3aed",
  favicon: null,
};

const defaultUser: CurrentUser = {
  id: "admin-001",
  name: "Администратор",
  role: "admin",
  plan: "Business",
  companyId: "00000000-0000-0000-0000-000000000001",
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  branding: defaultBranding,
  setUser: () => {},
  setBranding: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser>(defaultUser);
  const [branding, setBranding] = useState<CompanyBranding>(defaultBranding);

  return (
    <UserContext.Provider value={{ user, branding, setUser, setBranding }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useIsAdmin() {
  const { user } = useContext(UserContext);
  return user.role === "admin";
}

export function useIsManager() {
  const { user } = useContext(UserContext);
  return user.role === "admin" || user.role === "manager";
}
