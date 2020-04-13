import React, { useState } from 'react';
import { createStyles, Theme, withStyles, WithStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'react-i18next';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })

export interface AboutDialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const AboutDialogTitle = withStyles(styles)((props: AboutDialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose && (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});

const AboutDialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const AboutDialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const AboutDialog = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(JSON.parse(localStorage.getItem('about_dialog') || 'true'))
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const { t } = useTranslation()

  const closeAboutDialog = (close: false): void => {
    localStorage.setItem('about_dialog', JSON.stringify(false))
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>{t('about')}</Button>
      <Dialog onClose={() => closeAboutDialog(false)} aria-labelledby="about-dialog-title" open={open} fullScreen={fullScreen}>
        <AboutDialogTitle id="about-dialog-title" onClose={() => closeAboutDialog(false)}>
          {t('about_dialog.title')}
        </AboutDialogTitle>
        <AboutDialogContent dividers>
          <Typography variant="h6">
            {t('about_dialog.t1')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t('about_dialog.p1')}
          </Typography>

          <Typography variant="h6">
            {t('about_dialog.t2')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t('about_dialog.p2', { url: `${window.location.origin}`, interpolation: { escapeValue: false } })}
          </Typography>

          <Typography variant="h6">
            {t('about_dialog.t3')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <ol>
              <li>{t('about_dialog.p3l.l1')}</li>
              <li>{t('about_dialog.p3l.l2')}</li>
              <li>{t('about_dialog.p3l.l3')}</li>
              <li>{t('about_dialog.p3l.l4')}</li>
            </ol>
          </Typography>
        </AboutDialogContent>
        <AboutDialogActions>
          <Button autoFocus onClick={() => closeAboutDialog(false)}>
            {t('dialog.close')}
          </Button>
        </AboutDialogActions>
      </Dialog>
    </>
  )
}

export default AboutDialog