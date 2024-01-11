export const SvgLabel = props => {
  return (
    <svg width={10} height={12} viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.5 10.5L5 8l-3.5 2.5v-8a1 1 0 011-1h5a1 1 0 011 1v8z"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
