// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';
import QwertyHancock from 'qwerty-hancock';

import {connect} from 'react-redux';

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

    let keyboard = new QwertyHancock({
                 id: 'keyboard',
                 width: 600,
                 height: 150,
                 octaves: 2,
                 startNote: 'A3',
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
    return (
      <div id="keyboard">
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
