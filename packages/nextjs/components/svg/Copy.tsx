export const SvgCopy = props => {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_669_110592)" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M11.667 5.25h-5.25c-.645 0-1.167.522-1.167 1.167v5.25c0 .644.522 1.166 1.167 1.166h5.25c.644 0 1.166-.522 1.166-1.166v-5.25c0-.645-.522-1.167-1.166-1.167z"
          stroke="url(#paint0_linear_669_110592)"
        />
        <path
          d="M2.917 8.75h-.584a1.167 1.167 0 01-1.167-1.167v-5.25a1.167 1.167 0 011.167-1.166h5.25A1.167 1.167 0 018.75 2.333v.584"
          stroke="url(#paint1_linear_669_110592)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_669_110592"
          x1={4.93977}
          y1={9.04167}
          x2={12.8333}
          y2={9.04167}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#439DFF" />
          <stop offset={1} stopColor="#6052FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_669_110592"
          x1={0.856277}
          y1={4.95834}
          x2={8.74984}
          y2={4.95834}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#439DFF" />
          <stop offset={1} stopColor="#6052FF" />
        </linearGradient>
        <clipPath id="clip0_669_110592">
          <path fill="#fff" d="M0 0H14V14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
