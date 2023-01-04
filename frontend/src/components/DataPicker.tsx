// 封装的日期选择器，使用string的日期格式
// @mui/x-date-pickers的onchange机制不同于标准input，这会导致formik机制异常。
// 此处进行了一些处理，模拟了常规的onchange事件，并且使得数据格式统一为string。

// TODO 渲染时会有一行警告：The mask "__/__/" ... 暂未解决
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField, TextFieldProps } from '@mui/material';

const PICKERS = {
  DATE_TIME: DateTimePicker,
  DATE: DatePicker,
};

const MyDatePicker: React.FC<{
  type?: keyof typeof PICKERS;
  value: string;
  onChange: (event: { type: 'change'; target: HTMLInputElement }) => void;
  name?: string;
  textFieldProps?: TextFieldProps;
}> = ({ type = 'DATE', onChange, value, name, textFieldProps = {} }) => {
  const [valueDate, setValueDate] = React.useState<Date | null>(null);
  const refInput = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (value) {
      try {
        setValueDate(new Date(value));
      } catch {
        setValueDate(null);
      }
    } else {
      setValueDate(null);
    }
    if (refInput.current) {
      refInput.current.value = value;
    }
  }, [value]);
  const Picker = PICKERS[type];
  return (
    <>
      <Picker
        value={valueDate}
        onChange={(v) => {
          setValueDate(v);
          if (refInput.current) {
            refInput.current.value = dateToString(v as Date);
            const e = {
              type: 'change',
              target: refInput.current,
            };
            onChange(e as { type: 'change'; target: HTMLInputElement });
          }
        }}
        renderInput={(params) => (
          <TextField {...params} {...textFieldProps} name={name} />
        )}
      />
      <input ref={refInput} hidden name={name} />
    </>
  );
};

function dateToString(date: Date) {
  if (!date) {
    return '';
  }
  try {
    return date.toISOString();
  } catch {
    return '';
  }
}

export default MyDatePicker;
