import React from 'react';
import {connect} from 'react-redux';
import styles from '../App.scss';
import Column from './Column.jsx';

class Sampler extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }
  render() {
    const columns = () => {
      let columns = [];
      for (var i = 0; i < this.props.columns; i++) columns.push(<Column key={i} colNum={i}/>);
      return columns;
    }
    return (
      <div style={{display:'inline-block', height:'28%', width:'100%', marginTop:'0.2em', position:'relative'}}>
        <div style={{border: '2px solid #383838', paddingLeft:'0.2em', paddingTop:'0.5em', width: '100%', position:'relative', borderRadius:'2px', backgroundColor: '#efefef'}}>
          {columns()}
        </div>
        <span style={{marginTop: '-0.5em', position:'absolute', zIndex:'1', left:'0.4em', height:'1em', paddingLeft:'0.5em', paddingRight:'0.5em'}}>
          <span style={{height:'1em', paddingRight: '0.5em', position: 'relative', top: '-0.1em', paddingLeft: '0.5em', left:'0.3em', backgroundColor:'#efefef', lineHeight:'1em'}}>Sampler</span>
        </span>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    columns: state.numColumns
  };
}

export default connect(mapStateToProps)(Sampler);
