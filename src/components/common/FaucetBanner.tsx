import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import { Alert, Box, Snackbar, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useWallet } from '../../contexts/wallet';
import { useStore } from '../../store/store';
import { requiresTrustline } from '../../utils/horizon';
import { OpaqueButton } from './OpaqueButton';

interface FaucetBannerParams {
  poolId: string;
}

export const FaucetBanner = ({ poolId }: FaucetBannerParams) => {
  const theme = useTheme();
  const { faucet, connected, walletAddress } = useWallet();
  const [openCon, setOpenCon] = React.useState(false);
  const account = useStore((state) => state.account);
  const poolData = useStore((state) => state.poolData.get(poolId));
  const loadPoolData = useStore((state) => state.loadPoolData);

  let needsFaucet = false;
  if (connected && poolData) {
    poolData.reserves.map((reserve) => {
      if (reserve.tokenMetadata.asset && !needsFaucet) {
        needsFaucet = requiresTrustline(account, reserve.tokenMetadata.asset);
      }
    });
  }

  const handleSnackClose = () => {
    setOpenCon(false);
  };

  const handleFaucet = async () => {
    if (connected) {
      await faucet();
      setOpenCon(true);
      if (poolId) {
        await loadPoolData(poolId, walletAddress, true);
      }
    }
  };

  return (
    <>
      {needsFaucet ? (
        <OpaqueButton
          onClick={() => {
            handleFaucet();
          }}
          palette={theme.palette.positive}
          sx={{
            width: '100%',
            display: 'flex',
            margin: '6px',
            padding: '12px',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '20px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <WaterDropOutlinedIcon sx={{ marginRight: '6px' }} />
            <Typography variant="body2">
              Tap the faucet to receive assets for the Blend private test network.
            </Typography>
          </Box>
          <ArrowForwardIcon fontSize="inherit" />
        </OpaqueButton>
      ) : (
        <></>
      )}

      <Snackbar
        open={openCon}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={handleSnackClose}
          severity="success"
          sx={{
            backgroundColor: theme.palette.primary.opaque,
            alignItems: 'center',
            width: '100%',
          }}
        >
          Test network assets added to wallet.
        </Alert>
      </Snackbar>
    </>
  );
};
