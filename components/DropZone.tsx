import React, { Dispatch, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IFile {
  setFile: Dispatch<any>;
}

const DropZone: React.FC<IFile> = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: 'image/jpeg,image/jpg,image/png,audio/mpeg,pdf,application/pdf',
    });

  return (
    <div className='w-full p-4'>
      <div
        {...getRootProps()}
        className='w-full rounded-md cursor-pointer h-80 focus:outline-none'
      >
        <input {...getInputProps()} />

        <div
          className={` flex flex-col items-center justify-center h-full space-y-3 border-2 border-dashed rounded-xl border-yellow-light ${
            isDragReject && 'border-red-500'
          } ${isDragAccept && 'border-green-500'}`}
        >
          <img src='/images/folder.png' alt='folder' className='w-16 h-16' />

          {isDragReject ? (
            <p>Sorry, This app only accept image, pdf and mp3 </p>
          ) : (
            <>
              <p>Drag & Drop Files Here</p>
              <p className='mt-2 text-base text-gray-300'>
                Only jpeg, png, pdf & mp3 files are supported
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropZone;
