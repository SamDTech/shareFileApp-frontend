import { sizeInMb } from 'libs/sizeInMb';
import { IFile } from 'libs/types';
import React from 'react';

const RenderFile: React.FC<{ file: IFile }> = ({
  file: { format, name, sizeInBytes, id },
}) => {
  return (
    <div className='flex items-center w-full p-4 my-2'>
      <img src={`/images/${format}.png`} alt='' className='h-14 w-14' />
      <span className='mx-2'>{name}</span>
      <span className='ml-auto'>{sizeInMb(Number(sizeInBytes))}</span>
      
    </div>
  );
};

export default RenderFile;
