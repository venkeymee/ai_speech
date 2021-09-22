import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
    margin: theme.spacing(2)
  },
}));

export default function CustomeButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        id={props.id || 'id'}
        color={props.color || 'primary'}
        onClick={props.onClick}
        disabled={props.disabled || false}
        fullWidth={props.fullWidth || true}
        size={props.size || 'meadium'}
        variant={'contained'}
      >
        {props.buttonName}
      </Button>
    </div>
  );
}
