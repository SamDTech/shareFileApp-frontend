import React from 'react';

const DownloadFile: React.FC<{ downloadLink }> = ({ downloadLink }) => {
  const copy = () => {
    navigator.clipboard.writeText(downloadLink);
  };

  return (
    <div className='p-1'>
      <h1 className='my-2 text-lg font-medium'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
        quibusdam hic unde? Quis dolor, labore totam voluptatibus velit rerum?
        Necessitatibus, ab neque? Vero fugit, quisquam fuga quidem sint officiis
        ea.
      </h1>
      <div className='flex space-x-3'>
        <span className='break-all'>{downloadLink} </span>
        <img
          onClick={copy}
          src='/images/copy.png'
          alt=''
          className='object-contain w-8 h-8 cursor-pointer'
        />
      </div>
    </div>
  );
};

export default DownloadFile;
