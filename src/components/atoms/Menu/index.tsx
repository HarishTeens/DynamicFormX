import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

interface IMenuRequiredProps<T> {
  label: string;
  subList?: Array<T>;
  onClick?: (item: T) => void;
}

interface IMenuProps<T> {
  list: Array<T>;
  menuLabel: string;

  selected?: T;
  setSelected?: (value: T) => void;

  renderMenuButtonComponent?: () => React.ReactNode;
  renderMenuItemComponent?: (menuItemProps: T) => React.ReactNode;

  menuClass?: string;
  menuButtonClass?: string;
  menuItemsClass?: string;
  indicator?: 'error' | 'success' | 'warning' | 'info'
}

const CustomMenu = <T extends IMenuRequiredProps<T>>({
  list,
  menuLabel,
  renderMenuButtonComponent,
  menuButtonClass,
  menuItemsClass,
  indicator,
}: IMenuProps<T>) => {
  /* Button Component for the menu */
  const Button = ({ children }: { children: string }) => {
    if (renderMenuButtonComponent) return renderMenuButtonComponent();
    return <button>{children}</button>;
  };

  const indicatorTextClasses = {
    error: "text-error",
    success: "text-success",
    warning: "text-warning",
    info: "text-success",
  };

  return (
    <Menu as='div' className={`relative inline-block `}>
      <Menu.Button
        as={"div"}
        className={`${indicator ? indicatorTextClasses[indicator] : 'text-primary-text'} inline-flex justify-center w-full p-0 text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${menuButtonClass}`}
      >
        <Button>{menuLabel}</Button>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          style={{ maxHeight: "50vh", overflowY: "auto" }}
          className={`absolute w-56 mt-2 origin-top-right divide-y divide-white rounded-md shadow-lg bg-secondary-bg z-9999 ring-1 ring-black/5 focus:outline-none ${
            menuItemsClass || "left-0"
          }`}
        >
          {list && list?.map((listItem, index) => (
            <div
              className='px-1 py-1'
              key={`menu-item-${listItem.label.trim()}-${index}`}
            >
              <Menu.Item>
                {({ active, close }) => (
                  <div
                    onClick={() => {
                      if (listItem.onClick) listItem.onClick(listItem);
                      close();
                    }}
                    className={`${
                      active
                        ? "bg-primary text-primary-contrast"
                        : "bg-primary-bg text-primary-text"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {listItem.label}
                  </div>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CustomMenu;
