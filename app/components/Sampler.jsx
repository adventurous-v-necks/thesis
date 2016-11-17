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
      <div style={{display:'inline-block', height:'auto', width:'100%', marginTop:'0.2em'}}>
        <div style={{border: '2px solid #383838', width: '100%', height: '30%', position:'relative', borderRadius:'2px', backgroundColor: '#efefef'}}>
          {columns()}
        </div>
        <span style={{backgroundColor:'white', transform:'rotate(-3deg)', marginTop: '-0.5em', position:'absolute', left:'0.4em', height:'1em', paddingLeft:'0.5em', paddingRight:'0.5em'}}>Sampler</span>
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
