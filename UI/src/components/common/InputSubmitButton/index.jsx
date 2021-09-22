import React from "react";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const InputSubmitButton = (props: any) => {

  const {
    onClick,
    disabled
  } = props;
  
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        className="mr-3 mb-2"
        startIcon={<SaveIcon />}
        disabled={disabled}

      >
        Submit
    </Button>
    </>
  );
};

export default InputSubmitButton;