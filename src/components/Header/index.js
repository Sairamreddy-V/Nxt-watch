import Popup from 'reactjs-popup'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {IoSunnyOutline} from 'react-icons/io5'
import {IoMdMenu} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import NxtContext from '../Context/ReactContext'
import {
  HeaderNavContainer,
  HeaderTriggerButton,
  HeaderThemeButton,
  HeaderPopupContainer,
  HeaderPopupButton,
} from '../Styling/StyleComponents'
import './index.css'

const Header = props => (
  <NxtContext.Consumer>
    {value => {
      const {isLightTheme, changingTheme} = value
      const logoUrl = isLightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      const logoutClassName = isLightTheme ? 'logout-light' : 'logout-dark'

      const onThemeIconClick = () => {
        changingTheme()
      }
      const onConformButton = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      return (
        <HeaderNavContainer lightTheme={isLightTheme}>
          <Link to="/">
            <img className="website-logo" alt="website logo" src={logoUrl} />
          </Link>
          <ul className="header-nav-ul-container">
            {isLightTheme ? (
              <li onClick={onThemeIconClick}>
                <HeaderThemeButton data-testid="theme">
                  <FaMoon className="moon-icon" aria-label="theme" />
                </HeaderThemeButton>
              </li>
            ) : (
              <li onClick={onThemeIconClick}>
                <HeaderThemeButton data-testid="theme">
                  <IoSunnyOutline className="sun-icon" aria-label="theme" />
                </HeaderThemeButton>
              </li>
            )}
            <li>
              <img
                className="profile-nav"
                alt="profile"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              />
              <IoMdMenu className="header-menu" />
            </li>
            <li>
              <Popup
                modal
                trigger={
                    <button
                      type="button"
                      className={logoutClassName}
                    >
                      Logout
                    </button>
                }
              >
                {close => (
                  <HeaderPopupContainer lightTheme={isLightTheme}>
                    <div>
                      <p>Are you sure, you want to logout</p>
                    </div>
                    <div>
                      <HeaderPopupButton
                        outline="true"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </HeaderPopupButton>
                      <HeaderPopupButton onClick={onConformButton}>
                        Confirm
                      </HeaderPopupButton>
                    </div>
                  </HeaderPopupContainer>
                )}
              </Popup>
            </li>
          </ul>
        </HeaderNavContainer>
      )
    }}
  </NxtContext.Consumer>
)

export default withRouter(Header)
