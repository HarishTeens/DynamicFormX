const Add: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.99992 3.3335C10.4602 3.3335 10.8333 3.70659 10.8333 4.16683V15.8335C10.8333 16.2937 10.4602 16.6668 9.99992 16.6668C9.53968 16.6668 9.16659 16.2937 9.16659 15.8335V4.16683C9.16659 3.70659 9.53968 3.3335 9.99992 3.3335Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.33325 10.0002C3.33325 9.53993 3.70635 9.16683 4.16659 9.16683H15.8333C16.2935 9.16683 16.6666 9.53993 16.6666 10.0002C16.6666 10.4604 16.2935 10.8335 15.8333 10.8335H4.16659C3.70635 10.8335 3.33325 10.4604 3.33325 10.0002Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default Add;
