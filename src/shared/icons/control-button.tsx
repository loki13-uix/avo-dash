type Props = React.SVGProps<SVGSVGElement>;
const ControlButton = ({ width = "24", height = "24", ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect
        x="2"
        y="6"
        width="20"
        height="11"
        rx="2"
        fill="#656E78"
        stroke="#656E78"
        stroke-width="1.5"
      />
      <path
        d="M6.20001 9.00293H7.94318C8.66551 9.00293 9.18048 9.11003 9.4881 9.32422C9.79572 9.53841 9.94952 9.84603 9.94952 10.2471C9.94952 10.4658 9.90965 10.6515 9.8299 10.8042C9.75242 10.9569 9.6533 11.0776 9.53253 11.1665C9.41404 11.2554 9.29213 11.3158 9.16681 11.3477V11.3818C9.30353 11.416 9.43911 11.473 9.57355 11.5527C9.71027 11.6302 9.82306 11.7476 9.91193 11.9048C10.0031 12.0597 10.0486 12.2705 10.0486 12.5371C10.0486 12.8402 9.97117 13.1011 9.81622 13.3198C9.66355 13.5386 9.4448 13.7072 9.15997 13.8257C8.87514 13.9419 8.53676 14 8.14484 14H6.20001V9.00293ZM7.55011 10.9204H7.95685C8.18016 10.9204 8.33738 10.8748 8.42853 10.7837C8.51967 10.6903 8.56525 10.5775 8.56525 10.4453C8.56525 10.3086 8.51284 10.2049 8.40802 10.1343C8.30548 10.0614 8.14598 10.0249 7.9295 10.0249H7.55011V10.9204ZM7.55011 11.9082V12.9575H8.02521C8.25991 12.9575 8.42397 12.9074 8.5174 12.8071C8.61082 12.7046 8.65753 12.577 8.65753 12.4243C8.65753 12.3354 8.63702 12.2523 8.59601 12.1748C8.55727 12.0951 8.49005 12.0312 8.39435 11.9834C8.29865 11.9333 8.16648 11.9082 7.99786 11.9082H7.55011Z"
        fill="white"
      />
      <path
        d="M12.7352 13.0122C12.8559 13.0122 12.9665 12.9997 13.0667 12.9746C13.167 12.9495 13.2718 12.9176 13.3812 12.8789V13.853C13.2353 13.9168 13.0804 13.9681 12.9163 14.0068C12.7545 14.0479 12.5472 14.0684 12.2943 14.0684C12.0436 14.0684 11.8226 14.0296 11.6312 13.9521C11.4398 13.8724 11.2905 13.7357 11.1834 13.542C11.0786 13.346 11.0262 13.0737 11.0262 12.7251V11.1289H10.5579V10.5854L11.1526 10.165L11.4979 9.35156H12.3729V10.1274H13.3231V11.1289H12.3729V12.6362C12.3729 12.7616 12.4048 12.8561 12.4686 12.9199C12.5324 12.9814 12.6212 13.0122 12.7352 13.0122Z"
        fill="white"
      />
      <path
        d="M16.4813 10.0591C16.88 10.0591 17.2059 10.1719 17.4588 10.3975C17.7117 10.623 17.8382 10.9842 17.8382 11.481V14H16.5018V11.8877C16.5018 11.6302 16.4642 11.4365 16.389 11.3066C16.3161 11.1745 16.1976 11.1084 16.0335 11.1084C15.7806 11.1084 15.6108 11.2121 15.5242 11.4194C15.4376 11.6245 15.3943 11.9196 15.3943 12.3047V14H14.0579V10.1274H15.0662L15.2474 10.6401H15.2986C15.3807 10.5171 15.4787 10.4123 15.5926 10.3257C15.7065 10.2391 15.8375 10.173 15.9857 10.1274C16.1338 10.0819 16.299 10.0591 16.4813 10.0591Z"
        fill="white"
      />
    </svg>
  );
};

export default ControlButton;
