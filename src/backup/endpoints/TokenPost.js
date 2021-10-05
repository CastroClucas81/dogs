import React from "react";

/*
 pegar os dados da api -- endpoint para buscar.

*/

export const TokenPost = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  //exibir na tela
  const [token, setToken] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    //por padrão o fetch é um get, pra ser um post, deve-se passar as informações dps da vírgula
    fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
      method: "POST",
      //só coloca o header pra n dar erro
      headers: {
        "Content-type": "application/json",
      },
      //aq a gente passa o objeto com os dados
      //esse método pega qualquer objeto e converte numa string
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((json) => {
        console.log(json);
        setToken(json.token)
        return json;
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        placeholder="insiria o seu nome"
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="text"
        value={password}
        placeholder="insiria a senha"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button>Enviar</button>
      <p>{token}</p>
    </form>
  );
};
