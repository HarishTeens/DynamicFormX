import { Disclosure } from "@headlessui/react";

import ChevronLeft from "~/assets/icons/ChevronLeft";

interface IAccordionProps {
  items: Array<{
    title: React.ReactNode;
    content: React.ReactNode;
    onClick?: () => void;
  }>;
  variant?: "secondary" | "primary";
  open?: boolean;
}

const Accordion: React.FC<IAccordionProps> = ({
  items,
  variant = "primary",
  open = false,
}) => {
  const disclosureButtonClasses = {
    primary:
      "text-primary bg-primary-light hover:bg-primary-[0.5] border-primary",
    secondary:
      "text-secondary-dark bg-secondary-light/[0.1] hover:bg-secondary-[0.5] border-secondary",
  };
  const disclosurePanelClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
  };
  const iconClasses = {
    primary: "text-primary",
    secondary: "text-secondary-dark",
  };

  return (
    <div className='w-full mx-auto bg-white rounded-2xl'>
      {items.map(({ title, content }, index) => (
        <Disclosure
          key={`accordion-item-${index}-${title}`}
          as='div'
          className='w-full mt-2'
          defaultOpen={open}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg ${disclosureButtonClasses[variant]} focus:outline-none focus-visible:ring border`}
              >
                <div>{title}</div>
                <ChevronLeft
                  className={`${
                    open
                      ? "rotate-[180deg] transform"
                      : "rotate-[270deg] transform"
                  } h-5 w-5 ${iconClasses[variant]} `}
                />
              </Disclosure.Button>
              <Disclosure.Panel
                className={`p-4 mt-2 text-sm border rounded-md ${disclosurePanelClasses[variant]}`}
              >
                {content}
              </Disclosure.Panel>
              </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default Accordion;
