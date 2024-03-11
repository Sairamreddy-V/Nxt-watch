import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import VideoDetails from './components/VideoDetails'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import NotFound from './components/NotFound'
import Gaming from './components/Gaming'
import NxtContext from './components/Context/ReactContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {themeLight: true, savedList: []}

  OnChangeTheme = () => {
    this.setState(prevState => ({themeLight: !prevState.themeLight}))
  }

  onAddVideoToList = videoDate => {
    this.setState(prevState => ({
      savedList: [...prevState.savedList, videoDate],
    }))
  }

  onDeleteVideoToList = videoDate => {
    const {savedList} = this.state
    const filteredResult = savedList.filter(
      eachOne => eachOne.id !== videoDate.id,
    )
    this.setState({savedList: filteredResult})
  }

  render() {
    const {themeLight, savedList} = this.state
    console.log(savedList)
    return (
      <NxtContext.Provider
        value={{
          isLightTheme: themeLight,
          changingTheme: this.OnChangeTheme,
          savedList,
          addingSavedList: this.onAddVideoToList,
          removingSavedList: this.onDeleteVideoToList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <Route component={NotFound} />
        </Switch>
      </NxtContext.Provider>
    )
  }
}

export default App
