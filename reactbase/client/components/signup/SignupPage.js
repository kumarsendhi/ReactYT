import React from 'react';
import Signupform from './Signupform';

class SignupPage extends React.Component{
  render(){
    return (
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <Signupform />
          </div>
        </div>
    )
  }

}

export default SignupPage;
