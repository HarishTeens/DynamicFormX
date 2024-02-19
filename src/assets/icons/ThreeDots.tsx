const ThreeDots: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.66663 12.6667C6.66663 11.9303 7.26358 11.3333 7.99996 11.3333C8.73634 11.3333 9.33329 11.9303 9.33329 12.6667C9.33329 13.403 8.73634 14 7.99996 14C7.26358 14 6.66663 13.403 6.66663 12.6667Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.66663 8C6.66663 7.26362 7.26358 6.66667 7.99996 6.66667C8.73634 6.66667 9.33329 7.26362 9.33329 8C9.33329 8.73638 8.73634 9.33333 7.99996 9.33333C7.26358 9.33333 6.66663 8.73638 6.66663 8Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.66663 3.33333C6.66663 2.59695 7.26358 2 7.99996 2C8.73634 2 9.33329 2.59695 9.33329 3.33333C9.33329 4.06971 8.73634 4.66667 7.99996 4.66667C7.26358 4.66667 6.66663 4.06971 6.66663 3.33333Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ThreeDots;
