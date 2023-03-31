import { AxiosInstance } from 'axios';
import React, { ComponentPropsWithoutRef, useCallback, useState } from 'react';
import { SERVER_ORIGIN } from 'src/configs';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axiosServices from 'src/utils/axios';
import { IconButton, InputAdornment, TextField } from '@mui/material';

export interface UploadResults {
  mimetype: string;
  newFilename: string;
  originalFilename: string;
  size: number;
}

interface Props {
  simpleMode?: boolean;
  value: string;
  onChange: (v: string) => void;
  onUploadBegin?: () => void;
  onUploadSucceed?: (v: UploadResults) => void;
  onUploadCancelled?: () => void;
  onUploadFailed?: (e: unknown) => void;
  onUploadEnd?: () => void;
  textFieldProps?: Partial<ComponentPropsWithoutRef<typeof TextField>>;
  serverOrigin?: string;
  axiosInstance?: AxiosInstance;
}

const NowUploader: React.FC<Props> = ({
  simpleMode = false,
  value,
  onChange,
  onUploadBegin = () => {},
  onUploadSucceed = () => {},
  onUploadCancelled = () => {},
  onUploadFailed = (e) => {
    console.error(e);
    alert('Error: Upload Failed.');
  },
  onUploadEnd = () => {},
  textFieldProps = {},
  serverOrigin = SERVER_ORIGIN,
  axiosInstance = axiosServices,
}) => {
  const [loading, setLoading] = useState(false);
  const handleUpload = useCallback(async () => {
    setLoading(true);
    onUploadBegin();
    try {
      const results = await upload(serverOrigin, axiosInstance);
      if (results) {
        onUploadSucceed(results);
        if (simpleMode) {
          onChange(serverOrigin + '/' + results.newFilename);
        }
      } else {
        onUploadCancelled();
      }
    } catch (err) {
      onUploadFailed(err);
    }
    setLoading(false);
    onUploadEnd();
  }, [
    simpleMode,
    onChange,
    onUploadBegin,
    onUploadSucceed,
    onUploadCancelled,
    onUploadFailed,
    onUploadEnd,
    serverOrigin,
    axiosInstance,
  ]);
  return (
    <TextField
      disabled={loading}
      fullWidth
      placeholder="Upload file to get a URL"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleUpload} disabled={loading}>
              <UploadFileIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...textFieldProps}
    />
  );
};

export default NowUploader;

function upload(
  serverOrigin = SERVER_ORIGIN,
  axiosInstance = axiosServices
): Promise<UploadResults | null> {
  return new Promise((resolve, reject) => {
    let fileCancle = true;
    // 生成一个隐藏的input框并打开
    const elInput = document.createElement('input');
    elInput.type = 'file';
    elInput.style.display = 'none';
    document.body.append(elInput); // 兼容IOS，必须挂载到body
    // 监听取消动作
    window.addEventListener(
      'focus',
      () => {
        setTimeout(() => {
          if (fileCancle) {
            // 取消逻辑处理
            resolve(null);
          }
        }, 100);
      },
      { once: true }
    );
    elInput.onchange = () => {
      fileCancle = false;
      const file = elInput?.files?.[0];
      if (file) {
        const form = new FormData();
        form.append('file', file);
        // 发起上传
        axiosInstance
          .post(serverOrigin + '/api/upload', form)
          .then(({ data }) => {
            const { mimetype, newFilename, originalFilename, size } = data;
            resolve({
              mimetype,
              newFilename,
              originalFilename,
              size,
            } as UploadResults);
          });
        resolve(null);
      } else {
        reject('cancelled upload');
      }
      setTimeout(() => {
        document.body.removeChild(elInput);
      }, 0);
    };
    elInput.click();
  });
}
