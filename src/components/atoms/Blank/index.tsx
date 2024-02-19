import React from 'react';

interface BlankInputProps {
}
const BlankInput: React.FC<BlankInputProps> = () => {
  return (
    <div className='col-span-1 pb-5'>
      <p className='mb-1 text-sm font-semibold'>
      </p>
    </div>
  );
};

export default BlankInput;
