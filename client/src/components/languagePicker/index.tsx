import React, { useState, useRef } from 'react'
import { createStyles, Theme, withStyles, WithStyles, useTheme } from '@material-ui/core/styles'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Dialog, Button, RadioGroup, FormControlLabel, Radio, Typography, IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { languages } from '../../i18n/i18n'

import './LanguagePicker.css'

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

const LanguageDialogTitle = withStyles(styles)((props: AboutDialogTitleProps) => {
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

const LanguageDialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const LanguageDialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const LanguagePicker = (): JSX.Element => {
  const [ open, setOpen ] = useState<boolean>(false)
  const [ value, setValue ] = useState<string>(localStorage.getItem('language') || 'en')
  const radioGroupRef = useRef<HTMLElement>(null)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const { t, i18n } = useTranslation()

  const handleEntering = (): void => {
    if (radioGroupRef.current != null)
      radioGroupRef.current.focus()
  }

  const changeLanguage = (val: string): void => {
    localStorage.setItem('language', val)
    i18n.changeLanguage(val)
    setValue(val)
  }

  const getFlag = (): JSX.Element => {
    let currLang = languages.find(lang => lang.code === value)
    if (typeof currLang !== 'undefined')
      return currLang.flag()
    return <></>    
  }

  return (
    <>
      <div>
        <Button onClick={() => setOpen(true)}>
          <div className="languange-picker-button">{getFlag()}</div>
        </Button>
      </div>
      <Dialog onEntering={handleEntering} onClose={() => setOpen(false)} aria-labelledby="about-dialog-title" open={open} fullScreen={fullScreen}>
        <LanguageDialogTitle id="about-dialog-title" onClose={() => setOpen(false)}>
          {t('language_dialog.title')}
        </LanguageDialogTitle>
        <LanguageDialogContent dividers>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="language"
            name="language"
            value={value}
            onChange={(e)=> changeLanguage(e.target.value)}
          >
            {languages.map((lang, key) => (
              <FormControlLabel className="language-picker-item" value={lang.code} key={key} control={<Radio />} label={`${lang.name} - ${lang.nativeName}`} />
            ))}
          </RadioGroup>
        </LanguageDialogContent>
        <LanguageDialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            {t('dialog.close')}
          </Button>
        </LanguageDialogActions>
      </Dialog>
    </>
  )
}

export default LanguagePicker