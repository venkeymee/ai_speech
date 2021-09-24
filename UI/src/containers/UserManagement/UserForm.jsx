import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from '@material-ui/core';

export default function UserForm(props) {
  const {
    formTitle,
    formData,
    doesFormDialogOpen,
    handleCancelButton,
    handleSubmitButton,
    handleInputChange
  } = props;
  // const { state, setState } = useState({});


  return (
    <Dialog
      maxWidth="md"
      open={doesFormDialogOpen}
      onClose={handleCancelButton}
    >
      <DialogTitle> {formTitle} </DialogTitle>
      <DialogContent>
        <div className="row">
          <div className="col-lg-6">
            <TextField
              autoFocus
              id="firstname"
              className="mb-3"
              label="First Name"
              name="firstname"
              onChange={(e) => handleInputChange(e)}
              value={formData.firstname}
              fullWidth
            // error={state.errors.name}
            // helperText={state.errors.name}
            />
          </div>
          <div className="col-lg-6">
            <TextField
              autoFocus
              id="lastname"
              className="mb-3"
              label="Last Name"
              name="lastname"
              onChange={(e) => handleInputChange(e)}
              value={formData.lastname}
              fullWidth
            // error={state.errors.lastname}
            // helperText={state.errors.lastname}
            />
          </div>
          <div className="col-lg-6">
            <TextField
              autoFocus
              id="email"
              className="mb-3"
              label="E-mail Id"
              name="email"
              onChange={(e) => handleInputChange(e)}
              value={formData.email}
              fullWidth
            // error={state.errors.email}
            // helperText={state.errors.email}
            />
          </div>
          <div className="col-lg-6">
            <TextField
              autoFocus
              id="address"
              className="mb-3"
              label="Address"
              name="address"
              onChange={(e) => handleInputChange(e)}
              value={formData.address}
              fullWidth
            // error={state.errors.address}
            // helperText={state.errors.address}
            />
          </div>
        </div>

      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => handleCancelButton(e)}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          onClick={(e) => handleSubmitButton(e)}
          color="primary"
          // disabled={!state.isEditFormSubmitDisabled}
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
