type Props = React.SVGProps<SVGSVGElement>;
const Chevron = ({ width = "24", height = "24", ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path d="M8.25117 11.3948C7.91628 11.7296 7.91628 12.2731 8.25117 12.6078L13.3952 17.749C13.7301 18.0837 14.2739 18.0837 14.6088 17.749C14.9437 17.4143 14.9437 16.8707 14.6088 16.536L10.0703 12L14.6061 7.46402C14.941 7.12931 14.941 6.58574 14.6061 6.25103C14.2713 5.91632 13.7274 5.91632 13.3925 6.25103L8.24849 11.3922L8.25117 11.3948Z" />
    </svg>
  );
};

export default Chevron;
