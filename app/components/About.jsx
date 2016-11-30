import React from 'react';
import styles from '../App.scss';

import {Link} from 'react-router';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let legalDisplay = {
      display: 'block',
      height: '5em',
    }
    let legalText = {
      display: 'block',
      height: 'auto',
    }

    return (      
      <div style={{height:'100em', marginTop:'5em'}}>
        <div style={legalDisplay}>
          <h2 style={legalText}>About</h2>
          <p style={legalText}>This application was made in November 2016 as part of HackReactor cohort 49.</p>
        </div>
        <div style={legalDisplay}>
          <h2 style={legalText}>Privacy Policy</h2>
          <p style={legalText}>We do not collect any user information except for a user name and password.</p>
        </div>
        <div style={legalDisplay}>
         <h2 style={legalText}>Intellectual Property</h2>

        </div>
        <div style={legalDisplay}>
          <h2 style={legalText}>Terms and Conditions</h2>
          <p style={legalText}>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
          INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
          PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
          LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
          OTHER DEALINGS IN THE SOFTWARE.</p>
        </div>
      </div>
    );
  }

}