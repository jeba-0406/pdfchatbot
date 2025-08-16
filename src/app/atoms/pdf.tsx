export default function DocumentIcon({ width = 64, height = 54, color = "#AAAAAA" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 4h7l5 5v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 4v5h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6M9 8h3" />
    </svg>
  );
}
