const PencilWithSquare: React.FC<React.SVGAttributes<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      width='15'
      height='16'
      viewBox='0 0 15 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.752779 2.58594C1.12785 2.21086 1.63656 2.00015 2.16699 2.00015H6.83366C7.20185 2.00015 7.50033 2.29863 7.50033 2.66682C7.50033 3.03501 7.20185 3.33348 6.83366 3.33348H2.16699C1.99018 3.33348 1.82061 3.40372 1.69559 3.52875C1.57056 3.65377 1.50033 3.82334 1.50033 4.00015V13.3335C1.50033 13.5103 1.57056 13.6799 1.69559 13.8049C1.82061 13.9299 1.99018 14.0002 2.16699 14.0002H11.5003C11.6771 14.0002 11.8467 13.9299 11.9717 13.8049C12.0968 13.6799 12.167 13.5103 12.167 13.3335V8.66682C12.167 8.29863 12.4655 8.00015 12.8337 8.00015C13.2018 8.00015 13.5003 8.29863 13.5003 8.66682V13.3335C13.5003 13.8639 13.2896 14.3726 12.9145 14.7477C12.5395 15.1228 12.0308 15.3335 11.5003 15.3335H2.16699C1.63656 15.3335 1.12785 15.1228 0.752779 14.7477C0.377706 14.3726 0.166992 13.8639 0.166992 13.3335V4.00015C0.166992 3.46972 0.377706 2.96101 0.752779 2.58594Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.8337 1.91927C12.6354 1.91927 12.4453 1.99803 12.3051 2.13822L6.1023 8.34098L5.7499 9.75057L7.15949 9.39818L13.3623 3.19541C13.5024 3.05522 13.5812 2.86508 13.5812 2.66682C13.5812 2.46856 13.5024 2.27841 13.3623 2.13822C13.2221 1.99803 13.0319 1.91927 12.8337 1.91927ZM11.3623 1.19541C11.7525 0.805172 12.2818 0.585938 12.8337 0.585938C13.3855 0.585938 13.9148 0.805172 14.3051 1.19541C14.6953 1.58565 14.9145 2.11493 14.9145 2.66682C14.9145 3.2187 14.6953 3.74798 14.3051 4.13822L7.97173 10.4716C7.88629 10.557 7.77924 10.6176 7.66202 10.6469L4.99535 11.3136C4.76817 11.3704 4.52784 11.3038 4.36225 11.1382C4.19667 10.9726 4.1301 10.7323 4.1869 10.5051L4.85356 7.83846C4.88287 7.72124 4.94348 7.61419 5.02892 7.52875L11.3623 1.19541Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default PencilWithSquare;