const Funnel: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width='21'
      height='24'
      viewBox='0 0 21 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.5003 7.0748V3.64977C1.47883 2.20808 2.62995 1.02185 4.07164 1H16.9284C18.37 1.02185 19.5212 2.20808 19.4997 3.64977V7.0748C19.5007 7.4243 19.3656 7.76046 19.123 8.01206L13.448 12.571C13.2055 12.8226 13.0703 13.1588 13.0713 13.5083V20.2054C13.0741 20.7019 12.7999 21.1585 12.3604 21.3895L9.78902 22.7137C9.38502 22.9158 8.90461 22.891 8.52353 22.6485C8.14245 22.4059 7.91662 21.9812 7.92866 21.5296V13.5083C7.92965 13.1588 7.79454 12.8226 7.55195 12.571L1.877 8.01077C1.63472 7.75949 1.49964 7.42385 1.5003 7.0748Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Funnel;
