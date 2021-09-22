import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Paper,
} from '@material-ui/core';

// import Dialog from "@material-ui/core/Dialog";
// import {
//   EditIcon,
//   DeleteIcon,
// } from '@material-ui/icons';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { dummyData } from './dummyData';

const columnData = [
  {
    id: "name",
    align: "left",
    disablePadding: true,
    label: "User Name",
    //   width: "40%"
  },
  {
    id: "phoneNumber",
    align: "left",
    disablePadding: true,
    label: "Phone Number",
    //   width: "40%"
  },
  {
    id: "emailId",
    align: "left",
    disablePadding: true,
    label: "E-mail Id",
    //   width: "40%"
  },
  {
    id: "action",
    align: "left",
    disablePadding: true,
    label: "Action",
    //   width: "40%"
  },

];

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editForm_DialogOpen: false,
      deleteItem_DialogOpen: false,
      selectedDeleteId: null,
    };
  }

  handleAddUser = (e) => {

  }

  onTableEditButtonClick = (e) => {
    const { id, name } = e.currentTarget;
    console.log("Editing-id: ", id);
  }

  onTableDeleteButtonClick = (e) => {
    const { id, name } = e.currentTarget;
    console.log("Deleting-id: ", id);
    this.setState({
      deleteItem_DialogOpen: true,
      selectedDeleteId: id,
    });
  }
  
  deleteForm_YesConfirm = (e) => {
    const { id } = e.currentTarget;
    console.log('deleting-userId: ', this.state.selectedDeleteId);
    // integrate with Delete-API
    this.setState({
      deleteItem_DialogOpen: false,
    });
  }
  deleteForm_NoConfirm = (e) => {
    const { id } = e.currentTarget;
    console.log('deleting-userId: ', id);
    this.setState({
      deleteItem_DialogOpen: false,
    })
  }
  handle_Edit_Form_RequestClose = () => {

  }
  handle_Delete_Item_RequestClose = () => {

  }

  deleteItem_content = (
    <>
      <DialogTitle> Delete Confirm </DialogTitle>
      <DialogContent>
        <p>
          <b> Do you want to Delete this user Field? </b>
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.deleteForm_YesConfirm} color="secondary">
          Yes
        </Button>
        <Button onClick={this.deleteForm_NoConfirm} color="primary">
          No
        </Button>
      </DialogActions>
    </>
  );

  render() {
    return (
      <div>
        <Paper elevation={3} style={{margin: '20px', padding: '10px', display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
          <b> Users List </b>
          <Button
            color='primary'
            onClick={this.handleAddUser}
            variant='contained'
          >
            Add User
          </Button>
        </Paper>

        <Paper elevation={3} style={{margin: '20px'}}>
          <Table sx={{ minWidth: 650 }}  aria-label="customized table">
            <TableHead style={{backgroundColor: 'lightgreen'}}>
              <TableRow>
                {
                  (columnData || []).map((col) => {
                    return (
                      <TableCell align="left" key={col.id}>
                        {col.label}
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (dummyData || []).map((obj, i) => {
                  let rowBgColor = (i % 2 === 0) ? 'inherit' : 'lightgrey';
                  return (
                    <TableRow key={obj.id} style={{backgroundColor: rowBgColor}}>
                      <TableCell> {obj.name} </TableCell>
                      <TableCell> {obj.phoneNumber} </TableCell>
                      <TableCell> {obj.emailId} </TableCell>
                      <TableCell
                        // align="center"
                        width="20%"
                        padding="none"
                      >
                        <IconButton
                          id={obj.id}
                          onClick={(e) => this.onTableEditButtonClick(e)}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          id={obj.id}
                          onClick={(e) => this.onTableDeleteButtonClick(e)}
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </Paper>
        {/* <Dialog
          maxWidth="sm"
          open={this.state.editForm_DialogOpen}
          onClose={this.handle_Edit_Form_RequestClose}
        >
          {this.editTableContent}
        </Dialog> */}
        <Dialog
          maxWidth="sm"
          open={this.state.deleteItem_DialogOpen}
          onClose={this.handle_Delete_Item_RequestClose}
        >
          {this.deleteItem_content}
        </Dialog>
      </div>
    )
  }
}

export default UserManagement;