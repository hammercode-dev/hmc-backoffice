import { PropsWithChildren } from "react";

type SpacerProps = {
  size: 4 | 8 | 16 | 24;
};

export default function Spacer({
  size,
  children,
}: PropsWithChildren<SpacerProps>) {
  return (
    <div className="flex" style={{ gap: size }}>
      {children}
    </div>
  );
}
