import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import NxtContext from '../Context/ReactContext'
import {
  LoginPageContainer,
  LoginFormContainer,
  LoginCheckBoxLabel,
  LoginInputContainer,
  LoginInput,
  LoginInputLabel,
} from '../Styling/StyleComponents'
import './index.css'

class Login extends Component {
  state = {
    showErrorMsg: false,
    errorMsg: '',
    username: '',
    password: '',
    passwordType: 'password',
    ischeckboxClicked: false,
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {
      username,
      password,
    }
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLoginProfile(data.jwt_token)
    } else {
      this.onfailureLoginProfile(data.error_msg)
    }
  }

  onSuccessLoginProfile = token => {
    Cookies.set('jwt_token', token, {expires: 20})
    console.log(`hist`)
    const {history} = this.props
    history.replace('/')
  }

  onfailureLoginProfile = msg => {
    this.setState({
      showErrorMsg: true,
      errorMsg: msg,
      username: '',
      password: '',
    })
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onCheckClick = () =>
    this.setState(
      prevState => ({ischeckboxClicked: !prevState.ischeckboxClicked}),
      this.gettingPasswordType,
    )

  gettingPasswordType = () => {
    const {ischeckboxClicked} = this.state
    if (ischeckboxClicked) {
      this.setState({passwordType: 'text'})
    } else {
      this.setState({passwordType: 'password'})
    }
  }

  render() {
    const {username, password, passwordType, showErrorMsg, errorMsg} =
      this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtContext.Consumer>
        {value => {
          const {isLightTheme} = value
          const logoUrl = isLightTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          return (
            <LoginPageContainer lightTheme={isLightTheme}>
              <LoginFormContainer
                lightTheme={isLightTheme}
                onSubmit={this.onSubmitLoginForm}
              >
                <img alt="website logo" className="login-logo" src={logoUrl} />
                <LoginInputContainer lightTheme={isLightTheme}>
                  <LoginInputLabel lightTheme={isLightTheme} htmlFor="username">
                    USERNAME
                  </LoginInputLabel>
                  <LoginInput
                    lightTheme={isLightTheme}
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Username"
                    onChange={this.onUsernameChange}
                  />
                </LoginInputContainer>
                <LoginInputContainer lightTheme={isLightTheme}>
                  <LoginInputLabel lightTheme={isLightTheme} htmlFor="password">
                    PASSWORD
                  </LoginInputLabel>
                  <LoginInput
                    lightTheme={isLightTheme}
                    onChange={this.onPasswordChange}
                    type={passwordType}
                    id="password"
                    value={password}
                    placeholder="Password"
                  />
                  <div className="showpassword-container">
                    <input
                      onClick={this.onCheckClick}
                      type="checkbox"
                      id="login-password-chechbox"
                    />
                    <LoginCheckBoxLabel
                      lightTheme={isLightTheme}
                      htmlFor="login-password-chechbox"
                    >
                      Show Password
                    </LoginCheckBoxLabel>
                  </div>
                </LoginInputContainer>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showErrorMsg && <p className="login-error-msg">*{errorMsg}</p>}
              </LoginFormContainer>
            </LoginPageContainer>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Login
