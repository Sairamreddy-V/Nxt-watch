import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import NxtContext from '../Context/ReactContext'
import {
  SidebarPageContainer,
  SidebarLinkListItem,
  SidebarLinkPathPara,
  SidebarBottomContainer,
  SidebarbottomText,
} from '../Styling/StyleComponents'
import './index.css'

class Sidebar extends Component {
  state = {
    isHomeActive: true,
    isTrendingActive: false,
    isGamingActiv: false,
    isSavedActive: false,
  }

  onHomeClick = () => {
    this.setState({
      isHomeActive: true,
      isGamingActiv: false,
      isSavedActive: false,
      isTrendingActive: false,
    })
  }

  onTrendingClick = () => {
    this.setState({
      isHomeActive: false,
      isGamingActiv: false,
      isSavedActive: false,
      isTrendingActive: true,
    })
  }

  onGamingClick = () => {
    console.log(`onSaved videos clicked`)
    this.setState({
      isHomeActive: false,
      isGamingActiv: true,
      isSavedActive: false,
      isTrendingActive: false,
    })
  }

  onSavedClick = () => {
    this.setState({
      isHomeActive: false,
      isGamingActiv: false,
      isSavedActive: true,
      isTrendingActive: false,
    })
  }

  render() {
    const {isHomeActive, isGamingActiv, isTrendingActive, isSavedActive} =
      this.state
    return (
      <NxtContext.Consumer>
        {value => {
          const {isLightTheme} = value
          return (
            <SidebarPageContainer
              className="sidebar-page-container"
              lightTheme={isLightTheme}
            >
              <ul className="sidebar-link-ul-container">
                <Link
                  className="link-item"
                  to="/"
                  data-testid="home"
                  onClick={this.onHomeClick}
                >
                  <SidebarLinkListItem
                    active={isHomeActive}
                    lightTheme={isLightTheme}
                  >
                    <MdHome className="link-icons" />
                    <SidebarLinkPathPara
                      active={isHomeActive}
                      lightTheme={isLightTheme}
                    >
                      Home
                    </SidebarLinkPathPara>
                  </SidebarLinkListItem>
                </Link>
                <Link
                  to="/trending"
                  className="link-item"
                  data-testid="trending"
                  onClick={this.onTrendingClick}
                >
                  <SidebarLinkListItem
                    active={isTrendingActive}
                    lightTheme={isLightTheme}
                  >
                    <FaFire className="link-icons" />
                    <SidebarLinkPathPara
                      active={isTrendingActive}
                      lightTheme={isLightTheme}
                    >
                      Trending
                    </SidebarLinkPathPara>
                  </SidebarLinkListItem>
                </Link>
                <Link
                  className="link-item"
                  to="/gaming"
                  data-testid="gaming"
                  onClick={this.onGamingClick}
                >
                  <SidebarLinkListItem
                    active={isGamingActiv}
                    lightTheme={isLightTheme}
                  >
                    <SiYoutubegaming className="link-icons" />
                    <SidebarLinkPathPara
                      active={isGamingActiv}
                      lightTheme={isLightTheme}
                    >
                      Gaming
                    </SidebarLinkPathPara>
                  </SidebarLinkListItem>
                </Link>
                <Link
                  className="link-item"
                  onClick={this.onSavedClick}
                  to="/saved-videos"
                  data-testid="savedVideos"
                >
                  <SidebarLinkListItem
                    active={isSavedActive}
                    lightTheme={isLightTheme}
                  >
                    <CgPlayListAdd className="link-icons" />
                    <SidebarLinkPathPara
                      active={isSavedActive}
                      lightTheme={isLightTheme}
                    >
                      Saved videos
                    </SidebarLinkPathPara>
                  </SidebarLinkListItem>
                </Link>
              </ul>
              <SidebarBottomContainer lightTheme={isLightTheme}>
                <SidebarbottomText lightTheme={isLightTheme}>
                  CONTACT US
                </SidebarbottomText>
                <div className="logo-container">
                  <img
                    className="sidebar-logo"
                    alt="facebook logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  />
                  <img
                    className="sidebar-logo"
                    alt="twitter logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  />
                  <img
                    className="sidebar-logo"
                    alt="linked in logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  />
                </div>
                <SidebarbottomText lightTheme={isLightTheme}>
                  Enjoy! Now to see your channels and recommendations!
                </SidebarbottomText>
              </SidebarBottomContainer>
            </SidebarPageContainer>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Sidebar
