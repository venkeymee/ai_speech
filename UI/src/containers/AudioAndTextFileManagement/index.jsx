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
import { fetchAllFilesAPI, downloadFileAPI } from '../../apis/audioAndTextFileManager';

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
    id: "errorDescription",
    align: "left",
    disablePadding: true,
    label: "Error Description",
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
    };
  }

  async componentDidMount() {
    let result = await this.props.fetchAllFiles();
    // console.log('>>fetchUserList-result: ', result);
    if (result && result.status == 200) {
      this.setState({
        userList: result.data || []
      });
      notify.success('Successfully fetched All Files list!!');
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
  downloadAudioFile = async () => {
    const { selectedFileContent } = this.state;
    const { wav_file_path } = selectedFileContent || {};
    const fileName = (wav_file_path || '').split('/').reverse()[0];
    let result = await downloadFileAPI(fileName);
    console.log('>>download-file-result: ', result);
    if (result && result.status == 200) {
      this.setState({
        download_File_DialogOpen: false,
      });
      notify.success('Successfully downloaded your file!');
    } else {
      notify.error((result.data || 'Something went wrong while downloading the file'));
    }
  }

  downloadTextFile = async () => {
    const { selectedFileContent } = this.state;
    const { text_file_path } = selectedFileContent || {};
    const fileName = (text_file_path || '').split('/').reverse()[0];
    let result = await downloadFileAPI(fileName);
    console.log('>>download-file-result: ', result);
    if (result && result.status == 200) {
      this.setState({
        download_File_DialogOpen: false,
      });
      notify.success('Successfully downloaded your file!');
    } else {
      notify.error((result.data || 'Something went wrong while downloading the file'));
    }
  }

  downloadErrorFile = async () => {
    const { selectedFileContent } = this.state;
    const { error_file_path } = selectedFileContent || {};
    const fileName = (error_file_path || '').split('/').reverse()[0];
    let result = await downloadFileAPI(fileName);
    console.log('>>download-file-result: ', result);
    if (result && result.status == 200) {
      this.setState({
        download_File_DialogOpen: false,
      });
      notify.success('Successfully downloaded your file!');
    } else {
      notify.error((result.data || 'Something went wrong while downloading the file'));
    }
  }

  download_content = () => {
    const { selectedFileContent } = this.state;
    return (
      <>
        <DialogTitle> Which one you want to download? </DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-around' }}>
            {
              !(selectedFileContent || {}).errorDescription ? (
                <>
                  <CreateDownloadButton
                    buttonName={'Audio File'}
                    handleOnClick={this.downloadAudioFile}
                  />
                  <CreateDownloadButton
                    buttonName={'Text File'}
                    handleOnClick={this.downloadTextFile}
                  />
                </>
              ) : (
                  <CreateDownloadButton
                    buttonName={'Error File'}
                    handleOnClick={this.downloadErrorFile}
                  />
                )
            }

          </div>

        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} onClick={this.handle_Download_File_RequestClose} color="primary">
            Cancel
            </Button>
        </DialogActions>
      </>
    )
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
        <Paper elevation={3} style={{ margin: '20px', padding: '10px', display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
          <b> Audio & Text File Management </b>
        </Paper>
        <Paper elevation={3} style={{ margin: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
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
                      <TableCell> {obj.user_id} </TableCell>
                      <TableCell> {obj.wav_file_path} </TableCell>
                      <TableCell> {obj.text_file_path} </TableCell>
                      <TableCell> {obj.errorDescription} </TableCell>
                      <TableCell
                        // align="center"
                        width="20%"
                        padding="none"
                      >
                        <IconButton
                          id={obj.id}
                          onClick={(e) => this.onTableRowFileDonwloadButtonClick(e)}
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
        <Dialog
          maxWidth="sm"
          open={this.state.download_File_DialogOpen}
          onClose={this.handle_Download_File_RequestClose}
        >
          {this.download_content()}
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