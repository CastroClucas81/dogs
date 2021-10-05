import React from "react";
import UserHeaderNav from "../userHeaderNav/UserHeaderNav";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";

const UserHeader = () => {
  const [title, setTitle] = React.useState("");
  //saber qual pg eu estou
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case "/conta/postar":
        setTitle("Poste Sua Foto");
        break;
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      default:
        setTitle("Minha Conta");
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
