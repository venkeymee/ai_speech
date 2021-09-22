import React from "react";
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const InputCancelButton = (props: any) => {

  const {
    onClick
  } = props;
  
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        className="mr-1 mb-2"
        onClick={onClick}
        startIcon={<CancelIcon />}
      >
        Cancel
    </Button>
    </>
  );
};

export default InputCancelButton;