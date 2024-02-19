import { useEffect, useRef, useState, Fragment, RefObject } from "react";
import { IFileOnChange } from "./types";
import { Dialog, Transition } from '@headlessui/react';
import Dustbin from "~/assets/icons/Delete";
import DownloadIcon from "~/assets/icons/Download";
import FileIcon from "~/assets/icons/File";

export interface IFileUploadResponse {
  flag?: number;
  id?: string;
  fileName: string;
  base64?: string;
}
interface IUploadInputProps {
  onChangeUpload: IFileOnChange;
  multiple: boolean;
  getBase64?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  initialValue?: IFileUploadResponse[];
  indicator?: "error" | "success" | "warning" | "success";
}


const UploadInput: React.FC<IUploadInputProps> = ({ ...props }) => {
  const inputRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
  const [uploadedFiles, setUploadedFiles] = useState<Array<IFileUploadResponse>>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getBase64 = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const b64 = (reader.result as string)?.split("base64,")[1];
        resolve(b64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (props.initialValue) {
      setUploadedFiles(props.initialValue);
    }
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (props.multiple) {
        const uploadPromises = files.map(async (file) => {
          const fileBase64 = await getBase64(file);
          const isDuplicate = uploadedFiles.some(
            (uploadedFile) => uploadedFile.fileName === file.name
          );
          if (!isDuplicate && file.name) {
            console.log("file ready for upload", {
              fileName: file.name,
              file: fileBase64,
            })
            return {} as IFileUploadResponse
          }
        });

        try {
          const results = await Promise.allSettled(uploadPromises);
          const newUploadedFiles = [...uploadedFiles]
          results.forEach((result) => {
            if (result.status === "fulfilled") {
              const fileResult = result.value;
              const isNotDuplicate = newUploadedFiles.every(
                (newFile) => newFile.fileName !== fileResult?.fileName
              );
              if (isNotDuplicate && fileResult) {
                newUploadedFiles.push(fileResult);
              }
            }
          });
          setUploadedFiles(newUploadedFiles);
          props.onChangeUpload(newUploadedFiles);
        }
        catch (error) {
          console.error('Error uploading files:', error);
        }
      }
      else {
        const file = files[0];
        const fileBase64 = await getBase64(file);
        const fileData =
        {
          fileName: file.name,
          file: fileBase64,
          flag: props.getBase64 ? 3 : null,
          filepath: "document",
          userid: 312,
        }
        console.log("fileUpload", fileData);
        // try {
        //   const result = await fileUpload(fileData);
        //   setUploadedFiles([result]);
        //   props.onChangeUpload([result]);
        // } catch (error) {
        //   console.log('Error uploading file:', error);
        // }
      }
    }
  };
  const handleDeleteButtonClick = (index: number) => {
    const tempFiles = [...uploadedFiles];
    tempFiles.splice(index, 1);
    setUploadedFiles(tempFiles);
    props.onChangeUpload(tempFiles);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const indicatorColorClasses = {
    error: "border-error text-error focus:border-error",
    success: "border-success text-success focus:border-success",
    warning: "border-warning text-warning focus:border-warning",
    info: "border-success text-info focus:border-info",
  };


  const downloadFile = async (fileIdx: number) => {
    console.log("fileIdx", fileIdx);
  };
  const handleFileClick = async (fileIdx: number) => {
    downloadFile(fileIdx);
  };

  const handleDownloadClick = (index: number) => {
    setModalOpen(true);
    downloadFile(index);
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={`relative justify-between flex items-center w-full overflow-hidden border rounded  text-primary-text flex-start ${props.indicator
      ? indicatorColorClasses[props.indicator]
      : "text-primary-text border-one focus:border-primary"
      }`}>

      <button
        onClick={handleButtonClick}
        className='inline-flex items-center px-2 py-3 pt-4 font-bold text-white bg-blue hover:bg-blue-light'
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        disabled={props.inputProps?.disabled}
      >
        <svg
          fill='#FFF'
          height='18'
          viewBox='0 0 24 24'
          width='18'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z' />
        </svg>
        <span className='ml-2'>Upload</span>
      </button>
      <input
        ref={inputRef}
        className='absolute block w-0 px-4 py-2 opacity-0 cursor-pointer pin-r pin-t'
        type='file'
        onChange={handleChange}
        placeholder="Upload file"
        multiple={props.multiple}
      />
      {uploadedFiles.length > 0 && (
        <div className='flex items-center ml-5 overflow-x-auto overflow-y-hidden text-sm text-end text-primary-text file-icon'>
          <div
            key={`file-upload`}
            className='px-5 py-1 ml-5 rounded-sm bg-primary-light cursor-pointer'
            onClick={() => setModalOpen(true)}
          >
            <div className="file-count">
              <FileIcon />
              <span className="file-count">{uploadedFiles && uploadedFiles.length}</span>
            </div>
          </div>
          <Transition appear show={modalOpen} as={Fragment}>
            <Dialog open={modalOpen} onClose={handleModalClose} static>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-black/25' onClick={handleModalClose} />
              </Transition.Child>
              <div className='fixed inset-0 overflow-y-auto' onClick={handleModalContentClick}>
                <div className='flex items-center justify-center min-h-full p-4 text-center'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Dialog.Panel className='w-full max-w-md p-6 text-left align-top transition-all transform bg-white shadow-xl rounded-2xl z-9999' style={{ marginTop: '-30vh' }}>
                      <Dialog.Title>Uploaded Files</Dialog.Title>
                      <Dialog.Description>
                        <div className="mt-4">
                          {uploadedFiles.map((file, index) => (
                            <div key={`uploaded-file-${file?.id !== undefined ? file?.id : index}-${file.fileName}`} className="flex items-center justify-between mt-2">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleFileClick(index);
                                }}
                                className="cursor-pointer text-blue underline hover:no-underline"
                              >
                                {file && file?.fileName}
                              </a>
                              <div className="flex items-center">
                                {props.inputProps?.disabled ? <></> : (
                                  <span
                                    className="ml-2 text-sm font-bold cursor-pointer rounded cursor-pointer bg-error-light text-error"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteButtonClick(index);
                                    }}
                                  >
                                    <Dustbin />
                                  </span>
                                )}
                                <span
                                  className="ml-2 text-sm font-bold cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownloadClick(index);
                                  }}
                                >
                                  <DownloadIcon />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Dialog.Description>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default UploadInput;

