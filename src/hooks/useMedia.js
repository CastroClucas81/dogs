import React from "react";

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);

  React.useEffect(() => {
    function changeMatch() {
      //é basicamente um mediaquery
      const { matches } = window.matchMedia("(max-width: 40rem)");

      setMatch(matches);
    }
    changeMatch();
    //quando tiver um resize na tela ele ativa a funcao
    window.addEventListener("resize", changeMatch);
    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]);
  return match;
};

export default useMedia;
