import React from 'react';
import styles from '../App.scss';
import EffectsUnit from './EffectsUnit.jsx';
import EffectsDropDown from './EffectsDropDown.jsx';

import {connect} from 'react-redux';

class EffectsRack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const effectsContainerStyle = {
      border: '2px solid #383838',
      borderRadius: '2px',
      backgroundColor: '#efefef',
      width: '100%',
      height:'100%',
      position:'relative',
      textAlign: 'right',
    };

    let activeEffects = this.props.activeEffects;
    let EffectsUnits = activeEffects.map((effect) => {
        return <EffectsUnit id={effect} key={effect}/>
      });

    return (
    <div style={{display:'inline-block', height:'15%', width:'100%', marginTop:'0.5em'}}>
      <div className="effectsContainer" style={effectsContainerStyle}>
        <div style={{width: '90%', float: 'left'}}>
         {EffectsUnits}
        </div>
        <EffectsDropDown />
      </div>
      <span style={{backgroundColor:'#efefef', marginTop: '-0.5em', position:'absolute', left:'1em', height:'1em', paddingLeft:'0.5em', paddingRight:'0.5em'}}>Effects Rack</span>
    </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    activeEffects: state.activeEffects,
  };
}

export default connect(mapStateToProps)(EffectsRack);