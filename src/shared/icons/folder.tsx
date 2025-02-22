type Props = React.SVGProps<SVGSVGElement>;

const Folder = ({ width = "24", height = "24", ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path d="M4.5 20.5H19.5C20.8789 20.5 22 19.3789 22 18V8C22 6.62109 20.8789 5.5 19.5 5.5H13.25C12.8555 5.5 12.4844 5.31641 12.25 5L11.5 4C11.0273 3.37109 10.2852 3 9.5 3H4.5C3.12109 3 2 4.12109 2 5.5V18C2 19.3789 3.12109 20.5 4.5 20.5Z" />
    </svg>
  );
};

export default Folder;
