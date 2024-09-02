import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useSettings } from '../../contexts';
import { CustomButton } from '../common/CustomButton';
import { PoolComponentProps } from '../common/PoolComponentProps';
import { PoolHeader } from './PoolHeader';

export const PoolMenu: React.FC<PoolComponentProps> = ({ poolId }) => {
  const theme = useTheme();
  const router = useRouter();
  const { trackedPools } = useSettings();
  const pathname = router.pathname;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const curName = trackedPools.find((pool) => pool.id === poolId)?.name ?? 'Unknown Pool';

  const handleClickDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenuItem = (poolId: string) => {
    handleClose();
    router.push({ pathname: pathname, query: { poolId: poolId } });
  };

  return (
    <>
      <CustomButton
        id="pool-dropdown-button"
        onClick={handleClickDropdown}
        sx={{ width: '100%', '&:hover': { backgroundColor: theme.palette.background.default } }}
      >
        <PoolHeader name={curName} />
        <ArrowDropDownIcon sx={{ color: theme.palette.text.secondary }} />
      </CustomButton>
      <Menu
        id="pool-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'pool-dropdown-button',
          sx: { width: anchorEl && anchorEl.offsetWidth },
        }}
      >
        {trackedPools.length > 0 &&
          Array.from(trackedPools.values()).map((pool) => (
            <MenuItem onClick={() => handleClickMenuItem(pool.id)} key={pool.id}>
              <PoolHeader name={pool.name} />
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};
