import classNames from "classnames";

type BadgeProps = {
  text: string;
  variant: "neutral" | "danger" | "success";
};

export default function Badge({ text, variant }: BadgeProps) {
  const isNeutral = variant === "neutral";
  const isSuccess = variant === "success";
  const isDanger = variant === "danger";

  const cssClassNames = classNames("px-1 py-1", {
    "text-gray-600 bg-gray-100": isNeutral,
    "text-green-600 bg-green-200": isSuccess,
    "text-red-600 bg-red-200": isDanger,
  });

  return <span className={cssClassNames}>{text}</span>;
}
