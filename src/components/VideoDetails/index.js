import {Component, React} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import NxtContext from '../Context/ReactContext'
import {
  VideoDetailsMainContainer,
  VideoDetailsTitle,
  VideoDetailsLikesAndViewContainer,
  VideoDetailsActiveIconsConatiner,
  VideoDetailsActiveIconsSaveConatiner,
  LikeButton,
  SaveButton
} from '../Styling/StyleComponents'
import ApiFailure from '../ApiFailure'
import Header from '../Header'
import Sidebar from '../Sidebar'
import './index.css'

class VideoDetails extends Component {
  state = {
    isLiked: false,
    isDisliked: false,
    isSaved: false,
    isApiSuccess: true,
    isLoading: true,
    videoDate: {},
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getVideoDetails(id)
  }

  onRetry = () => {
    this.getVideoDetails()
  }

  onLikeClick = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onDisLikeClick = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  savedListCheck = () => (
    <NxtContext.Consumer>
      {value => {
        const {savedList} = value
        const {videoDate} = this.state
        console.log(videoDate)
        return this.setState({isApiSuccess: false})
      }}
    </NxtContext.Consumer>
  )

  getVideoDetails = async id => {
    const token = Cookies.get('jwt_token')
    const videoItemDetailsApiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(videoItemDetailsApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channelName: data.video_details.channel.name,
        channelProfileImageUrl: data.video_details.channel.profile_image_url,
        channelSubCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState(
        {
          isLoading: false,
          isApiSuccess: true,
          videoDate: updatedData,
        },
        this.savedListCheck,
      )
    } else {
      this.setState({isLoading: false, isApiSuccess: false})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderVideoDetails = isLightTheme => {
    const {isApiSuccess} = this.state
    return isApiSuccess === false ? (
      <ApiFailure onRetry={this.onRetry} isLightTheme={isLightTheme} />
    ) : (
      this.apiSuccessView(isLightTheme)
    )
  }

  apiSuccessView = isLightTheme => {
    let savetext = 'Save'
    const {isLiked, isDisliked, videoDate, isSaved} = this.state
    if (isSaved === true) {
      savetext = 'Saved'
    } else {
      savetext = 'Save'
    }
    const {
      videoUrl,
      id,
      title,
      viewCount,
      publishedAt,
      channelProfileImageUrl,
      channelSubCount,
      description,
    } = videoDate

    return (
      <NxtContext.Consumer>
        {value => {
          const {savedList, addingSavedList, removingSavedList} = value

          if (savedList.length !== 0) {
            const result = savedList.filter(eachOne => eachOne.id === id)
            if (result.length === 1) {
              savetext = 'Saved'
            }
          }

          this.onSaveClick = () => {
            if (savetext === 'Saved') {
              this.setState(
                prevState => ({isSaved: false}),
                () => {
                  const {isSaved, videoDate} = this.state
                  if (isSaved === true) {
                    savetext = 'Saved'
                  } else {
                    savetext = 'Save'
                  }
                  if (savetext === 'Saved') {
                    addingSavedList(videoDate)
                  } else {
                    removingSavedList(videoDate)
                  }
                },
              )
            } else {
              this.setState(
                prevState => ({isSaved: true}),
                () => {
                  const {isSaved, videoDate} = this.state
                  if (isSaved === true) {
                    savetext = 'Saved'
                  } else {
                    savetext = 'Save'
                  }
                  console.log(savetext)
                  if (savetext === 'Saved') {
                    addingSavedList(videoDate)
                  } else {
                    removingSavedList(videoDate)
                  }
                },
              )
            }
          }

          return (
            <div>
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="500px"
                controls="false"
                muted="true"
                loop="true"
              />
              <div>
                <VideoDetailsTitle lightTheme={isLightTheme}>
                  {title}
                </VideoDetailsTitle>
                <VideoDetailsLikesAndViewContainer lightTheme={isLightTheme}>
                  <div className="views-pub-container">
                    <p className="views-text">{viewCount} views</p>
                    <p>{publishedAt}</p>
                  </div>
                  <div className="icons-container">
                    <VideoDetailsActiveIconsConatiner
                      lightTheme={isLightTheme}
                      active={isLiked}
                      onClick={this.onLikeClick}
                    >
                      <AiOutlineLike />
                      <LikeButton active={isLiked}> Like</LikeButton>
                    </VideoDetailsActiveIconsConatiner>
                    <VideoDetailsActiveIconsConatiner
                      lightTheme={isLightTheme}
                      active={isDisliked}
                      onClick={this.onDisLikeClick}
                    >
                      <BiDislike />
                      <LikeButton active={isDisliked}> Dislike</LikeButton>
                    </VideoDetailsActiveIconsConatiner>
                    <VideoDetailsActiveIconsSaveConatiner
                      lightTheme={isLightTheme}
                      isSaved={savetext}
                      onClick={this.onSaveClick}
                    >
                      <MdPlaylistAdd />
                      <SaveButton isSaved={savetext}> {savetext}</SaveButton>
                    </VideoDetailsActiveIconsSaveConatiner>
                  </div>
                </VideoDetailsLikesAndViewContainer>
                <hr className="videodetailsHrline" />
                <div className="video-details-profile-description-container">
                  <img
                    className="profile-url"
                    alt="channelProfile"
                    src={channelProfileImageUrl}
                  />
                  <div>
                    <VideoDetailsTitle lightTheme={isLightTheme}>
                      {channelProfileImageUrl}
                    </VideoDetailsTitle>
                    <p className="card-para">{channelSubCount} subscibers</p>
                    <VideoDetailsTitle lightTheme={isLightTheme}>
                      {description}
                    </VideoDetailsTitle>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </NxtContext.Consumer>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <NxtContext.Consumer>
        {value => {
          const {isLightTheme} = value
          return (
            <>
              <Header />
              <div className="videoDetetails-container">
                <Sidebar />
                <VideoDetailsMainContainer
                  data-testid="videoItemDetails"
                  lightTheme={isLightTheme}
                >
                  {isLoading
                    ? this.renderLoader()
                    : this.renderVideoDetails(isLightTheme)}
                </VideoDetailsMainContainer>
              </div>
            </>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default VideoDetails
