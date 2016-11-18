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
    };
    const listDropDownStyle = {
      height: 'auto',
    }
    const listItemStyle = {
      display: 'block',
      height: 'auto',
    }

    let DropDownItems;
    let ButtonDisplay;
    let customEffects = this.props.customEffects;
    if (this.props.effectsMenuActive) {
      ButtonDisplay = 'fa fa-minus-square-o';
      DropDownItems = customEffects.map((effect) => {
        let effectName = effect.name;
        return <li key={customEffects.indexOf(effect)} value={effectName} style={listItemStyle} onClick={this.addEffectToRack}>{effectName}</li>
      });
    } else {
      ButtonDisplay = 'fa fa-plus-square-o';
      DropDownItems = '';
    }

    return (
      <div className="effectsDropDown">
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
