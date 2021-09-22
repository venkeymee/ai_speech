import React from "react";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const InputSearchButton = (props: any) => {

  const {
    onClick
  } = props;
  
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className="mx-2"
        startIcon={<SearchIcon />}
        onClick={onClick}

      >
        Search
      </Button>
    </>
  );
};

export default InputSearchButton;