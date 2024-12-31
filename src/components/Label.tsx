import { LabelHTMLAttributes, PropsWithChildren } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({
  children,
  ...rest
}: PropsWithChildren<LabelProps>) {
  return (
    <label className="block" {...rest}>
      {children}
    </label>
  );
}
