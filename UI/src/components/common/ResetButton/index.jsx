import React from "react";
import { Button } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";

const InputResetButton = (props: any) => {

  const {
    onClick
  } = props;

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className="mx-2"
        startIcon={<RestoreIcon />}
        onClick={onClick}

      >
        Reset
      </Button>
    </>
  );
};

export default InputResetButton;