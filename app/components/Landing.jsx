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
      <div>
        <div className="hero">
          <span className="hello">Online, social DJing</span>
          <Link to="/player"><button>Try a demo</button></Link>
        </div>
        <div className="app-info">
          <h1>DJing in the style of Ableton, in your browser.</h1>
          <div className="app-info-box">
            <div className="screenshot">
            </div>
            <div className="app-info-text">
              Here's a screenshot of something amazing our app can do,
              you will definitely love our app as much as we have loved
              building it. Always use Oxford commas. The end.
            </div>
          </div>
          <div className="app-info-box">
            <div className="screenshot">
            </div>
            <div className="app-info-text">
              Lorem ipsum sit dolor amet something blah blah.
            </div>
          </div>
          <div className="app-info-box">
            <div className="screenshot">
            </div>
            <div className="app-info-text">
              Lorem ipsum sit dolor amet something blah blah.
            </div>
          </div>
        </div>
        <div className="hero2">
          <div className="hello" style={{width:'15em', top: '45%'}}>
            We need a better copywriter.
          </div>
        </div>
        <div className="team-info">


          <section id="cd-timeline" className="cd-container">
              <div className="cd-timeline-block">
                <div className="cd-timeline-img cd-picture">
                  <img src="http://placehold.it/160x160" />
                </div>

                <div className="cd-timeline-content">
                  <h2>Title of section 1</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.</p>
                  <span className="cd-date">Jan 14</span>
                </div>
              </div>

              <div className="cd-timeline-block">
                <div className="cd-timeline-img cd-movie">
                  <img src="http://placehold.it/160x160" />
                </div>

                <div className="cd-timeline-content">
                  <h2>Title of section 2</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde?</p>
                  <span className="cd-date">Jan 18</span>
                </div>
              </div>

              <div className="cd-timeline-block">
                <div className="cd-timeline-img cd-picture">
                  <img src="http://placehold.it/160x160" />
                </div>

                <div className="cd-timeline-content">
                  <h2>Title of section 3</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, obcaecati, quisquam id molestias eaque asperiores voluptatibus cupiditate error assumenda delectus odit similique earum voluptatem doloremque dolorem ipsam quae rerum quis. Odit, itaque, deserunt corporis vero ipsum nisi eius odio natus ullam provident pariatur temporibus quia eos repellat consequuntur perferendis enim amet quae quasi repudiandae sed quod veniam dolore possimus rem voluptatum eveniet eligendi quis fugiat aliquam sunt similique aut adipisci.</p>
                  <span className="cd-date">Jan 24</span>
                </div>
              </div>

              <div className="cd-timeline-block">
                <div className="cd-timeline-img cd-location">
                  <img src="http://placehold.it/160x160" />
                </div>

                <div className="cd-timeline-content">
                  <h2>Title of section 4</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.</p>
                  <span className="cd-date">November 10th</span>
                </div>
              </div>

              <div className="cd-timeline-block">
                <div className="cd-timeline-img cd-movie">
                  <img src="http://placehold.it/160x160" />
                </div>

                <div className="cd-timeline-content">
                  <h2>The Beginning</h2>
                  <p>The team was formed</p>
                  <span className="cd-date">November 8th, 2016</span>
                </div>
              </div>
            </section>



        </div>
        <div className="footer">
          <div className="footer-info">
            <div className="col-1">
              <ul>
                <li>Contact</li>
                <li>About</li>
                <li>Privacy Policy</li>
                <li>Intellectual Property</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div className="col-2">
              Adventurous V-Necks<br/>
              Hack Reactor Seniors<br/>
              944 Market Street<br/>
              San Francisco<br/>
              California 9xxxx<br/>
              <img src="images/GitHub-Mark-120px-plus.png"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
