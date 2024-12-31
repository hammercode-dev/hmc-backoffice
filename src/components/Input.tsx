import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type InputProps = {
  full?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ full, className, ...rest }: InputProps) {
  const cssClasses = classNames(
    `rounded-md px-2 py-1 border border-gray-300`,
    className,
    {
      "w-full": full,
    },
  );
  return <input className={cssClasses} {...rest} />;
}
