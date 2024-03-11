import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtContext from '../Context/ReactContext'
import ApiFailure from '../ApiFailure'
import SavedVideosCard from '../SavedVideosCard'
import {
  SavedVideosMainContainer,
  HighLightingHeader,
  HighLightingHeaderHeading,
} from '../Styling/StyleComponents'
import './index.css'

class Trending extends Component {
  state = {isApiSuccess: true, trendingData: [], isLoading: true}

  componentDidMount() {
    this.gettingTrendingVideos()
  }

  onRetry = () => {
    this.gettingTrendingVideos()
  }

  gettingTrendingVideos = async () => {
    const token = Cookies.get('jwt_token')
    const trendingVideosApiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(trendingVideosApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedDate = data.videos.map(eachOne => ({
        id: eachOne.id,
        title: eachOne.title,
        thumbnailUrl: eachOne.thumbnail_url,
        channelName: eachOne.channel.name,
        channelProfileImgUrl: eachOne.channel.profile_image_url,
        viewCout: eachOne.view_count,
        publishedAt: eachOne.published_at,
      }))
      this.setState({
        isLoading: false,
        isApiSuccess: true,
        trendingData: updatedDate,
      })
    } else {
      this.setState({isLoading: false, isApiSuccess: false})
    }
  }

  renderHighletingHeader = isLightTheme => (
    <HighLightingHeader lightTheme={isLightTheme}>
      <div className="highlet-header-icon">
        <FaFire className="icon" />
      </div>
      <HighLightingHeaderHeading lightTheme={isLightTheme}>
        Trending
      </HighLightingHeaderHeading>
    </HighLightingHeader>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderApiSuccessView = isLightTheme => {
    const {trendingData} = this.state
    return (
      <ul className="trending-ul-container">
        {trendingData.map(eachOne => (
          <SavedVideosCard
            isLightTheme={isLightTheme}
            details={eachOne}
            key={eachOne.id}
          />
        ))}
      </ul>
    )
  }

  renderTrendingVideos = isLightTheme => {
    const {isApiSuccess} = this.state
    return !isApiSuccess ? (
      <ApiFailure isLightTheme={isLightTheme} onRetry={this.onRetry} />
    ) : (
      this.renderApiSuccessView(isLightTheme)
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
              <div className="Sidebar-trending-container">
                <Sidebar />
                <SavedVideosMainContainer
                  data-testid="trending"
                  lightTheme={isLightTheme}
                >
                  {this.renderHighletingHeader(isLightTheme)}
                  {isLoading
                    ? this.renderLoader()
                    : this.renderTrendingVideos(isLightTheme)}
                </SavedVideosMainContainer>
              </div>
            </div>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Trending
