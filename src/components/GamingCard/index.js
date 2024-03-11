import {Link} from 'react-router-dom'
import {GamingVideoHeading, GamingVideoPara} from '../Styling/StyleComponents'
import './index.css'

const GamingCard = props => {
  const {details, isLightTheme} = props
  const {thumbnailUrl, id, title, viewCount} = details
  return (
    <Link className="gaming-link-item" to={`/videos/${id}`}>
      <li className="gaming-li-container">
        <img className="gameimage" alt="video thumbnail" src={thumbnailUrl} />
        <GamingVideoHeading lightTheme={isLightTheme}>
          {title}
        </GamingVideoHeading>
        <GamingVideoPara lightTheme={isLightTheme}>
          {viewCount} Watching Worldwide
        </GamingVideoPara>
      </li>
    </Link>
  )
}

export default GamingCard
