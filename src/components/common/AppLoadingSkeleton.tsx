import { JSX } from "react";

interface Props {
  className?: string;
}

const AppLoadingSkeleton = ({ className }: Props): JSX.Element => {
  return (
    <div
      style={{
        height: 16,
      }}
      className={`animate-pulse rounded-full bg-gray-300 ${className ? className : ""}`}
    />
  );
};

export default AppLoadingSkeleton;
