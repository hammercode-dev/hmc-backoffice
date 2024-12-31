import classNames from "classnames";
import { ReactElement } from "react";

type AlertProps = {
  variant: "info" | "danger";
  message: string | ReactElement;
};

export default function Alert({ variant, message }: AlertProps) {
  const isDanger = variant === "danger";
  const isInfo = variant === "info";
  const cssClassnames = classNames("px-2 py-1", {
    "bg-red-200": isDanger,
    "text-red-800": isDanger,
    "bg-blue-200": isInfo,
    "text-blue-800": isInfo,
  });

  return <div className={cssClassnames}>{message}</div>;
}
