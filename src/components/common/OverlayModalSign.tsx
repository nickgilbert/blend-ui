import { Box, Typography, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const OverlayModalSign: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        display: 'flex',
        position: 'fixed',
        justifyContent: 'top',
        alignItems: 'center',
        zIndex: '10',
        flexWrap: 'wrap',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          marginTop: '18vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={70} sx={{ color: theme.palette.primary.main }} />
        <Typography variant="h2" sx={{ margin: '12px' }}>
          Please confirm the transaction in your wallet.
        </Typography>
      </Box>
    </Box>
  );
};
