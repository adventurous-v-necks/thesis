import React from 'react';
import styles from '../App.scss';
import EffectsUnit from './EffectsUnit.jsx';
import EffectsDropDown from './EffectsDropDown.jsx';

import {connect} from 'react-redux';


class EffectsRack extends React.Component {
  constructor(props) {
    super(props);
    // this.generateNewEffect = this.generateNewEffect.bind(this);
  }
  componentDidMount() {

  }
  // generateNewEffect() {
  //   this.props.dispatch({type: 'NEW_EFFECT'}); <---- DELETE FROM DISPATCH IF NOT TO BE USED
  // }
  render() {
    console.log('props: ', this.props.activeEffects);
  	const effectsContainerStyle = {
  		border: '2px solid red',
  		width: '100%',
  		height:'15%',
  		position:'relative',
  		textAlign: 'right',
  	};
    // let EffectsUnits;
    let activeEffects = this.props.activeEffects;
    // if (activeEffects.length) {
    let EffectsUnits = activeEffects.map((effect) => {
        return <EffectsUnit id={effect} key={effect}/>
      });
    // } else {
      // EffectsUnits = "";
    // }
    console.log('units: ', EffectsUnits);
          // {EffectsUnits}
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
