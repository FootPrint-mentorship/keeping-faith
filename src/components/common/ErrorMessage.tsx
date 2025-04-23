import { JSX } from "react";

interface Props {
  message: string | null;
}

const ErrorMessage = ({ message }: Props): JSX.Element | null => {
  if (!message) return null;
  return (
    <p
      style={{
        marginTop: "0.25rem", // mt-1 = 0.25rem (4px)
        padding: "0.25rem", // p-1 = 0.25rem (4px)
        fontSize: "0.75rem",
        textTransform: "lowercase", // lowercase
        color: "#ef4444", // text-red-500
      }}
    >
      {message?.split('"')?.join("")}
    </p>
  );
};

export default ErrorMessage;
