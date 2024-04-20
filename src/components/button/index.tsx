"use client";
import React from "react";
import { StaticImageData } from "next/image";

interface ButtonProp {
  colorType:
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "solidDisabled"
    | "ghostDisabled"
    | "red";
  children: React.ReactNode;
  buttonSize:
    | "full"
    | "extraLarge"
    | "large"
    | "medium"
    | "small"
    | "extraSmall"
    | "extraSmall2";
  Icon?: StaticImageData;
  onClick: () => void;
}

const Button: React.FC<ButtonProp> = ({
  colorType,
  children,
  buttonSize,
  Icon,
  onClick,
}) => {
  const getColorClass = () => {
    switch (colorType) {
      case "primary":
        return " rounded-lg bg-primary-200 text-primary-1000 focus:bg-primary-500 focus:border focus:border-primary-800 active:bg-primary-800";

      case "secondary":
        return " rounded-lg bg-secondary-200 text-secondary-1000  focus:bg-secondary-500 focus:border focus:border-secondary-800 active:bg-secondary-800";

      case "tertiary":
        return " rounded-lg bg-tertiary-500 text-tertiary-900 focus:bg-tertiary-500 focus:border focus:border-tertiary-800 active:bg-tertiary-800";

      case "ghost":
        return " rounded-lg border bg-primary-1000 border-primary-200 focus:border-primary-800 focus:text-primary-500 active:border-primary-800 active:text-primary-800";

      case "solidDisabled":
        return " rounded-lg bg-neutral-600 text-primary-1000";

      case "ghostDisabled":
        return " rounded-lg border border-neutral-500 text-neutral-500 bg-neutral-1000";

      case "red":
        return " rounded-lg text-error-1000 bg-error-200 focus:bg-error-400 focus:border focus:border-error-800 active:bg-error-700";
    }
  };

  const getSizeClass = () => {
    switch (buttonSize) {
      case "full":
        return " w-full h-12 text-Button-M";
      case "extraLarge":
        return "w-76 h-11 text-Button-S";
      case "large":
        return "w-50 h-12 text-Button-L";
      case "medium":
        return "w-42 min-w-20 h-13 text-Button-M";
      case "small":
        return "w-38 h-12 text-Button-S";
      case "extraSmall":
        return "w-30 h-9 text-Button-ES";
      case "extraSmall2":
        return "w-36 h-7.5 text-Button-S";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex ${getColorClass()} ${getSizeClass()} justify-center items-center cursor-pointer`}
    >
      <div>{children}</div>
      <div>{Icon && <img src={Icon.src} width={20} height={20} />}</div>
    </div>
  );
};

export default Button;
