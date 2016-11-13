import React from 'react';
import styles from '../App.scss';
import BoxList from './BoxList.jsx';

export default class Sampler extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('componentWillMount Sampler....cheese sampler, woot!')  
  }
  render() {
    return (
      <div>
      <BoxList />
      </div>
    );
  }
}