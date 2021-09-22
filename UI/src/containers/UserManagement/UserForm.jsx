import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from '@material-ui/core';

export default UserForm = (props) => {
  const {
    userData
  } = props;
  const { state, setState } = useState({});
  const handleOnChange = (e) => {
    const { id, name, value } = e.currentTarger;
    setState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  }

  return (
    <Dialog
      maxWidth="sm"
      open={this.state.deleteItem_DialogOpen}
      onClose={this.handle_Delete_Item_RequestClose}
    >
      <DialogContent>
        <div className="row">
          <div className="col-lg-6">
            <TextField
              autoFocus
              id="name"
              className="mb-3"
              label="Name"
              name="name"
              // onChange={(e) => handleEditFormChange(e)}
              value={state.validation.name}
              fullWidth
              // error={state.errors.name}
              // helperText={state.errors.name}
            />
          </div>
        </div>

      </DialogContent>
      <DialogActions>
        <Button
          // onClick={(e) => handle_Edit_Form_RequestClose(e)}
          color="secondary"
          variant="contained"
        >
          <IntlMessages id="ipp.common.Cancel.button" />
        </Button>
        <Button
          // onClick={(e) => handleEditFormSubmit(e)}
          color="primary"
          disabled={!state.isEditFormSubmitDisabled}
          variant="contained"
        >
          <IntlMessages id="ipp.common.submit.button" />
        </Button>
      </DialogActions>
    </Dialog>
  )

}