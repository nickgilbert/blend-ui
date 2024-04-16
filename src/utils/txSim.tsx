import { ContractErrorType, parseError } from '@blend-capital/blend-sdk';
import { AlertColor } from '@mui/material';
import { SorobanRpc } from '@stellar/stellar-sdk';
import { OpaqueButton } from '../components/common/OpaqueButton';
import { useWallet } from '../contexts/wallet';
import theme from '../theme';
export function RestoreButton({
  simResponse,
}: {
  simResponse: SorobanRpc.Api.SimulateTransactionResponse;
}) {
  const { restore } = useWallet();
  function handleRestore() {
    if (simResponse && SorobanRpc.Api.isSimulationRestore(simResponse)) {
      restore(simResponse);
    }
  }
  return (
    <OpaqueButton
      onClick={handleRestore}
      palette={theme.palette.warning}
      sx={{ padding: '6px 24px', margin: '12px auto' }}
    >
      Restore
    </OpaqueButton>
  );
}
export function getErrorFromSim(
  simulationResult: SorobanRpc.Api.SimulateTransactionResponse | undefined,
  extraValidations?: () => Partial<SubmitError>
): SubmitError {
  let errorProps: SubmitError = {
    isError: false,
    isSubmitDisabled: false,
    isMaxDisabled: false,
    reason: undefined,
    disabledType: undefined,
  };
  if (simulationResult && SorobanRpc.Api.isSimulationRestore(simulationResult)) {
    errorProps.isError = true;
    errorProps.extraContent = <RestoreButton simResponse={simulationResult} />;
    errorProps.isSubmitDisabled = true;
    errorProps.isMaxDisabled = false;
    errorProps.disabledType = 'warning';
    errorProps.reason =
      'This transaction ran into expired entries that need to be restored before proceeding.';
  } else if (simulationResult && SorobanRpc.Api.isSimulationError(simulationResult)) {
    const error = parseError(simulationResult);
    errorProps.isError = true;
    errorProps.isSubmitDisabled = true;
    errorProps.isMaxDisabled = false;
    errorProps.reason = error.message || ContractErrorType[error.type];
    errorProps.disabledType = 'error';
  }
  if (!!extraValidations) {
    errorProps = { ...errorProps, ...extraValidations() };
  }
  return errorProps;
}

export interface SubmitError {
  isError: boolean;
  isSubmitDisabled: boolean;
  isMaxDisabled: boolean;
  reason: string | undefined;
  disabledType: AlertColor | undefined;
  extraContent?: React.ReactNode;
}
