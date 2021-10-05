//componente global

import React from "react";
import { useNavigate } from "react-router";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";

//definindo context
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  //dados usuário
  const [data, setData] = React.useState(null);

  //verificar se o usuáro ta logado ou n
  const [login, setLogin] = React.useState(null);

  //loading
  const [loading, setLoading] = React.useState(false);

  //error
  const [error, setError] = React.useState(null);

  //redirect user
  const navigate = useNavigate();

  //logout
  const userLogout = React.useCallback(
    async function userLogout() {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  //loga o usuário
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      //retornando o token
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Erro: Usuário inválido.`);
      //json é o meu token de verificacao de conta
      const { token } = await tokenRes.json();
      //jogando o token no localstorage
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
