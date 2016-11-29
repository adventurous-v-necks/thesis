import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Transport from './Transport.jsx';
import EffectsRack from './EffectsRack.jsx';
import Sampler from './Sampler.jsx';
import Synth from './Synth.jsx';
import Fader from './Fader.jsx';
import io from 'socket.io-client';

let socket = io();

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

   componentWillMount(){
    let context = this;
    socket.emit('playerLoading', {data: null});
    socket.on('userLogin', function(data) {
         window.localStorage.setItem('com.rejuicy.user',JSON.stringify({
            username: data.data
          }));
          context.props.dispatch({type:'USER_LOGIN'});
    })
  }

  render() {
    return (
      <div className="player" style={{paddingLeft:'1%', paddingRight:'1%', height: '100%'}}>
        <div style={{width: '100%', height: '4em'}}></div>
        <Transport />
        <Sampler />
        <EffectsRack />
        <Synth />
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Player);
