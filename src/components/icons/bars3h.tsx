export function Bars3H(props: React.SVGAttributes<{}>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      strokeWidth={1.5}
      stroke="currentColor"
      viewBox="0 0 25 25"
      fill="none"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}
