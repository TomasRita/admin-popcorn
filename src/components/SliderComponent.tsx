import React from "react";
import defaultImage from "../assets/image/homem.svg";

interface SliderComponentProps {
  img?: string;
}

const SliderComponent: React.FC<SliderComponentProps> = ({ img = defaultImage }) => {
  return (
    <div className="hidden lg:flex relative w-9/12 items-center justify-center overflow-hidden z-10">
      {/* Camadas para transição dos slides */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
        style={{ backgroundImage: `url(${img})` }}
      />
    </div>
  );
};

export default SliderComponent;