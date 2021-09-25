import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { Notification, notify } from '../../components/ToastNotification';
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
import {fetchUsersList} from './redux/actions';
import UserForm from './UserForm.jsx';
import { dummyData } from './dummyData';
import { signUpAPI, updateUserInfoByIdAPI, deleteUserInfoByIdAPI } from '../../apis/user';

const columnData = [
  {
    id: "firstname",
    align: "left",
    disablePadding: true,
    label: "First name",
    //   width: "40%"
  },
  {
    id: "lastname",
    align: "left",
    disablePadding: true,
    label: "Last name",
    //   width: "40%"
  },
  {
    id: "email",
    align: "left",
    disablePadding: true,
    label: "E-mail Id",
    //   width: "40%"
  },
  {
    id: "address",
    align: "left",
    disablePadding: true,
    label: "Address",
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
      userList: [],
      // userList: dummyData,
      formData: {},
      editForm_DialogOpen: false,
      deleteItem_DialogOpen: false,
      selectedDeleteId: null,
      addForm_DialogOpen: false,
      isAddFormSubmitDisabled: false,
      isEditFormSubmitDisabled: false,
    };
  }

  async componentDidMount(){
    // const {dispatch} = this.props;
    let result = await this.props.fetchUsersList();
    // console.log('>>fetchUserList-result: ', result);
    if(result && result.status == 200){
      this.setState({
        userList: result.data || []
      });
      notify.success('Successfully fetched Users list!!');
    } else {
      notify.error('Something went wrong while fetching Users list!!');
    }
  }
  
  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    console.log('nextProps', this.props);
  }

  handleAddUserForm = (e) => {
    this.setState({
      addForm_DialogOpen: true,
    })
  }

  handleCancelAddUser = (e) => {
    this.setState({
      addForm_DialogOpen: false,
    })
  }

  onTableEditButtonClick = (e) => {
    const { id, name } = e.currentTarget;
    console.log("Editing-id: ", id);
    let resData = (this.state.userList || []).find((obj) => obj.id == id) || {};
    this.setState({
      editForm_DialogOpen: true,
      selectedItemId: id,
      formData: {...resData}
    })
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

  handle_Delete_Item_RequestClose = () => {
    
  }

  handleAddDataRequest = async () => {
    console.log('>>>user-form-data: ', this.state.formData);
    let {formData} = this.state;
    // API call to create user
    let res = await signUpAPI({...formData});
    if(res && res.status == 200){
      notify.success('Successfully created user!');
      this.setState({
        addForm_DialogOpen: false,
        formData: {}
      })
      // now, fetch updated user-list
      await this.props.dispatch(fetchUsersList());
    } else {
      notify.error(res.data || 'Something went wrong while creating user');
    }
  }

  handleAddDataRequestClose = () => {
    this.setState({
      formData: {},
      addForm_DialogOpen: false,
    })
  }

  handleInputChange = (e) => {
    const { id, name, value } = e.currentTarget;
    const {formData} = this.state;
    formData[id]= value;
    this.setState((prevState) => ({
      ...prevState,
      formData
    }));
  }


  handleUpdateRequest = async () => {
    // API call to edit user info
    let {formData} = this.state;
    !formData && (formData = {});
    // API call to create user
    let res = await updateUserInfoByIdAPI(formData.id, {...formData});
    if(res && res.status == 200){
      notify.success('Successfully Updated the User info!');
      this.setState({
        editForm_DialogOpen: false,
        formData: {}
      })
      // now, fetch updated user-list
      await this.props.dispatch(fetchUsersList());
    } else {
      notify.error(res.data || 'Something went wrong while Updating User');
    }
    
  }
  handleUpdateRequestCancel = () => {
    this.setState({
      editForm_DialogOpen: false,
      formData: {}
    })
    
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

  
  getFormContent = () => {
    return (this.state.addForm_DialogOpen) ? (
      <UserForm
        formTitle={'Create User'}
        isItEditForm={false}
        isItEditMode={false}
        // errors={state.errors}
        formData={this.state.formData || {}}
        doesFormDialogOpen={this.state.addForm_DialogOpen}
        handleSubmitButton={this.handleAddDataRequest}
        handleCancelButton={this.handleAddDataRequestClose}
        handleInputChange={this.handleInputChange}
        isEditFormSubmitDisabled={this.state.isAddFormSubmitDisabled}
      />
    ) : (
        <UserForm
          formTitle={'Edit User Info'}
          isItEditForm={true}
          isItEditMode={true}
          // errors={state.errors}
          doesFormDialogOpen={this.state.editForm_DialogOpen}
          handleSubmitButton={this.handleUpdateRequest}
          handleCancelButton={this.handleUpdateRequestCancel}
          formData={ this.state.formData || {}}
          handleInputChange={this.handleInputChange}
          isEditFormSubmitDisabled={this.state.isEditFormSubmitDisabled}
        />
      )
  }

  render() {
    return (
      <div>
        <Paper elevation={3} style={{margin: '20px', padding: '10px', display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
          <b> Users List </b>
          <Button
            color='primary'
            onClick={this.handleAddUserForm}
            variant='contained'
          >
            Add User
          </Button>
        </Paper>
        <div>
          {
            !(this.state.addForm_DialogOpen || this.state.editForm_DialogOpen) ? ('') : (this.getFormContent())
          }
        </div>
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
                (this.state.userList || []).map((obj, i) => {
                  let rowBgColor = (i % 2 === 0) ? 'inherit' : 'lightgrey';
                  return (
                    <TableRow key={obj.id} style={{backgroundColor: rowBgColor}}>
                      <TableCell> {obj.firstname} </TableCell>
                      <TableCell> {obj.lastname} </TableCell>
                      <TableCell> {obj.email} </TableCell>
                      <TableCell> {obj.address} </TableCell>
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
        <Notification/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    userModule: state.userModule
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    fetchUsersList: () => dispatch(fetchUsersList()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);