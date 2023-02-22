import { type FC } from 'react';

export const CheckCircleIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#9AE6B4"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none" />
      <polyline
        points="172 104 113.3 160 84 132"
        fill="none"
        stroke="#9AE6B4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="#9AE6B4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
    </svg>
  );
};
