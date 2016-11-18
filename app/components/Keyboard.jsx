import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import QwertyHancock from 'qwerty-hancock';

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    let keyboard = new QwertyHancock({
       id: 'keyboard',
       width: 500,
       height: 125,
       octaves: 2,
       startNote: 'C3',
       whiteNotesColour: 'white',
       blackNotesColour: 'black',
       hoverColour: '#9a9a9a'
    });

    keyboard.keyDown = (note, frequency) => {
      this.props.dispatch({type: 'KEY_DOWN', note, frequency});
    };

    keyboard.keyUp = (note, frequency) => {
      this.props.dispatch({type: 'KEY_UP', note, frequency});
    };
  }

  render() {
    const style = {
      padding: '10px 5px 10px 5px',
      width: 'auto',
      height: '130px',
      position: 'absolute',
      bottom: '2px',
      left: 'calc(50% - 250px)'
    }

    return (
      <div id="keyboard" style={style}>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    audioContext: state.audioContext
  };
}

export default connect(mapStateToProps)(Keyboard);
