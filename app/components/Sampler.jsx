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
      <div style={{border: '2px solid black', width: '100%', height: '30%', position:'relative'}}>
      {columns()}
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
