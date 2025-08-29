import { LucideProps } from "lucide-react";
import React, { useState } from "react";

interface ComponentSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  underline?: boolean;
}

const ComponentSelect: React.FC<ComponentSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  icon: Icon, // renamed so we can use <Icon />
  underline = false, // default
}) => {
  const [, setIsFocused] = useState(false);

  // build classes array style
  const baseClasses = [
    "w-full",
    "border",
    "border-gray-300",
    "rounded",
    "p-3",
    "focus-within:outline-none",
    "focus-within:ring-1",
    "focus-within:ring-[#17425F]",
    error ? "border-red-500" : "",
    underline ? "underline" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor={name} className="block mb-2 items-center space-x-2">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={baseClasses}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ComponentSelect;
