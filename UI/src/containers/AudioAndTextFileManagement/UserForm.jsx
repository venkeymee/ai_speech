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
    isItEditForm
  } = props;
  // const { state, setState } = useState({});
  // console.log('>>>isItEditForm', formData);

  return (
    <Dialog
      maxWidth="md"
      open={doesFormDialogOpen}
      onClose={handleCancelButton}
    >
      <DialogTitle style={{textAlign: 'center'}}> {formTitle} </DialogTitle>
      <DialogContent>
        <div className="row">
          <div className="col-lg-6">
            <TextField
              autoFocus
              required
              id="firstname"
              className="mb-3"
              label="First Name"
              name="firstname"
              value={formData.firstname}
              fullWidth
              disabled
              style={{margin : '5px'}}
              variant="outlined"
            />
          </div>
          <div className="col-lg-6">
            <TextField
              autoFocus
              required
              id="lastname"
              className="mb-3"
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              variant="outlined"
              fullWidth
              disabled
              style={{margin : '5px'}}
            />
          </div>
          <div className="col-lg-6">
            <TextField
              autoFocus
              required
              id="email"
              className="mb-3"
              label="E-mail Id"
              name="email"
              value={formData.email}
              variant="outlined"
              fullWidth
              disabled
              style={{margin : '5px'}}
            />
          </div>
          {/* {
            isItEditForm ? ('') : (
              <div className="col-lg-6">
                <TextField
                  autoFocus
                  required
                  id="password"
                  className="mb-3"
                  label="Password"
                  name="password"
                  value={formData.password}
                  fullWidth
                />
              </div>
            )
          } */}
          <div className="col-lg-6">
            <TextField
              autoFocus
              id="address"
              className="mb-3"
              label="Address"
              name="address"
              value={formData.address}
              variant="outlined"
              // aria-readonly= {true}
              disabled
              fullWidth
              style={{margin : '5px'}}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
