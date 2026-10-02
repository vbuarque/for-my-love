import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Texto para leitores de tela e tooltip (o botão só tem ícone). */
  label: string;
  variant?: "ghost" | "solid";
  size?: "md" | "lg";
  children: ReactNode;
}

const sizes = {
  md: "size-11",
  lg: "size-14 lg:size-16",
};

const variants = {
  ghost: "text-text-muted hover:bg-surface-active hover:text-text",
  solid:
    "bg-primary text-default hover:bg-primary-hover hover:shadow-[0_6px_20px_rgba(240,90,104,0.18)] active:bg-primary-active",
};

export function IconButton({
  label,
  variant = "ghost",
  size = "md",
  className = "",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex shrink-0 items-center justify-center rounded-full transition-all duration-180 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
