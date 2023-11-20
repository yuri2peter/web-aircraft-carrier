import { NativeSelect } from '@mui/material';
import React from 'react';

type Props = Omit<
  React.ComponentProps<typeof NativeSelect>,
  'value' | 'onChange'
> & {
  options: string[];
  value: string;
  onChange: (v: string) => void;
};

const StandardSelector = ({ value, onChange, options, ...props }: Props) => {
  return (
    <NativeSelect
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value as string)}
      variant="standard"
      sx={{
        fontSize: 'inherit',
        color: '#66ccff',
      }}
    >
      {options.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </NativeSelect>
  );
};

export default StandardSelector;
