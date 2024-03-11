import React from 'react'

const NxtContext = React.createContext({
  isLightTheme: true,
  changingTheme: () => {},
  savedList: [],
  addingSavedList: () => {},
  removingSavedList: () => {},
})

export default NxtContext
