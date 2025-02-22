type Props = React.SVGProps<SVGSVGElement>;

const Comment = ({ width = "24", height = "24", ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path d="M4.5 3C3.12109 3 2 4.12109 2 5.5V16.75C2 18.1289 3.12109 19.25 4.5 19.25H8.25V22.375C8.25 22.6133 8.38281 22.8281 8.59375 22.9336C8.80469 23.0391 9.05859 23.0156 9.25 22.875L14.082 19.25H19.5C20.8789 19.25 22 18.1289 22 16.75V5.5C22 4.12109 20.8789 3 19.5 3H4.5Z" />
    </svg>
  );
};

export default Comment;
