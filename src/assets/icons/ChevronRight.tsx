const ChevronRight: React.FC<React.SVGAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg
      width='5'
      height='8'
      viewBox='0 0 5 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M0.232761 0.224482C0.083679 0.366671 8.87329e-08 0.559015 8.6342e-08 0.759505C8.39512e-08 0.959995 0.0836789 1.15234 0.232761 1.29453L3.06631 4.01897L0.232761 6.70547C0.0836789 6.84766 1.14478e-08 7.04001 9.05699e-09 7.2405C6.66617e-09 7.44099 0.0836789 7.63333 0.232761 7.77552C0.307172 7.84665 0.395701 7.90311 0.493242 7.94164C0.590782 7.98016 0.695404 8 0.801071 8C0.906738 8 1.01136 7.98016 1.1089 7.94164C1.20644 7.90311 1.29497 7.84665 1.36938 7.77552L4.76323 4.55779C4.83826 4.48724 4.8978 4.40331 4.93844 4.31083C4.97908 4.21835 5 4.11916 5 4.01897C5 3.91879 4.97908 3.8196 4.93844 3.72712C4.8978 3.63464 4.83826 3.5507 4.76323 3.48016L1.36938 0.224482C1.29497 0.153351 1.20644 0.0968938 1.1089 0.0583654C1.01136 0.0198374 0.906738 1.08127e-08 0.801071 9.55268e-09C0.695404 8.29261e-09 0.590782 0.0198374 0.493242 0.0583654C0.395701 0.0968938 0.307172 0.153351 0.232761 0.224482Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronRight;
