import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

type ButtonVariant = "primary" | "danger" | "warning";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
  variant?: ButtonVariant;
};

export default function Button({
  children,
  size = "md",
  variant = "primary",
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const isSmall = size === "sm";
  const isMedium = size === "md";
  const isPrimary = variant === "primary";
  const isDanger = variant === "danger";
  const isWarning = variant === "warning";

  const styles = classNames("text-md cursor-pointer rounded-lg text-white ", {
    "opacity-50": disabled,
    "bg-blue-400": isPrimary,
    "bg-red-500": isDanger,
    "bg-orange-400": isWarning,
    "text-sm px-2 py-1": isSmall,
    "px-3 py-2": isMedium,
  });
  return (
    <button className={styles} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
