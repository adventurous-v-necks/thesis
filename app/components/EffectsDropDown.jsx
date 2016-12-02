import React from 'react';
import styles from '../App.scss';

import {connect} from 'react-redux';

class EffectsDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.addEffectToRack = this.addEffectToRack.bind(this);
  }

  toggleMenu() {
    this.props.dispatch({type: 'EFFECT_MENU_TOGGLE'});
  }

  addEffectToRack(e) {
    this.props.dispatch({type: 'EFFECT_TO_RACK', effect: e.nativeEvent.target.attributes.value.value});
  }

  render() {

    const style = {
      fontSize: '2em',
      height: '100%',
      padding: '.05em .1em 0 .1em',
      display: 'block',
      height: 'auto',
      marginTop: '-0.35em',
    };
    let listDropDownStyle = {
      height: 'auto',
      paddingRight: '0.5em',
      paddingLeft: '0.5em',
      backgroundColor: '#333',
      borderRadius: '2px',
      transition: 'all 0.3s ease',
      position: 'relative',
      zIndex: '99',
    }
    const listItemStyle = {
      display: 'block',
      height: 'auto',
      color: '#efefef',
      cursor: 'pointer',
    }

    let DropDownItems = '';
    let ButtonDisplay;

    if (this.props.effectsMenuActive) {
      ButtonDisplay = 'fa fa-minus-square-o';

      listDropDownStyle.maxHeight = '8em';
      DropDownItems = this.props.customEffects.map((effect) => {
        let effectName = effect.name;
        return <li key={this.props.customEffects.indexOf(effect)} value={effectName} style={listItemStyle} onClick={this.addEffectToRack}>{effectName}</li>
      });
    } else {
      ButtonDisplay = 'fa fa-plus-square-o';
      listDropDownStyle.maxHeight = '0px';
    }

    return (
      <div className="effectsDropDown" style={{position: 'absolute', right: '0'}}>
          <i className={ButtonDisplay} aria-hidden="true" style={style} onClick={this.toggleMenu}></i>
          <ul style={listDropDownStyle}>{DropDownItems}</ul>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    effectsMenuActive: state.effectsMenuActive,
    customEffects: state.customEffects,
  };
}

export default connect(mapStateToProps)(EffectsDropDown);
