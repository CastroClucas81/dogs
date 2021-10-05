import React from "react";

/*
 Enviando dados para a api -- endpoint para cadastrar.

*/

export const UserPost = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    //por padrão o fetch é um get, pra ser um post, deve-se passar as informações dps da vírgula
    fetch("https://dogsapi.origamid.dev/json/api/user", {
      method: "POST",
      //só coloca o header pra n dar erro
      headers: {
        "Content-type": "application/json",
      },
      //aq a gente passa o objeto com os dados
      //esse método pega qualquer objeto e converte numa string
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((json) => {
        console.log(json);
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
        value={email}
        placeholder="insiria o seu e-mail"
        onChange={({ target }) => setEmail(target.value)}
      />
      <input
        type="text"
        value={password}
        placeholder="insiria a senha"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button>Enviar</button>
    </form>
  );
};
