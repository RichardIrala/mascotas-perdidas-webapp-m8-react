import { PetCard } from "components/PetCard";
import React from "react";
const ref = [1, 2, 3, 4, 5];
export const MyPetsReported = () => {
  return (
    <div>
      {ref?.map((pet, index) => {
        return (
          <PetCard
            description="sep"
            founded="true"
            idPet={1}
            last_location="Argentina"
            petName="Argentinito"
            pictureURL="https://res.cloudinary.com/richardiral/image/upload/v1662134184/h1mnrupvfcqtq4dif1x2.jpg"
            key={index}
            remove={"true"}
          />
        );
      })}
    </div>
  );
};
