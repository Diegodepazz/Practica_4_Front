"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token && token !== "undefined");
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (pathname === "/login") return null;

  return (
    <header className="header">
      <div className="headerContent">
        <h1 className="logo" onClick={() => router.push("/")}>
          Nebrija Social
        </h1>

        {hasToken && (
          <div className="headerButtons">
            <button onClick={() => router.push("/")}>Home</button>
            <button onClick={() => router.push("/profile")}>Perfil</button>
            <button onClick={handleLogout}>Salir</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;