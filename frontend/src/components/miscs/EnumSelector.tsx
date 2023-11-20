import { NativeSelect } from '@mui/material';
import React from 'react';

type Props<T extends { [key: string]: string }> = Omit<
  React.ComponentProps<typeof NativeSelect>,
  'value' | 'onChange'
> & {
  enumValue: T;
  value: keyof T;
  onChange: (v: keyof T) => void;
};

const EnumSelector = <T extends { [key: string]: string }>({
  enumValue,
  value,
  onChange,
  ...props
}: Props<T>) => {
  return (
    <NativeSelect
      {...props}
      value={value as string}
      onChange={(e) => onChange(e.target.value as keyof T)}
      variant="standard"
      sx={{
        fontSize: 'inherit',
        color: '#66ccff',
      }}
    >
      {Object.keys(enumValue).map((t) => (
        <option key={t} value={t}>
          {enumValue[t]}
        </option>
      ))}
    </NativeSelect>
  );
};

export default EnumSelector;
