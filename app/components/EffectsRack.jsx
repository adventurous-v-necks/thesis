import React from 'react';
import styles from '../App.scss';
import EffectsDropDown from './EffectsDropDown.jsx';

import {connect} from 'react-redux';


class EffectsRack extends React.Component {
  constructor(props) {
    super(props);
    this.generateNewEffect = this.generateNewEffect.bind(this);
  }
  componentDidMount() {

  }
  generateNewEffect() {
    this.props.dispatch({type: 'NEW_EFFECT'});
  }
  render() {
  	const containerStyle = {
  		border: '2px solid red',
  		width: '100%',
  		height:'15%',
  		position:'relative',
  		textAlign: 'right',
  	};
  	const style = {
  		fontSize: '2em',
  		height: '100%',
  		padding: '.05em .1em 0 .1em',
  	};
    return (
        // <i className="fa fa-plus-square-o" aria-hidden="true" style={style} onClick={this.generateNewEffect}></i>
      <div className="effectsContainer" style={containerStyle}>
        <EffectsDropDown />
    	</div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(EffectsRack);
