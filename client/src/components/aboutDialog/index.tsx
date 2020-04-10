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

  const closeAboutDialog = (close: false): void => {
    localStorage.setItem('about_dialog', JSON.stringify(false))
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>About</Button>
      <Dialog onClose={() => closeAboutDialog(false)} aria-labelledby="about-dialog-title" open={open} fullScreen={fullScreen}>
        <AboutDialogTitle id="about-dialog-title" onClose={() => closeAboutDialog(false)}>
          About scrum-poker
        </AboutDialogTitle>
        <AboutDialogContent dividers>
          <Typography variant="h6">
            What is this?
          </Typography>
          <Typography variant="body1" gutterBottom>
            You can use this app to play scrum poker with you team if you can't meet all in a physical way.
          </Typography>

          <Typography variant="h6">
            How does it work?
          </Typography>
          <Typography variant="body1" gutterBottom>
            When you go to <em>{window.location.origin}</em>, you're automatically assigned to a room. When you go to the link
            you've got from your team member, you join his or her room.
          </Typography>

          <Typography variant="h6">
            How do I play?
          </Typography>
          <Typography variant="body1" gutterBottom>
            <ol>
              <li>Rename yourself to whatever you want. This will be saved locally for you next session.</li>
              <li>Share the link with you team members so they can join.</li>
              <li>Wait for everyone to pick a card.</li>
              <li>Once your discussion is over, hit "RESET VOTES" to play again.</li>
            </ol>
          </Typography>
        </AboutDialogContent>
        <AboutDialogActions>
          <Button autoFocus onClick={() => closeAboutDialog(false)}>
            Close
          </Button>
        </AboutDialogActions>
      </Dialog>
    </>
  )
}

export default AboutDialog