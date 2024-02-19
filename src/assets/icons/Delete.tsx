const Dustbin: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) => {
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
        d='M2.5 5H4.16667H17.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.33325 2.50016C8.11224 2.50016 7.90028 2.58796 7.744 2.74424C7.58772 2.90052 7.49992 3.11248 7.49992 3.3335V4.16683H12.4999V3.3335C12.4999 3.11248 12.4121 2.90052 12.2558 2.74424C12.0996 2.58796 11.8876 2.50016 11.6666 2.50016H8.33325ZM14.1666 4.16683V3.3335C14.1666 2.67045 13.9032 2.03457 13.4344 1.56573C12.9655 1.09689 12.3296 0.833496 11.6666 0.833496H8.33325C7.67021 0.833496 7.03433 1.09689 6.56549 1.56573C6.09664 2.03457 5.83325 2.67045 5.83325 3.3335V4.16683H4.16659C3.70635 4.16683 3.33325 4.53993 3.33325 5.00016V16.6668C3.33325 17.3299 3.59664 17.9658 4.06548 18.4346C4.53433 18.9034 5.17021 19.1668 5.83325 19.1668H14.1666C14.8296 19.1668 15.4655 18.9034 15.9344 18.4346C16.4032 17.9658 16.6666 17.3299 16.6666 16.6668V5.00016C16.6666 4.53993 16.2935 4.16683 15.8333 4.16683H14.1666ZM4.99992 5.8335V16.6668C4.99992 16.8878 5.08772 17.0998 5.244 17.2561C5.40028 17.4124 5.61224 17.5002 5.83325 17.5002H14.1666C14.3876 17.5002 14.5996 17.4124 14.7558 17.2561C14.9121 17.0998 14.9999 16.8878 14.9999 16.6668V5.8335H4.99992Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.6666 8.3335C12.1268 8.3335 12.4999 8.70659 12.4999 9.16683V14.1668C12.4999 14.6271 12.1268 15.0002 11.6666 15.0002C11.2063 15.0002 10.8333 14.6271 10.8333 14.1668V9.16683C10.8333 8.70659 11.2063 8.3335 11.6666 8.3335Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.33325 8.3335C8.79349 8.3335 9.16659 8.70659 9.16659 9.16683V14.1668C9.16659 14.6271 8.79349 15.0002 8.33325 15.0002C7.87301 15.0002 7.49992 14.6271 7.49992 14.1668V9.16683C7.49992 8.70659 7.87301 8.3335 8.33325 8.3335Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default Dustbin;
