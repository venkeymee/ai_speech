import React from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const InputAddButton = (props: any) => {

  const {
    onClick,
    className,
    disabled
  } = props;
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        className={className}
        startIcon={<AddIcon />}
        disabled={disabled}

      >
        ADD
    </Button>
    </>
  );
};

export default InputAddButton;