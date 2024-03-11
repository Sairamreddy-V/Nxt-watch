import NxtContext from '../Context/ReactContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {
  NotFoundMainContainer,
  NotFoundheading,
  NotFoundPara,
} from '../Styling/StyleComponents'
import './index.css'

const NotFound = () => (
  <NxtContext.Consumer>
    {value => {
      const {isLightTheme} = value
      const imageUrl = isLightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <div>
          <Header />
          <div className="sidebar-page-container">
            <Sidebar />
            <NotFoundMainContainer
              data-testid="not found"
              lightTheme={isLightTheme}
            >
              <div>
                <img
                  className="notfound-image"
                  alt="not found"
                  src={imageUrl}
                />
                <NotFoundheading lightTheme={isLightTheme}>
                  Page Not Found
                </NotFoundheading>
                <NotFoundPara lightTheme={isLightTheme}>
                  we are sorry, the page you requested could not be found.
                </NotFoundPara>
              </div>
            </NotFoundMainContainer>
          </div>
        </div>
      )
    }}
  </NxtContext.Consumer>
)

export default NotFound
