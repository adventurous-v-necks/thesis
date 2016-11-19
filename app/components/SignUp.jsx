import React from 'react'
import styles from '../App.scss';

export default class loginForm extends React.Component {


  render() {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <Field name="firstName" type="text" placeholder="First Name"/>
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <Field name="lastName" type="text" placeholder="Last Name"/>
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <Field name="email" type="email" placeholder="Email"/>
          </div>
        </div>
        <div>
          <label>DJ Name</label>
        <div>
            <Field name="email" type="text" placeholder="DJ Name"/>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
        </div>
        <div>
          <label htmlFor="employed">Employed</label>
          <div>
            <Field name="employed" id="employed" component="input" type="checkbox"/>
          </div>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <Field name="notes" component="textarea"/>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button"  onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }

}