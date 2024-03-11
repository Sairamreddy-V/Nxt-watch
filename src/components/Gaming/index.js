import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import NxtContext from '../Context/ReactContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingCard from '../GamingCard'
import ApiFailure from '../ApiFailure'
import {
  TrendingVideosContainer,
  HighLightingHeader,
  HighLightingHeaderHeading,
} from '../Styling/StyleComponents'
import './index.css'

class Gaming extends Component {
  state = {isLoading: true, isApiSuccess: true, gamingList: []}

  componentDidMount() {
    this.gettingGamingVideos()
  }

  onRetry = () => {
    this.gettingGamingVideos()
  }

  gettingGamingVideos = async () => {
    const token = Cookies.get('jwt_token')
    const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(gamingVideosApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedDate = data.videos.map(eachOne => ({
        id: eachOne.id,
        title: eachOne.title,
        thumbnailUrl: eachOne.thumbnail_url,
        viewCount: eachOne.view_count,
      }))
      this.setState({
        isLoading: false,
        isApiSuccess: true,
        gamingList: updatedDate,
      })
    } else {
      this.setState({isLoading: false, isApiSuccess: false})
    }
  }

  renderHighletingHeader = isLightTheme => (
    <HighLightingHeader lightTheme={isLightTheme}>
      <div className="highlet-header-icon">
        <SiYoutubegaming className="icon" />
      </div>
      <HighLightingHeaderHeading lightTheme={isLightTheme}>
        Gaming
      </HighLightingHeaderHeading>
    </HighLightingHeader>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderGamingVideos = isLightTheme => {
    const {isApiSuccess} = this.state
    return isApiSuccess ? (
      this.apiSuccessView(isLightTheme)
    ) : (
      <ApiFailure onRetry={this.onRetry} isLightTheme={isLightTheme} />
    )
  }

  apiSuccessView = isLightTheme => {
    const {gamingList} = this.state
    return (
      <ul className="ul-gaming-container">
        {gamingList.map(eachOne => (
          <GamingCard
            isLightTheme={isLightTheme}
            details={eachOne}
            key={eachOne.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <NxtContext.Consumer>
        {value => {
          const {isLightTheme} = value
          return (
            <div>
              <Header />
              <div className="gaming-sidebar-videos-container">
                <Sidebar />
                <TrendingVideosContainer
                  data-testid="gaming"
                  lightTheme={isLightTheme}
                >
                  {this.renderHighletingHeader(isLightTheme)}
                  {isLoading
                    ? this.renderLoader()
                    : this.renderGamingVideos(isLightTheme)}
                </TrendingVideosContainer>
              </div>
            </div>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Gaming
