import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  IconButton,
  Tooltip,
  Zoom,
  Button
} from '@material-ui/core';
import AudioReactRecorder, { RecordState } from './AudioAnalyser';
import CustomeButton from '../../components/common/Inputs/Button';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import StopIcon from '@material-ui/icons/Stop';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PublishIcon from '@material-ui/icons/Publish';
import TitleBar from '../../components/TitleBar';
import axios from 'axios';
import { Notification, notify } from '../../components/ToastNotification';
import { uploadAudioFileAPI } from '../../apis/audioAndTextFileManager';
import { getUserData } from '../../utils/index';
import './styles.css';

class SpeechToText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalisedText: '',
      recordState: null,
      audioData: null,
      canvasWidth: 500,
      canvasHeight: 150,
      doesTheAudioFileUploaded: false,
    }
  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
      doesTheAudioFileUploaded: false,
    })
  }

  pause = () => {
    this.setState({
      recordState: RecordState.PAUSE
    })
  }

  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    })
  }

  onStop = (data) => {
    this.setState({
      audioData: data
    });
  }

  handleFileUpload = async (e) => {
    const {audioData} = this.state;
    if(!audioData || !audioData.blob){
      return;
    }

    let formData = new FormData();
    let userId = 'unknown'; // for time being, hardcoding some string
    const userInfo = getUserData(); // It'll return current-user-info, if the user is already logged-in
    if(userInfo && userInfo.id){
      userId = userInfo.id;
    }

    const timeStamp = new Date().toJSON().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    const fileName = `${userId}_${timeStamp}.wav`;
    formData.append('audio', audioData.blob, fileName);
    formData.append('user_id', userId);

    let result = await uploadAudioFileAPI(formData);
    if(result && result.status == 200){
      this.setState({
        doesTheAudioFileUploaded: true
      })
      notify.success('Your files is uploaded Successfully!! ');
    } else {
      result && notify.error(result.message || 'Something went wrong!');
    }

  }
  reset = () => {
    this.setState({
      audioData: null,
      recordState: null,
    })
  }

  render() {
    const {
      recordState,
      audioData,
      canvasWidth,
      canvasHeight,
      doesTheAudioFileUploaded
    } = this.state;

    const AddTooltipEffect = (props) => {
      return (
        <Tooltip title={props.title} TransitionComponent={Zoom} leaveDelay={200} arrow interactive >
          {props.children}
        </Tooltip>
      )
    }

    return (
      <Paper elevation={0} style={{padding: '20px'}}>
        {/* <TitleBar title={this.props.componentName}/> */}
        <div style={{ display: 'flex', justifyContent: "center" }}>
          <Card style={{textAlign: 'center', backgroundColor: '#2e8b579e'}}  elevation={3}>
            <CardHeader
              title="Audio recorder"
              subheader="Click on start, to start recording"
            />
            <CardContent>
                <AudioReactRecorder
                  state={this.state.recordState}
                  onStop={this.onStop}
                  canvasWidth={500}
                  canvasHeight={150}
                  backgroundColor={'black'}
                  foregroundColor={'blue'}
                />
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: "space-evenly" }}>
              <AddTooltipEffect title='Start recording'>
                <IconButton
                  aria-label="Start recording"
                  color={'primary'}
                  onClick={this.start}
                  disabled={![RecordState.PAUSE, null].includes(recordState)}
                >
                  <PlayCircleFilledWhiteIcon fontSize="large" />
                </IconButton>
              </AddTooltipEffect>
              <AddTooltipEffect title='Pause recording'>
                <IconButton
                  aria-label="Pause recording"
                  color={'primary'}
                  onClick={this.pause}
                  disabled={![RecordState.START].includes(recordState)}
                >
                  <PauseCircleFilledIcon fontSize="large" />
                </IconButton>
              </AddTooltipEffect>
              <AddTooltipEffect title='Stop recording'>
                <IconButton
                  aria-label="Stop recording"
                  color={'primary'}
                  onClick={this.stop}
                  disabled={![RecordState.START, RecordState.PAUSE].includes(recordState)}
                >
                  <StopIcon fontSize="large" />
                </IconButton>
              </AddTooltipEffect>
              <AddTooltipEffect title='Reset recording'>
                <IconButton
                  aria-label="Reset recording"
                  color={'primary'}
                  onClick={this.reset}
                  disabled={recordState === RecordState.STOP ? false : true}
                >
                  <HighlightOffIcon fontSize="large" />
                </IconButton>
              </AddTooltipEffect>
              <AddTooltipEffect title='Upload your Audio file'>
                <IconButton
                  aria-label="Upload your Audio file"
                  color={'primary'}
                  onClick={this.handleFileUpload}
                  disabled={!(audioData && audioData.blob) || doesTheAudioFileUploaded}
                >
                  <PublishIcon fontSize="large" />
                </IconButton>
              </AddTooltipEffect>
            </CardActions>
            {/* <hr color={'grey'} size={'20'} /> */}
            <h4> Here your audio recored file: </h4>
            <List>
              {
                // audioData && [audioData].map((audioInfo, index) => {
                //   return (
                    <audio
                      id={`audio_1`}
                      key={`audio_1`}
                      controls
                      src={audioData ? audioData.url : null}
                      visible='hide'
                    />
                //   )
                // })
              }
            </List>
            {
              // // !(audioData && audioData.blob) ? '' : (
              //   <Button
              //   disabled={!(audioData && audioData.blob)}
              //     variant='contained'
              //     color='primary'
              //     style={{
              //       margin: '20px',
              //       width: '-webkit-fill-available'
              //     }}
              //     onClick={this.handleFileUpload}
              //   >
              //     Click here to upload your file
              //   </Button>
              // // )
            }
          </Card>
          <Notification/>
        </div>
      </Paper>
    )
  }
}

// function mapStateToProps(state, ownProps){
//   return {

//   }
// }

// function mapDispatchToProps(dispatch, ownProps){
//   return {
//   }
// }

export default SpeechToText;