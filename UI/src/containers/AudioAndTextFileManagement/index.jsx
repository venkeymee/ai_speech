import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { fetchAllFiles } from './redux/actions';
import { dummyData } from './dummyData';
// import CloudDownload from '@mui/icons-material/CloudDownload';
import CloudDownload from "@material-ui/icons/CloudDownload"
import { fetchAllFilesAPI, downloadFileAPI, deletAudioByIdAPI } from '../../apis/audioAndTextFileManager';
import { downloadData } from '../../utils';
import { getUserInfoByIdAPI } from '../../apis/user';
import UserForm from './UserForm.jsx';
// import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';

const columnData = [
  {
    id: "user_id",
    align: "left",
    disablePadding: true,
    label: "User Id",
    //   width: "40%"
  },
  {
    id: "wav_file_path",
    align: "left",
    disablePadding: true,
    label: "File Name",
    //   width: "40%"
  },
  {
    id: "wav_file_path",
    align: "left",
    disablePadding: true,
    label: "Audio file",
    //   width: "40%"
  },
  {
    id: "text_file_path",
    align: "left",
    disablePadding: true,
    label: "Text file",
    //   width: "40%"
  },
  {
    id: "error_file_path",
    align: "left",
    disablePadding: true,
    label: "Error file",
    //   width: "40%"
  },
  {
    id: "description",
    align: "left",
    disablePadding: true,
    label: "Description",
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

function CreateDownloadButton({ buttonName, handleOnClick }) {
  return (
    <>
      <Button variant={'contained'} style={{ margin: '5px' }} onClick={handleOnClick} color="secondary">
        {buttonName}
      </Button>
    </>
  )
}

class AudioAndFileManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      // userList: dummyData,
      formData: {},
      download_File_DialogOpen: false,
      deleteItem_DialogOpen: false,
      selectedDeleteId: null,
      addForm_DialogOpen: false,
      isAddFormSubmitDisabled: false,
      isEditFormSubmitDisabled: false,
      getUserForm_DialogOpen: false
    };
  }

  async componentDidMount() {
  }
  async componentDidMount() {
    // const {dispatch} = this.props;
    this.getAllFilesInfo();
  }
  async getAllFilesInfo() {
    let result = await fetchAllFilesAPI();
    // console.log('>>fetchUserList-result: ', result);
    if (result && result.status == 200) {
      this.setState({
        userList: result.data || []
      });
      // notify.success('Successfully fetched All Files list!!');
    } else {
      notify.error('Something went wrong while fetching All Files list!!');
    }
  }

  onTableRowFileDonwloadButtonClick = (e) => {
    const { id, name } = e.currentTarget;
    console.log("Editing-id: ", id);
    let resFile = (this.state.userList || []).find((obj) => obj.id == id) || {};
    this.setState({
      download_File_DialogOpen: true,
      // selectedFileContent: (wav_file_path || '').split('/').reverse()[0],
      selectedFileContent: (resFile || null)
    });
  }

  handle_Download_File_RequestClose = () => {
    this.setState({
      download_File_DialogOpen: false
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

  deleteForm_YesConfirm = async (e) => {
    const { id } = e.currentTarget;
    console.log('deleting-userId: ', this.state.selectedDeleteId);
    let res = await deletAudioByIdAPI(this.state.selectedDeleteId);
    console.log("result",res);
    // integrate with Delete-API
    if(res && res.data && res.status == 200){
      notify.success("successfully deleted audio files")
      this.setState({
        deleteItem_DialogOpen: false,
      });
      this.getAllFilesInfo()
    } else {
     notify.error(res.message || "Something went wrong while deleteing audio files!")
    }
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
  handleDownloadWavFile = async (fileDownloadUrl) => {
    const url = new URL(fileDownloadUrl || '');
    const fileName = url.searchParams.get('filename');
    console.log("after:::::::::fileFormate>>>>>>.", fileName)

    let result = await downloadFileAPI(fileName);
    if (result) {
      const url = window.URL.createObjectURL(
        new Blob([result]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        fileName,
      )
      document.body.appendChild(link);
      link.click();
      notify.success('Successfully downloaded your file!');
    } else {
      notify.error((result.data || 'Something went wrong while downloading the file'));
    }
  }

  handleDownloadDocxFile = async (fileDownloadUrl) => {
    console.log("file", fileDownloadUrl)
    const url = new URL(fileDownloadUrl || '');
    const fileName = url.searchParams.get('filename');
    let result = await downloadFileAPI(fileName);
    if (result) {
      const url = window.URL.createObjectURL(
        new Blob([result]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        fileName,
      )
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      notify.success('Successfully downloaded your file!');
    } else {
      notify.error((result.data || 'Something went wrong while downloading the file'));
    }
  }

  handleDownloadErrorFile = async (fileDownloadUrl) => {
    const url = new URL(fileDownloadUrl || '');
    const fileName = url.searchParams.get('filename');
    console.log("after:::::::::fileFormate>>>>>>.", fileName)
    let result = await downloadFileAPI(fileName);
    if (result) {
      // console.log('>>download-file-result: ', result);
      const url = window.URL.createObjectURL(
        new Blob([result]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        fileName,
      )
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      notify.success('Successfully downloaded your file!');
    } else {
      notify.error((result.data || 'Something went wrong while downloading the file'));
    }
  }

  // download_content = () => {
  //   const { selectedFileContent } = this.state;
  //   return (
  //     <>
  //       <DialogTitle> Which one you want to download? </DialogTitle>
  //       <DialogContent>
  //         <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-around' }}>
  //           {
  //             !(selectedFileContent || {}).description ? (
  //               <>
  //                 <CreateDownloadButton
  //                   buttonName={'Audio File'}
  //                   handleOnClick={this.downloadAudioFile}
  //                 />
  //                 <CreateDownloadButton
  //                   buttonName={'Text File'}
  //                   handleOnClick={this.downloadTextFile}
  //                 />
  //               </>
  //             ) : (
  //               <CreateDownloadButton
  //                 buttonName={'Error File'}
  //                 handleOnClick={this.downloadErrorFile}
  //               />
  //             )
  //           }

  //         </div>

  //       </DialogContent>
  //       <DialogActions>
  //         <Button variant={'contained'} onClick={this.handle_Download_File_RequestClose} color="primary">
  //           Cancel
  //         </Button>
  //       </DialogActions>
  //     </>
  //   )
  // }

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
  // handleDownloadWavFile = (obj) => {
  //   return downloadData(obj);
  //   // console.log(" data",data)
  // }
  // handleDownloadDocxFile = (obj) =>{
  //   return downloadData(obj);
  // }

  handleUserDetails = async (id) => {
    let res = await getUserInfoByIdAPI(id);
    // console.log("id>>>>>",id.e);
    // console.log("res:::::",res);
    if (res && res.data && res.status == 200) {
      notify.success("successfully show the user data!")
      this.setState({
        getUserForm_DialogOpen: true,
        formData: res.data || {}
      })
    } else {
      notify.error(res.message || 'Something went wrong while show the user data!')
    }
  }
  handleAddDataRequestClose = () => {
    this.setState({
      getUserForm_DialogOpen: false,
      formData: {}
    })
  }
  getFormContent = () => {
    return (
      <UserForm
        formTitle={'User'}
        // isItEditForm={false}
        // isItEditMode={false}
        // errors={state.errors}
        formData={this.state.formData || {}}
        doesFormDialogOpen={this.state.getUserForm_DialogOpen}

        // handleSubmitButton={this.handleAddDataRequest}
        handleCancelButton={this.handleAddDataRequestClose}
      // handleInputChange={this.handleInputChange}
      // isEditFormSubmitDisabled={this.state.isAddFormSubmitDisabled}
      />
    )
  }

  getFileNameFromUrl = (url) => {
    try {
      const fileName = new URL(url || '').searchParams.get('filename');
      return fileName;
    } catch (error) {
      // console.log("Erro: ", error);
      return null;      
    }
  }

  render() {
    return (
      <div>
        <div>
          {
            !(this.state.getUserForm_DialogOpen) ? ('') : (this.getFormContent())
          }
        </div>
        <Paper elevation={3} style={{ margin: '20px', padding: '10px', display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
          <b> Audio & Text File Management </b>
        </Paper>
        <Paper elevation={3} style={{ margin: '20px', overflow: 'auto' }}>
          <TableContainer style={{ maxHeight: window.innerHeight * 0.8 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead style={{ backgroundColor: 'lightgreen' }}>
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
                      <TableRow key={obj.id} style={{ backgroundColor: rowBgColor }}>
                        <TableCell><a onClick={(e) => this.handleUserDetails(obj.user_id)} style={{ cursor: "pointer"}}>{(obj.user_id == 0) ? 'UNKNOWN' : obj.user_id}</a></TableCell>
                        <TableCell>{obj.wav_file_path ? (this.getFileNameFromUrl(obj.wav_file_path) || 'N/A') : "Empty"}</TableCell>
                        <TableCell>{this.getFileNameFromUrl(obj.wav_file_path) ? <CloudDownload key={obj.id} onClick={(e) => this.handleDownloadWavFile(obj.wav_file_path)} style={{ color: "#9370DB", cursor: "pointer" }} /> : "N/A"}</TableCell>
                        <TableCell>{this.getFileNameFromUrl(obj.text_file_path) ? <CloudDownload onClick={(e) => this.handleDownloadDocxFile(obj.text_file_path)} style={{ color: "#9370DB", cursor: "pointer" }} /> : "N/A"}</TableCell>
                        <TableCell>{this.getFileNameFromUrl(obj.error_file_path) ? <CloudDownload onClick={(e) => this.handleDownloadErrorFile(obj.error_file_path)} style={{ color: "#9370DB", cursor: "pointer" }} /> : "N/A"}</TableCell>
                          <TableCell> {obj.description} </TableCell>
                        <TableCell
                          // align="center"
                          width="20%"
                          padding="none"
                        >
                          {/* <IconButton
                            id={obj.id}
                            onClick={(e) => this.onTableRowFileDonwloadButtonClick(e)}
                          >
                            <EditIcon color="primary" />
                          </IconButton> */}
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
          </TableContainer>
        </Paper>
        <Dialog
          maxWidth="sm"
          open={this.state.download_File_DialogOpen}
          onClose={this.handle_Download_File_RequestClose}
        >
          {/* {this.download_content()} */}
        </Dialog>
        <Dialog
          maxWidth="sm"
          open={this.state.deleteItem_DialogOpen}
          onClose={this.handle_Delete_Item_RequestClose}
        >
          {this.deleteItem_content}
        </Dialog>
        <Notification />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    AudioAndTextFileModule: state.AudioAndTextFileModule
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchAllFiles: () => dispatch(fetchAllFiles()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioAndFileManagement);