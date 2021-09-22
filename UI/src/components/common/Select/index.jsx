import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  }
}));


const InputSelect = (props: any) => {
  
  const {
    labelId,
    id,
    value,
    onChange,
    label,
    children,
    name,
    native,
    required,
  } = props;
  const classes = useStyles();
  
  return (
    <>
      <FormControl
        variant="outlined"
        required
      // disabled={errorMessage ? true : false}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          {label}
        </InputLabel>
        <Select
          className={classes.formControl}
          native={native}
          labelId={labelId}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          label={label}
          fullWidth
          required={required}
        >
          {children}
        </Select>
        {/* <FormHelperText style={{ color: "red" }}>
          {errorMessage ? errorMessage : " "}
        </FormHelperText> */}
      </FormControl>
    </>
  );
};

export default InputSelect;
