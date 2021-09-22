import React from "react";
import { TextField } from "@material-ui/core";

const InputField = (props: any) => {

  const {
    value,
    label,
    id,
    name,
    onChange,
    error,
    helperText,
    required,
    autoFocus,
    fullWidth,
    className,
    placeholder,
  } = props;
  
  return (
    <>
      <TextField
        className={className}
        id={id}
        error={error}
        helperText={helperText}
        label={label}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        variant="outlined"
      />
    </>
  );
};

export default InputField;
