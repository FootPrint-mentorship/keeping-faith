import { JSX } from "react";

interface Props {
  onRefectch?: () => void;
  className?: string;
  title?: string;
}

const EmptyTableData = ({ className, title }: Props): JSX.Element => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "5rem 0",
        fontWeight: 600,
        color: "#6b7280",
      }}
    >
      {/* <LineMdEmojiFrownTwotone
        style={{
          marginLeft: "-0.25rem", // -ml-1 in Tailwind
          fontSize: "1.75rem", // text-7xl is ~1.75rem (approximation)
          color: "#d1d5db", // text-appGray300 (assuming this is similar to gray-300)
        }}
      /> */}
      <p>{title ?? "Sorry, no data found."}</p>
    </div>
  );
};

export default EmptyTableData;

// function LineMdEmojiFrownTwotone(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="1em"
//       height="1em"
//       viewBox="0 0 24 24"
//       {...props}
//     >
//       <g stroke="currentColor" strokeLinecap="round" strokeWidth={2}>
//         <path
//           fill="currentColor"
//           fillOpacity={0}
//           strokeDasharray={60}
//           strokeDashoffset={60}
//           d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
//         >
//           <animate
//             fill="freeze"
//             attributeName="stroke-dashoffset"
//             dur="0.5s"
//             values="60;0"
//           ></animate>
//           <animate
//             fill="freeze"
//             attributeName="fill-opacity"
//             begin="1.2s"
//             dur="0.15s"
//             values="0;0.3"
//           ></animate>
//         </path>
//         <path
//           fill="none"
//           strokeDasharray={14}
//           strokeDashoffset={14}
//           d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16"
//         >
//           <animate
//             fill="freeze"
//             attributeName="stroke-dashoffset"
//             begin="1s"
//             dur="0.2s"
//             values="14;0"
//           ></animate>
//         </path>
//       </g>
//       <g fill="currentColor" fillOpacity={0}>
//         <ellipse cx={9} cy={9.5} rx={1} ry={1.5}>
//           <animate
//             fill="freeze"
//             attributeName="fill-opacity"
//             begin="0.6s"
//             dur="0.2s"
//             values="0;1"
//           ></animate>
//         </ellipse>
//         <ellipse cx={15} cy={9.5} rx={1} ry={1.5}>
//           <animate
//             fill="freeze"
//             attributeName="fill-opacity"
//             begin="0.8s"
//             dur="0.2s"
//             values="0;1"
//           ></animate>
//         </ellipse>
//       </g>
//     </svg>
//   );
// }
