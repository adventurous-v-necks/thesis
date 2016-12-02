import React from 'react';
import styles from '../App.scss';
import {Link} from 'react-router';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {

    return (
      <div style={{height:'calc(100% + 5em)', width:'100%'}}>
        <div className="hero">
          <span className="hello">Online, social DJing</span>
          <Link to="/player"><button>Try a demo</button></Link>
        </div>
        <div className="app-info">
          <h1>DJing in the style of Ableton, in your browser.</h1>
          <div className="app-info-box">
            <div className="screenshot1">
            </div>
            <div className="app-info-text">
              Make your own music
            </div>
          </div>
          <div className="app-info-box">
            <div className="screenshot2">
            </div>
            <div className="app-info-text">
              Live collaboration
            </div>
          </div>
          <div className="app-info-box">
            <div className="screenshot3">
            </div>
            <div className="app-info-text" style={{textAlign: 'center'}}>
              Anywhere with an internet connection
            </div>
          </div>
        </div>
        <div className="hero2">
          <span className="hero2-tagline">Mixing in the browser</span>
        </div>
        <div className="team-info">

        <section id="cd-timeline" className="cd-container">
            <div className="cd-timeline-block">
              <div className="cd-timeline-img cd-picture">
                <img src="https://avatars3.githubusercontent.com/u/2245347?v=3&s=400" />
              </div>

              <div className="cd-timeline-content">
                <h2>The Group Assembled</h2>
                <p>Aleks, Clark, Hans, and Tom joined forces for a four-week project under the name 'Adventurous V-Necks'. The only direction was to build a full-stack JavaScript application.</p>
                <span className="cd-date">Nov 8</span>
              </div>
            </div>

            <div className="cd-timeline-block">
              <div className="cd-timeline-img cd-movie">
                <img src="https://avatars2.githubusercontent.com/u/3580169?v=3&s=400" />
              </div>

              <div className="cd-timeline-content">
                <h2>Direction Set</h2>
                <p>After much deliberation and many bad ideas, they decided to save the world with dance. Actually, music was an idea that persisted from the beginning of ideation and the V-Necks decided they would an Ableton-like product that would allow DJs to collaborate in the browser.</p>
                <span className="cd-date">Nov 10</span>
              </div>
            </div>

            <div className="cd-timeline-block">
              <div className="cd-timeline-img cd-location">
                <img src="https://avatars1.githubusercontent.com/u/10526835?v=3&s=460" />
              </div>

              <div className="cd-timeline-content">
                <h2>ReactorSound was Born</h2>
                <p>The app was presented to those who would listen. The V-Necks presented their Ableton-like application to the Seniors of HackReactor cohort 49 as their senior thesis.</p>
                <span className="cd-date">Dec 2</span>
              </div>

            <div className="cd-timeline-block">
              <div className="cd-timeline-img cd-location">
                <img src="https://avatars3.githubusercontent.com/u/15370140?v=3&s=400" />
              </div>

              <div className="cd-timeline-content">
                <h2>Music is Made</h2>
                <p>Click the "Try a Demo" button above to make your own beats seemlessly in the browser. You can also Sign Up or Log In to collaborate instantly with friends and create music together.</p>
                <span className="cd-date">Today</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="blurb">
            <div className="blurb-info">Built in three weeks with React/Redux, MongoDB, and Node/Express.</div>

            <div className="blurb-info">React was chosen for it's performant rendering of the many interrelated 
            components and paired with a Redux store to manage state and emit updates.</div>

            <div className="blurb-info">MongoDB was also chosen for speed and flexibility. We store as a series of 
            time-stamped events, essentially recreating a performance, instead of recording, storing, and retreiving 
            the audio itself.</div>

            <div className="blurb-info">Music is composed by leveraging the open source Web Audio API to generate an 
            audio context upon which we attach, remove or fine-tune effects as the user desires. For example, the 
            audio effects and synth oscillators are individual nodes attached to the audio 
            context to manipulate the sound waves produced.</div>

            <div className="blurb-info">Sockets connect our users in realtime. Anytime a user logs in, a room is 
            created via a Socket.io connection. Users can join other performance rooms to mix together in realtime 
            with the sockets broadcasting all relevant events within those rooms.</div>

            <div className="blurb-info">The app is fully containerized with Docker and deployed on Linode running Ubuntu 16.</div>
          </div>
        </section>

        </div>
        <div className="footer">
          <div className="footer-info">
            <div className="col-1">
              <ul>
                <li><Link to="/about" style={{color: '#bbb'}}>Contact</Link></li><br/>
                <li><Link to="/about" style={{color: '#bbb'}}>About</Link></li><br/>
                <li><Link to="/about" style={{color: '#bbb'}}>Privacy Policy</Link></li><br/>
                <li><Link to="/about" style={{color: '#bbb'}}>Intellectual Property</Link></li><br/>
                <li><Link to="/about" style={{color: '#bbb'}}>Terms & Conditions</Link></li><br/>
              </ul>
            </div>
            <div className="col-2">
              <img src="images/GitHub-Mark-120px-plus.png"/>
            </div>
            <div className="col-3">
              Adventurous V-Necks<br/>
              Hack Reactor Seniors<br/>
              944 Market Street<br/>
              San Francisco<br/>
              California 94102<br/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
