import {FaFire} from 'react-icons/fa'
import NxtContext from '../Context/ReactContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedVideosCard from '../SavedVideosCard'
import {
  SavedVideosMainContainer,
  NoSavedVideosHeading,
  NoSavedVideosPara,
  HighLightingHeader,
  HighLightingHeaderHeading,
} from '../Styling/StyleComponents'
import './index.css'

const SavedVideos = () => (
  <NxtContext.Consumer>
    {value => {
      const {savedList, isLightTheme} = value
      let isNoVideos = false
      if (savedList.length === 0) {
        isNoVideos = true
      }

      const renderNoVideosView = () => (
        <div className="no-videos-container">
          <img
            className="noSaved-img"
            alt="no saved videos"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
          />
          <NoSavedVideosHeading lightTheme={isLightTheme}>
            No saved videos found
          </NoSavedVideosHeading>
          <NoSavedVideosPara lightTheme={isLightTheme}>
            You can save your videos while watching them
          </NoSavedVideosPara>
        </div>
      )

      const renderVideos = () => (
        <ul className="ul-container-saved-videos">
          {savedList.map(eachOne => (
            <SavedVideosCard
              isLightTheme={isLightTheme}
              details={eachOne}
              key={eachOne.id}
            />
          ))}
        </ul>
      )

      const renderHighletingHeader = () => (
        <HighLightingHeader lightTheme={isLightTheme}>
          <div className="highlet-header-icon">
            <FaFire className="icon" />
          </div>
          <HighLightingHeaderHeading lightTheme={isLightTheme}>
            Saved Videos
          </HighLightingHeaderHeading>
        </HighLightingHeader>
      )

      return (
        <div>
          <Header />
          <div className="saved-videos-nav-botttom-container">
            <Sidebar />
            <SavedVideosMainContainer
              lightTheme={isLightTheme}
              data-testid="savedVideos"
            >
              {' '}
              {renderHighletingHeader()}
              {isNoVideos ? renderNoVideosView() : renderVideos()}
            </SavedVideosMainContainer>
          </div>
        </div>
      )
    }}
  </NxtContext.Consumer>
)

export default SavedVideos
