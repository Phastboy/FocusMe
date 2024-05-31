// src/components/ui/button.tsx
import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className,
  disabled = false,
  loading = false,
  ...props
}) => {
  if (!onClick) {
    return;
  }

  const baseClasses =
    "px-4 py-2 rounded-md focus:outline-none transition duration-150 ease-in-out";
  const variantClasses = clsx({
    "bg-blue-800 text-white hover:bg-blue-900": variant === "primary",
    "bg-gray-500 text-white hover:bg-gray-600": variant === "secondary",
    "bg-red-700 text-white hover:bg-red-800": variant === "danger",
    "bg-green-700 text-white hover:bg-green-800": variant === "success",
    "opacity-50 cursor-not-allowed": disabled || loading,
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseClasses, variantClasses, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="animate-pulse">Loading...</span> : children}
    </button>
  );
};
export default Button;
