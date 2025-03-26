import React from "react";

const Head = (props) => {
  React.useEffect(() => {
    document.title = `${props.title} | Dogs`;

    let metaDescription = document.querySelector("meta[name='description']");

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", props.description || "");
  }, [props.title, props.description]); // Dependências para atualizar corretamente

  return null; // O componente Head não renderiza nada na tela
};

export default Head;
