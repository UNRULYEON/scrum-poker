import React from 'react'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export type SnackbarType = {
  state: {
    open: boolean
    message: string
    severity: AlertProps['severity']
    handleClose: React.Dispatch<React.SetStateAction<SnackbarType['state']>>
    origin?: SnackbarOrigin
    autoHideDuration?: number | null
  }
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SPSnackbar = (props: SnackbarType): JSX.Element => {
  const { open, message, severity, handleClose, origin, autoHideDuration } = props.state

  return (
    <Snackbar
      anchorOrigin={origin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={() => handleClose(s0 => ({ ...s0, open: false }))}
      message={message}
    >
      <Alert severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SPSnackbar