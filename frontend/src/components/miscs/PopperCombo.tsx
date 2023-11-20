// 弹出框整合，内置了打开关闭事件等逻辑
import { Button, Card, ClickAwayListener, Popper } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useCallback } from 'react';

const PopperCombo: React.FC<{
  trigger: React.ReactNode;
  children: React.ReactNode;
}> = ({ children = <></>, trigger = <MoreVertIcon /> }) => {
  const close = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  return (
    <>
      <ClickAwayListener onClickAway={close}>
        <Button
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        >
          {trigger}
        </Button>
      </ClickAwayListener>
      <Popper
        placement="right-start"
        disablePortal
        open={!!anchorEl}
        anchorEl={anchorEl}
        sx={{ zIndex: 1300 }}
      >
        <Card sx={{ minWidth: 64, minHeight: 32 }} elevation={4}>
          {children}
        </Card>
      </Popper>
    </>
  );
};

export default PopperCombo;
