import {
  FailureViewHeading,
  FailureViewPara,
  FailureViewButton,
} from '../Styling/StyleComponents'
import './index.css'

const ApiFailure = props => {
  const {isLightTheme, onRetry} = props
  const failureUrl = isLightTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
  const onRetryClick = () => {
    onRetry()
  }
  return (
    <div className="failure-conatiner">
      <img className="failure view" alt="failure view" src={failureUrl} />
      <div className="failure-text-container">
        <FailureViewHeading lightTheme={isLightTheme}>
          Oops! Something Went Wrong
        </FailureViewHeading>
        <FailureViewPara lightTheme={isLightTheme}>
          We are having some trouble to complete your request. Please try again.
        </FailureViewPara>
        <FailureViewButton onClick={onRetryClick}>Retry</FailureViewButton>
      </div>
    </div>
  )
}

export default ApiFailure
