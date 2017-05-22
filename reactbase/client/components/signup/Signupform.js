import React from 'react';
import timezones from '../data/timezones';
import map from 'lodash/map';
import axios from 'axios'
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup'
import TextFieldGroup from '../common/TextFieldGroup';
import {browserHistory} from 'react-router'


class Signupform extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      email:'',
      password:'',
      passwordConfirmation:'',
      timezone:'',
      errors:{},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

onChange(e){
  this.setState({[e.target.name]:e.target.value});
}

isValid(){
  console.log("into valid")
  const {errors,isValid} = validateInput(this.state);
  if(!isValid){
    this.setState({errors});
  }

  return isValid;
}

onSubmit(e){

  e.preventDefault();
  if(this.isValid()){
    this.setState({errors:{},isLoading:true});
    console.log(this.state);
    //axios.post('/api/users',{user:this.state});
    this.props.userSignupRequest(this.state).then(
      () =>{
        this.props.addFlashMessage({
          type:'success',
          text: 'You signed up successfully. Welcome'
        })
        browserHistory.push('/');
      },
      ({data}) => {this.setState({errors:data,isLoading:false})}
    );
  }

}


  render(){
    const {errors} = this.state;
    const options = map(timezones,(val,key)=>
    <option key={val} value={val}>{key}</option>
  )
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>
          <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            value={this.state.username}
            field="username"
            />

            <TextFieldGroup
              error={errors.email}
              label="Email"
              onChange={this.onChange}
              value={this.state.email}
              field="email"
              />

              <TextFieldGroup
                error={errors.password}
                label="Password"
                onChange={this.onChange}
                type="password"
                value={this.state.password}
                field="password"
                />

                <TextFieldGroup
                  error={errors.passwordConfirmation}
                  label="Password Confirmation"
                  onChange={this.onChange}
                  type="password"
                  value={this.state.passwordConfirmation}
                  field="passwordConfirmation"
                  />

          <div className={classnames("form-group",{'has-error': errors.timezone})}>
            <label className="control-label">Timezone</label>
            <select
              value={this.state.timezone}
              onChange={this.onChange}

              name="timezone"
              className="form-control"
              >
              <option value="" disabled>Choose Your timezone</option>
              {options}
            </select>
            {errors.timezone && <span className="help-block">{errors.timezone}</span>}
          </div>


          <div className="form-group">
            <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
            Sign up
            </button>
          </div>
      </form>
    )
  }
}

Signupform.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default Signupform;
