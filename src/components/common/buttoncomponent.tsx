import React, { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  icon?: boolean;
}

const ComponentsButton: React.FC<ButtonProps> = ({
  children,
  variant = "outline",
  className,
  loading = false,
  icon = true,
  ...rest
}) => {
  const baseTextClasses =
    "px-4 py-3  w-full rounded cursor-pointer transition-colors duration-200 flex items-center";
  // Text button variant styles
  const textVariantStyles = {
    outline:
      "bg-[#1F628E] border border-[#1F628E] text-white hover:bg-[#17425f] hover:border-[#134769] focus:bg-[#17425f] ",
    primary:
      "bg-white text-[#1F628E] hover:text-white hover:bg-[#17425f] focus:ring-2 focus:ring-[#17425f]",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300",
  };

  return (
    <div className={`inline-flex w-full ${className}`}>
      <button
        className={`${
          icon ? baseTextClasses : "rounded-md cursor-pointer px-4 py-3"
        } items-center justify-center ${textVariantStyles[variant]} ${
          className || ""
        }`}
        {...rest}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin w-5 h-5" />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default ComponentsButton;
