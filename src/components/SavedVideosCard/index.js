import {Link} from 'react-router-dom'
import {VideoCardTitle, VidoeCardPara} from '../Styling/StyleComponents'
import './index.css'

const SavedVideosCard = props => {
  const {details, isLightTheme} = props
  const {id, title, thumbnailUrl, publishedAt, viewCount, channelName} = details
  return (
    <Link className="saved-videos-link-container" to={`/videos/${id}`}>
      <li className="saved-videos-li-container">
        <img
          className="thumbnail-image"
          alt="video thumbnail"
          src={thumbnailUrl}
        />
        <div className="saved-videos-text-container">
          <VideoCardTitle lightTheme={isLightTheme}>{title}</VideoCardTitle>
          <VidoeCardPara lightTheme={isLightTheme}>{channelName}</VidoeCardPara>
          <div className="view-date-saved-container">
            <VidoeCardPara lightTheme={isLightTheme}>
              {viewCount} views
            </VidoeCardPara>
            <ul>
              <li>
                <VidoeCardPara lightTheme={isLightTheme}>
                  {publishedAt}
                </VidoeCardPara>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SavedVideosCard
