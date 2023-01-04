// 模态框，受控打开和关闭
import * as React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  DialogTitle,
  IconButton,
  Breakpoint,
} from '@mui/material';

import { CloseOutlined } from '@ant-design/icons';

const Modal: React.FC<{
  children: React.ReactElement;
  onClose: () => void;
  title: string;
  open: boolean;
  maxWidth?: Breakpoint;
}> = ({ children, onClose, title, open, maxWidth = 'sm' }) => {
  return (
    <Dialog
      maxWidth={maxWidth}
      onClose={onClose}
      open={open}
      sx={{ '& .MuiDialog-paper': { p: 0 } }}
    >
      {open && (
        <Box>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ borderBottom: '1px solid {theme.palette.divider}' }}
          >
            <Grid item>
              <DialogTitle>{title}</DialogTitle>
            </Grid>
            <Grid item sx={{ mr: 1.5 }}>
              <IconButton color="secondary" onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
          <DialogContent>{children}</DialogContent>
        </Box>
      )}
    </Dialog>
  );
};

export default Modal;
