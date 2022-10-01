import { CheckEmailForm } from "components/CheckEmailForm";
import { Header } from "components/Header";
import { LabelWithInput } from "components/LabelWithInput";
import { LoginForm } from "components/LoginForm";
import { PetCard } from "components/PetCard";
import { SignupForm } from "components/SignupForm";
import React from "react";
import { ButtonLogout } from "ui/ButtonLogout";
import { ButtonRose } from "ui/ButtonRose";
import { GeneralText } from "ui/GeneralText";
import { Title } from "ui/Title";

export const Componentes = () => {
  return (
    <div style={{ padding: 10 }}>
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
      <br />
      <PetCard
        description="si"
        founded="true"
        idPet={"4"}
        last_location="Mock1"
        petName="Alfredo"
        pictureURL="https://res.cloudinary.com/richardiral/image/upload/v1662134184/h1mnrupvfcqtq4dif1x2.jpg"
        remove={true}
      />
      <PetCard
        description="si"
        founded="true"
        idPet={"4"}
        last_location="Mock2"
        petName="Alfredo 2"
        pictureURL="https://res.cloudinary.com/richardiral/image/upload/v1662134184/h1mnrupvfcqtq4dif1x2.jpg"
      />
      <br />
      <LabelWithInput inputName="email" autocomplete="off">
        Email
      </LabelWithInput>
      <br />
      <CheckEmailForm />
      <br />
      <LoginForm />
      <br />
      <SignupForm />
      <br />
      <ButtonLogout />
    </div>
  );
};
