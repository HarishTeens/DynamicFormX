import React from "react";

interface IDynamicIcon {
  icon: string;
}

const DynamicIcon: React.FC<IDynamicIcon> = ({ icon }) => {
  return <span dangerouslySetInnerHTML={{ __html: icon }}></span>;
};

export default DynamicIcon;
