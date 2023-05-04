import { Box, Typography } from '@mui/material';
import { useSettings } from '../../contexts';
import { BackstopEarningsRow } from './BackstopEarningsRow';

export interface EarningsAssetData {
  id: string;
  code: string;
  issuer: string;
  amount: number;
}

const tempEarningsData: EarningsAssetData[] = [
  {
    id: '3e42f27739b773cdc1db839ff1a86877e29d32cb49614303587bd864855794e6',
    code: 'BLND',
    issuer: '',
    amount: 32.7876123,
  },
];

export const BackstopEarningsList = () => {
  const { viewType } = useSettings();

  const headerNum = 2;
  const headerWidth = `${(100 / headerNum).toFixed(2)}%`;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        scrollbarColor: 'black grey',
        padding: '6px',
        marginTop: '12px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px',
          type: 'alt',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ width: headerWidth, marginRight: '12px' }}
        >
          Asset
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ width: headerWidth }}
        >
          Amount
        </Typography>
      </Box>
      {tempEarningsData.map((assetData) => (
        <BackstopEarningsRow assetData={assetData} key={assetData.id} />
      ))}
    </Box>
  );
};
