interface IBreadcrumbsProps {
  navItems: Array<{ name: string | number; onClick?: () => void }>;
}

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ navItems }) => {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        {navItems.map((item, index) =>
          index === 0 ? (
            <li
              key={`breadcrumb-item-${index}`}
              className='inline-flex items-center'
            >
              <a
                onClick={() => item.onClick && item.onClick()}
                className='inline-flex items-center text-sm font-regular text-primary-text'
              >
                {item.name}
              </a>
            </li>
          ) : (
            <li key={`breadcrumb-item-${index}`}>
              <div className='flex items-center'>
                <svg
                  className='w-3 h-3 mx-1 text-primary-text rtl:rotate-180'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 6 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 9 4-4-4-4'
                  />
                </svg>
                <a
                  onClick={() => item.onClick && item.onClick()}
                  className='text-sm font-regular text-primary-text'
                >
                  {item.name}
                </a>
              </div>
            </li>
          )
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
