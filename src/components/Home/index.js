import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {ImCross} from 'react-icons/im'
import {FaSearch} from 'react-icons/fa'
import NxtContext from '../Context/ReactContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ApiFailure from '../ApiFailure'
import VideoCard from '../VideoCard'
import {
  HomeBannerConatainer,
  HomeBannerMainConatainer,
  HomeVideoMainPage,
  HomeSearchInput,
  HomeSearchButton,
  FailureViewHeading,
  FailureViewPara,
  FailureViewButton,
} from '../Styling/StyleComponents'
import './index.css'

class Home extends Component {
  state = {
    search: '',
    isApiSuccess: true,
    videosList: [],
    isLoading: true,
    isBannerDelete: false,
  }

  componentDidMount() {
    this.gettingVideosList()
  }

  gettingVideosList = async () => {
    const {search} = this.state
    const token = Cookies.get('jwt_token')
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(homeVideosApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.homeVideoApiSuccess(data)
    } else {
      this.homeVideoApiFailure()
    }
  }

  homeVideoApiSuccess = data => {
    const updatedData = data.videos.map(eachOne => ({
      id: eachOne.id,
      title: eachOne.title,
      thumbnailUrl: eachOne.thumbnail_url,
      channelName: eachOne.channel.name,
      channelProfileImgUrl: eachOne.channel.profile_image_url,
      viewCout: eachOne.view_count,
      publishedAt: eachOne.published_at,
    }))
    this.setState({
      isApiSuccess: true,
      videosList: updatedData,
      isLoading: false,
    })
  }

  homeVideoApiFailure = () => {
    this.setState({isApiSuccess: false, isLoading: false})
  }

  onBannerCrossClick = () => {
    this.setState({isBannerDelete: true})
  }

  onSearchChange = event => {
    this.setState({search: event.target.value})
  }

  onSearchButton = () => {
    this.gettingVideosList()
  }

  onRetry = () => {
    this.setState({search: ''}, this.gettingVideosList)
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderBanner = () => {
    const {isBannerDelete} = this.state
    return (
      <HomeBannerMainConatainer data-testid="banner" remove={isBannerDelete}>
        <HomeBannerConatainer data-testid="banner">
          <div className="banner-text-container">
            <img
              alt="nxt watch logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            />
            <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
            <button>GET IT NOW</button>
          </div>
          <button
            className="banner-cross"
            type="button"
            data-testid="close"
            onClick={this.onBannerCrossClick}
          >
            <ImCross aria-label="close" />
          </button>
        </HomeBannerConatainer>
      </HomeBannerMainConatainer>
    )
  }

  renderVideos = isLightTheme => {
    const {isApiSuccess, search} = this.state
    return (
      <div>
        {this.renderBanner()}
        <div className="search-container">
          <HomeSearchInput
            lightTheme={isLightTheme}
            type="search"
            value={search}
            onChange={this.onSearchChange}
          />
          <HomeSearchButton
            data-testid="searchButton"
            onClick={this.onSearchButton}
            lightTheme={isLightTheme}
          >
            <FaSearch className="search-icon" aria-label="search" />
          </HomeSearchButton>
        </div>
        {isApiSuccess
          ? this.renderApiSuccessView(isLightTheme)
          : this.renderApiFailureView(isLightTheme)}
      </div>
    )
  }

  renderApiFailureView = isLightTheme => (
    <ApiFailure onRetry={this.onRetry} isLightTheme={isLightTheme} />
  )

  renderApiSuccessView = isLightTheme => {
    let noVideos = false
    const {videosList} = this.state
    if (videosList.length === 0) {
      noVideos = true
    }
    return noVideos ? (
      this.noVideosView(isLightTheme)
    ) : (
      <ul className="video-ul-container">
        {videosList.map(eachOne => (
          <VideoCard details={eachOne} key={eachOne.id} />
        ))}
      </ul>
    )
  }

  noVideosView = isLightTheme => (
    <div className="novideos-main-container">
      <div className="novideos-container">
        <img
          className="no-result-img"
          alt="no videos"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        />
        <FailureViewHeading lightTheme={isLightTheme}>
          No Search results found
        </FailureViewHeading>
        <FailureViewPara lightTheme={isLightTheme}>
          Try different key words or remove search filter
        </FailureViewPara>
        <FailureViewButton onClick={this.onRetry}>Retry</FailureViewButton>
      </div>
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <NxtContext.Consumer>
        {value => {
          const {isLightTheme} = value
          return (
            <div>
              <Header />
              <div className="home-main-conatiner">
                <Sidebar />
                <HomeVideoMainPage data-testid="home" lightTheme={isLightTheme}>
                  {isLoading
                    ? this.renderLoader()
                    : this.renderVideos(isLightTheme)}
                </HomeVideoMainPage>
              </div>
            </div>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Home
