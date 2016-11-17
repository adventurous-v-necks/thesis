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
  		height:'15%',
  		position:'relative',
  		textAlign: 'right',
  	};

    let activeEffects = this.props.activeEffects;
    let EffectsUnits = activeEffects.map((effect) => {
        return <EffectsUnit id={effect} key={effect}/>
      });

    return (
      <div className="effectsContainer" style={effectsContainerStyle}>
        <div style={{width: '90%', float: 'left'}}>
         {EffectsUnits}
        </div>
        <EffectsDropDown />
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
