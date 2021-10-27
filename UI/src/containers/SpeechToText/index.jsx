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
  Button,
  Select,
  MenuItem
} from '@material-ui/core';
import AudioReactRecorder, { RecordState } from './AudioAnalyser';
import CustomeButton from '../../components/common/Inputs/Button';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import StopIcon from '@material-ui/icons/Stop';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PublishIcon from '@material-ui/icons/Publish';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import TitleBar from '../../components/TitleBar';
import axios from 'axios';
import { Notification, notify } from '../../components/ToastNotification';
import CustomSpeechRecognition from '../../components/common/SpeechRecognition';
import { uploadAudioFileAPI } from '../../apis/audioAndTextFileManager';
import { getUserData } from '../../utils/index';
import { languagesList } from '../../utils/languagesList';
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
      doesTheDownloadButtonClose: false,
      noteContent: '',
      noteTextarea: '',
      language: 'en-US',
    }

    this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new this.SpeechRecognition();
    this.recognition.maxAlternatives = 10;
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    try {

      /*-----------------------------
            Voice Recognition 
      ------------------------------*/

      // If false, the recording will stop after a few seconds of silence.
      // When true, the silence period is longer (about 15 seconds),
      // allowing us to keep recording even when the user pauses. 
      this.recognition.continuous = true;
      // this.recognition.interimResults = true;
      this.recognition.lang = "en-US";
      // This block is called every time the Speech APi captures a line. 
      this.recognition.onresult = (event) => {
        // event is a SpeechRecognitionEvent object.
        // It holds all the lines we have captured so far. 
        // We only need the current one.
        var current = event.resultIndex;

        // Get a transcript of what was said.
        var transcript = event.results[current][0].transcript;

        // Add the current transcript to the contents of our Note.
        // There is a weird bug on mobile, where everything is repeated twice.
        // There is no official solution so far so we have to handle an edge case.
        var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

        if (!mobileRepeatBug) {
          // this.noteContent += transcript;
          this.setState({
            noteContent: (this.state.noteContent || '') + transcript,
          })
        }
      };

      this.recognition.onstart = () => {
        console.log("recognition.onstart");
        this.setState({
          instructions: 'Voice recognition activated. Try speaking into the microphone.',
        });
      }

      this.recognition.onspeechend = () => {
        console.log("recognition.onspeechend");
        this.setState({
          instructions: 'You were quiet for a while so voice recognition turned itself off.',
        });
      }

      this.recognition.onerror = (event) => {
        console.log("recognition.onerror");
        if (event.error == 'no-speech') {
          this.setState({
            instructions: 'No speech was detected. Try again.',
          });
        };
      }
      this.recognition.onnomatch = (event) => {
        console.log('Speech not recognized');
      }
      
    }
    catch (e) {
      console.error(e);
      document.getElementById('no-browser-support').show();
      document.getElementById('app').hide();
    }

  }

  handleStartRecord = (e) => {
    if (this.state.noteContent.length) {
      this.setState({
        noteContent: ' ' + this.state.noteContent,
      })
    }
     // strating the Audio-to-text conversations
    this.recognition && this.recognition.start();
  };


  handlePauseRecord = (e) => {
    // pausing the Audio-to-text conversations
    this.recognition && this.recognition.stop();
  };

  handleResetRecord = () => {
     // to rest the textArea;
    this.setState({
      noteContent: ''
    })
  }
  // Sync the text inside the text area with the noteContent variable.
  hanldeOnInputTextArea = () => {
    // this.noteContent = document.getElementById('note-textarea').innerText;
  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
      doesTheAudioFileUploaded: false,
    });
    this.handleStartRecord();
  }

  pause = () => {
    this.setState({
      recordState: RecordState.PAUSE
    });
    this.handlePauseRecord();
  }

  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    });
    
    this.handlePauseRecord();
  }

  onStop = (data) => {
    this.setState({
      audioData: data
    });
  }

  handleFileUpload = async (e) => {
    const { audioData } = this.state;
    if (!audioData || !audioData.blob) {
      return;
    }

    let formData = new FormData();
    let userId = 'unknown'; // for time being, hardcoding some string
    const userInfo = getUserData(); // It'll return current-user-info, if the user is already logged-in
    if (userInfo && userInfo.id) {
      userId = userInfo.id;
    }

    const timeStamp = new Date().toJSON().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    const fileName = `${userId}_${timeStamp}.wav`;
    formData.append('audio', audioData.blob, fileName);
    formData.append('user_id', userId);

    let result = await uploadAudioFileAPI(formData);
    if (result && result.status == 200) {
      this.setState({
        doesTheAudioFileUploaded: true,
        doesTheDownloadButtonClose: true
      })
      notify.success('Your files is uploaded Successfully!! ');
      this.handleResetRecord();
    } else {
      result && notify.error(result.message || 'Something went wrong!');
    }

  }

  reset = () => {
    this.setState({
      audioData: null,
      recordState: null,
    });
    this.handleResetRecord();
  }

  handleChangeLanguage = (e) => {
    const {name, value} = e.target;
    if(name && value){
      this.setState({
        language: value,
      });
      this.recognition.lang = value;
    }
  }

  render() {
    const {
      recordState,
      audioData,
      canvasWidth,
      canvasHeight,
      doesTheAudioFileUploaded
    } = this.state;

    const isActive = (recordState === RecordState.START);
    // const isActive = true;
    const AddTooltipEffect = (props) => {
      return (
        <Tooltip title={props.title} TransitionComponent={Zoom} leaveDelay={200} arrow interactive >
          {props.children}
        </Tooltip>
      )
    }

    return (
      <Paper elevation={0} style={{ padding: '20px' }}>
        {/* <TitleBar title={this.props.componentName}/> */}
        <div style={{ display: 'flex', justifyContent: "center" }}>
          <Card style={{ textAlign: 'center', backgroundColor: '#2e8b579e' }} elevation={3}>
            <CardHeader
              title="Audio recorder"
              subheader="Click on start, to start recording"
            />
            <CardContent>
                <table style={{marginBottom: '50px'}}>
                  <tr>
                    <td style={{color: 'white'}}> Select Language: </td>
                    <td style={{backgroundColor: 'beige'}}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="language"
                        value={this.state.language}
                        onChange={this.handleChangeLanguage}
                      >
                        {
                          (languagesList || []).map((lang) => {
                            return (
                              <MenuItem value={lang.language_code}>{lang.language_name}</MenuItem>
                            )
                          })
                        }
                        {/* <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                      </Select>
                    </td>                  
                  </tr>
                </table>
              <div className="micHover">
                {/* <div  className="svg-box">
                  <SettingsVoiceIcon />
                </div> */}
                <div className={isActive ? "svg-box" : ""}>
                  <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 100 100" enableBackground="new 0 0 80 80" xmlSpace="preserve">
                    {/* <circle fill="#0194C7" cx="50" cy="50" r="50" /> */}
                    <g>
                      <SettingsVoiceIcon />
                    </g>
                  </svg>
                </div>
                <div className={isActive ? "circle delay1" : ''}></div>
                <div className={isActive ? "circle delay2" : ''}></div>
                <div className={isActive ? "circle delay3" : ''}></div>
                <div className={isActive ? "circle delay4" : ''}></div>
              </div>
              <AudioReactRecorder
                state={this.state.recordState}
                onStop={this.onStop}
                canvasWidth={0}
                canvasHeight={0}
                backgroundColor={'black'}
                foregroundColor={'blue'}
              />

              <div>
                <textarea
                  id="note-textarea"
                  placeholder="Your audio translations will be shown here....."
                  rows="12"
                  value={this.state.noteContent}
                  onInput={this.hanldeOnInputTextArea}
                  disabled
                >
                </textarea>
              </div>
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
          <Notification />
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