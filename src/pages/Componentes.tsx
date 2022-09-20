import { Header } from "components/Header";
import React from "react";
import { ButtonRose } from "ui/ButtonRose";
import { GeneralText } from "ui/GeneralText";
import { Title } from "ui/Title";

export const Componentes = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: 20 }}>Componentes</h1>
      <Header />
      <br />
      <ButtonRose>Boton Rosa</ButtonRose>
      <br />
      <Title>Soy un titulo</Title>
      <br />
      <Title centred>Soy un titulo centrado</Title>
      <br />
      <GeneralText>Soy el texto general</GeneralText>
      <br />
      <GeneralText centred>Soy el texto centrado</GeneralText>
    </div>
  );
};
