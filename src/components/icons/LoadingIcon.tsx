const LoadingIcon = () => (
  <svg height="24px" width="24px" viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.25"
    />
    <circle
      cx="12"
      cy="12"
      r="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <animate
        attributeName="stroke-dasharray"
        dur="2s"
        values="0 70; 70 0"
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default LoadingIcon;
