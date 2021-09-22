import React from 'react';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function TextField(props) {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <Input
        placeholder={props.placeholders}
        id={props.id}
      />
    </form>
  )
}
