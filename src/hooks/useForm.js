import React from "react";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um e-mail válido.",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: "A senha precisa ter 1 caracter maiúsculo, 1 minúsculo e 1 dígito com no mínimo 8 caracteres"
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize apenas números."
  }
};

const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validate(value) {
    //erros
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      //se n tiver error
      return true;
    }
  }

  //mesma funcao do formulario
  function onChange({ target }) {
    //remover error assim q tiver alguma info no input
    if (error) {
      validate(target.value);
    }

    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    //usuario tira o foco do campo
    onBlur: () => validate(value),
  };
};

export default useForm;
