import React from 'react';
import './style.css';


const instructions = 'Press the <strong>Start Recognition</strong> button and allow access.';

export default class CustomSpeechRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteContent: '',
      noteTextarea: '',
      instructions: 'Press the <strong>Start Recognition</strong> button and allow access.',
      listening: false,
    };
    // this.noteContent = '';
    
      
    this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new this.SpeechRecognition();
  }

  componentDidMount() {
    this.init()
  }

  toggleListen = () => {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  handleListen = () => {

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
      this.recognition.lang = 'en-US';
      // This block is called every time the Speech APi captures a line. 
      this.recognition.onresult = (event) => {
        console.log("setp1");
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
    }
    catch(e) {
      console.error(e);
      document.getElementById('no-browser-support').show();
      document.getElementById('app').hide();
    }
    
  }

  handleStartRecord = (e) => {
    this.toggleListen();
    if (this.state.noteContent.length) {
      // this.noteContent += ' ';
      this.setState({
        noteContent: ' ' + this.state.noteContent,
      })
    }
    debugger;
    this.recognition && this.recognition.start();
  };


  handlePauseRecord = (e) => {
    this.recognition && this.recognition.stop();
    this.setState({
      instructions: 'Voice recognition paused.',
    });
  };

  // this.renderNotes(this.getAllNotes());
  
  // Sync the text inside the text area with the noteContent variable.
  hanldeOnInputTextArea = () => {
    // this.noteContent = document.getElementById('note-textarea').innerText;
  }
  
  handleSaveNoteButton = (e) => {
    this.recognition && this.recognition.onspeechend();
  
    if(!this.state.noteContent.length) {
      this.setState({
        instructions: 'Could not save empty note. Please add a message to your note.',
      });
    }
    else {
      // Save note to localStorage.
      // The key is the dateTime with seconds, the value is the content of the note.
      this.saveNote(new Date().toLocaleString(), this.state.noteContent);
  
      // Reset variables and update UI.
      // this.noteContent = '';
      this.renderNotes(this.getAllNotes());
      // noteTextarea.val('');
      this.setState({
        noteTextarea: '',
        noteContent: '',
        instructions: 'Note saved successfully.',
      });
    }
        
  }
  
  
  // notesList.on('click', function(e) {
  //   e.preventDefault();
  //   var target = $(e.target);
  
  //   // Listen to the selected note.
  //   if(target.hasClass('listen-note')) {
  //     var content = target.closest('.note').find('.content').text();
  //     readOutLoud(content);
  //   }
  
  //   // Delete note.
  //   if(target.hasClass('delete-note')) {
  //     var dateTime = target.siblings('.date').text();  
  //     deleteNote(dateTime);
  //     target.closest('.note').remove();
  //   }
  // });
  
  
  
  /*-----------------------------
        Speech Synthesis 
  ------------------------------*/
  
  readOutLoud = (message) => {
    var speech = new SpeechSynthesisUtterance();
  
    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
  }
  
  
  
  /*-----------------------------
        Helper Functions 
  ------------------------------*/
  
  renderNotes = (notes) => {
    // var html = '';
    if(notes.length) {
      return notes.map(function(note) {
        return <li className="note">
          <p className="header">
            <span className="date">${note.date}</span>
            <a href="#" className="listen-note" title="Listen to Note">Listen to Note</a>
            <a href="#" className="delete-note" title="Delete">Delete</a>
          </p>
          <p className="content">${note.content}</p>
        </li>;
      });
    }
    else {
      return <li><p className="content">You don\'t have any notes yet.</p></li>;
    }
    // notesList.html(html);
  }
  
  
  saveNote = (dateTime, content) => {
    localStorage.setItem('note-' + dateTime, content);
  }
  
  
  getAllNotes = () => {
    var notes = [];
    var key;
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
  
      if(key.substring(0,5) == 'note-') {
        notes.push({
          date: key.replace('note-',''),
          content: localStorage.getItem(localStorage.key(i))
        });
      } 
    }
    return notes;
  }
  
  
  deleteNote = (dateTime) => {
    localStorage.removeItem('note-' + dateTime); 
  }
  

  render() {
    return (
      <div>

        <h1>Voice Controlled Notes App</h1>

        <h3 className="no-browser-support">Sorry, Your Browser Doesn't Support the Web Speech API. Try Opening This Demo In Google Chrome.</h3>

        <div className="app">
          <h3>Add New Note</h3>
          <div className="input-single">
            <textarea
              id="note-textarea"
              placeholder="Create a new note by typing or using voice recognition."
              rows="6"
              value={this.state.noteContent}
              onInput={this.hanldeOnInputTextArea}
            >
            </textarea>
          </div>
          <button id="start-record-btn" title="Start Recording" onClick={this.handleStartRecord}>Start Recognition</button>
          <button id="pause-record-btn" title="Pause Recording" onClick={this.handlePauseRecord}>Pause Recognition</button>
          <button id="save-note-btn" onClick={this.handleSaveNoteButton} title="Save Note">Save Note</button>
          <p id="recording-instructions">{this.state.instructions}</p>

          <h3>My Notes</h3>
          <ul id="notes">
            <li>
              this.renderNotes()
            </li>
          </ul>
        </div>``
      </div>
    )
  }
}