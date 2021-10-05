import React from "react";

/*
 Enviando dados para a api -- endpoint para cadastrar.

*/

export const PhotoPost = () => {
  const [token, setToken] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [peso, setPeso] = React.useState("");
  const [idade, setIdade] = React.useState("");
  const [img, setImg] = React.useState("");

  const formData = new FormData();
  formData.append("img", img);
  formData.append("nome", nome);
  formData.append("peso", peso);
  formData.append("idade", idade);

  function handleSubmit(e) {
    e.preventDefault();

    //por padrão o fetch é um get, pra ser um post, deve-se passar as informações dps da vírgula
    fetch("https://dogsapi.origamid.dev/json/api/photo", {
      method: "POST",
      //só coloca o header pra n dar erro
      //pra formdata deixa vazio
      headers: {
        Autorization: 'Bearer ' + token,
      },
      //Tem q passar como form-data pq vamos trazer uma imagem
      body: formData,
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
        value={token}
        placeholder="token"
        onChange={({ target }) => setToken(target.value)}
      />
      <input
        type="text"
        value={nome}
        placeholder="nome"
        onChange={({ target }) => setNome(target.value)}
      />
      <input
        type="text"
        value={peso}
        placeholder="peso"
        onChange={({ target }) => setPeso(target.value)}
      />
      <input
        type="text"
        value={idade}
        placeholder="idade"
        onChange={({ target }) => setIdade(target.value)}
      />
      <input type="file" onChange={({ target }) => setImg(target.files[0])} />

      <button>Enviar</button>
    </form>
  );
};
