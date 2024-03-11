import {Link} from 'react-router-dom'
import {formatDistanceToNow, format} from 'date-fns'
import NxtContext from '../Context/ReactContext'
import {VideoCardTitle} from '../Styling/StyleComponents'
import './index.css'

const Videocard = props => {
  const {details} = props
  const {
    id,
    title,
    thumbnailUrl,
    channelName,
    channelProfileImgUrl,
    viewCout,
    publishedAt,
  } = details
  return (
    <NxtContext.Consumer>
      {value => {
        const {isLightTheme} = value
        return (
          <Link className="card-link" to={`/videos/${id}`}>
            <li className="card-main-container">
              <img
                className="thumbNail-image"
                alt="video thumbnail"
                src={thumbnailUrl}
              />
              <div className="card-text-profile-container">
                <img
                  className="profile-url"
                  alt="channel logo"
                  src={channelProfileImgUrl}
                />
                <div>
                  <VideoCardTitle lightTheme={isLightTheme}>
                    {title}
                  </VideoCardTitle>
                  <p className="card-para">{channelName}</p>
                  <div className="count-published-container">
                    <p className="card-para">{viewCout} views</p>
                    <ul>
                      <li>
                        <p className="card-para">{publishedAt}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </NxtContext.Consumer>
  )
}

export default Videocard
