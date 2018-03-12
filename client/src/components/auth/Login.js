import React, {Component} from 'react'

class Login extends Component{
  constructor(){
    super()
    this.state = {
      name: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  nameChange(name){
    this.setState({name})
  }
  passwordChange(password){
    this.setState({password})
  }
  handleSubmit(e){
    e.preventDefault()
    const params = {
      'body': JSON.stringify(this.state),
      'headers':{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'method':'POST'
    }

    fetch('http://localhost:5000/users/login',params)
    .then(res => res.json())
    .then(json => {debugger})
  }

  render(){
    return(
      <section>
        <form>
          <input type="text"
          value = {this.state.name}
          onChange = {(e)=>this.nameChange(e.target.value)}/>
          <input type="password"
          value = {this.state.password}
          onChange = {(e)=>this.passwordChange(e.target.value)}/>
          <input type = 'submit'
          onClick = {this.handleSubmit}/>
        </form>
      </section>
    )
  }
}

export default Login
