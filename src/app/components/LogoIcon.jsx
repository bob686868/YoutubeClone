// Create a separate component, or paste this directly into your file
const LogoIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 100 100"
    className="mb-6 mx-auto shadow-[0_0_15px_rgba(37,99,235,0.4)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Subtle blue 'blob' for branding and depth */}
    <rect x="10" y="10" width="80" height="80" rx="20" fill="#2563EB" />
    {/* Sleek 'rocket' or upward vector to symbolize progress and quality */}
    <path
      d="M50 25L65 75L50 65L35 75L50 25Z"
      fill="white"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LogoIcon