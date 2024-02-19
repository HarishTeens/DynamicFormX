import React from 'react';

const DownloadIcon: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12 17L7 12H10V8H14V12H17L12 17ZM2 20V22H22V20H2Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default DownloadIcon;
