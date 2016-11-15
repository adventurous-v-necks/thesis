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
       hoverColour: '#f3e939'
    });

    let masterGain = this.props.audioContext.createGain();
    let nodes = [];

    masterGain.gain.value = 0.3;
    masterGain.connect(this.props.audioContext.destination);

    keyboard.keyDown = (note, frequency) => {
        let oscillator = this.props.audioContext.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.value = frequency;
        oscillator.connect(masterGain);
        oscillator.start(0);

      nodes.push(oscillator);
      this.props.dispatch({type: 'KEY_DOWN', note, frequency});
    };

    keyboard.keyUp = (note, frequency) => {
      let new_nodes = [];

      for (let i = 0; i < nodes.length; i++) {
        if (Math.round(nodes[i].frequency.value) === Math.round(frequency)) {
          nodes[i].stop(0);
          nodes[i].disconnect();
        } else {
          new_nodes.push(nodes[i]);
        }
      }

      nodes = new_nodes;
      this.props.dispatch({type: 'KEY_UP', note, frequency});
    };
  }

  render() {
    const style = {
      padding: '10px 5px 10px 5px',
      border: '3px solid purple',
      width: '482px',
      height: '130',
      position: 'absolute',
      bottom: '2px',
      left: 'calc(50% - 250px + 3px)' // little extra b.c. of bizarre "extra key"
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
