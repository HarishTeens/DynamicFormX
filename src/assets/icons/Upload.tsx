const Upload: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      fill='none'
      height='18'
      viewBox='0 0 24 24'
      width='18'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M0 0h24v24H0z' fill='currentColor' />
      <path d='M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z' fill='none' />
    </svg>
  );
};

export default Upload;
