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
      height: 'auto',
      marginBottom: '2em',
    }
    let legalText = {
      display: 'block',
      height: 'auto',
    }

    return (
      <div style={{height:'auto', overflow:'hidden', marginTop:'5em', display:'block', padding:'0 5%'}}>
        <div style={legalDisplay}>
          <h2 style={legalText}>Contact</h2>
          <p style={legalText}>Email us at <strong>adventurousvnecks@gmail.com</strong>.</p>
        </div>
        <div style={legalDisplay}>
          <h2 style={legalText}>About</h2>
          <p style={legalText}>This application was made in November 2016 as part of HackReactor cohort 49.
          It is a demonstration site and you agree to use and treat it accordingly.</p>
        </div>
        <div style={legalDisplay}>
          <h2 style={legalText}>Privacy Policy</h2>
          <p style={legalText}>We do not collect any user information except for a user name and password.</p>
        </div>
        <div style={legalDisplay}>
         <h2 style={legalText}>Intellectual Property</h2>
          <p style={legalText}>You agree that you own or are appropriately licensed to use any samples you upload
          to this site. In particular, note that other users may listen to and/or use your samples.</p>
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
