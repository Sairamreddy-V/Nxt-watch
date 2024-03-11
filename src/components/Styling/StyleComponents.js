import style from 'styled-components'

export const HeaderNavContainer = style.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props =>
    props.lightTheme === true ? '#ffffff' : '#383838'};
  padding: 0px 40px 0px 40px;
`
export const HeaderTriggerButton = style.button`
  @media(max-width:767px){
    display:none;
  }
  font-size: 14px;
  padding: 5px;
  color:${props => (props.lightTheme === true ? ' #3b82f6' : '#ffffff')};
  background-color:transparent;
  border:2px solid ${props =>
    props.lightTheme === true ? ' #3b82f6' : '#ffffff'}; 
  cursor:pointer;
`

export const HeaderThemeButton = style.button`
  margin-right:10px;
  cursor:pointer;
  border:none;
  background-color:transparent;
`
export const HeaderPopupContainer = style.div`
  background-color:${props =>
    props.lightTheme === true ? '#ffffff' : '#383838'};
  border-radius:10px;
  height:110px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding:10px;
  color:${props => (props.lightTheme === true ? '#000000' : '#ffffff')};
  align-items:center;
  box-shadow:1px 1px 1px 1px ${props =>
    props.lightTheme === true ? '#d7dfe9' : '#606060'}
`
export const HeaderPopupButton = style.button`
  background-color:${props => (props.outline ? 'transparent' : '#3b82f6')};
  color:${props => (props.outline ? '#94a3b8' : '#ffffff')};
  border: ${props => (props.outline ? '2px solid #94a3b8' : 'none')};
  border-radius:7px;
  padding:7px;
  margin-right:10px;
  cursor:pointer;
`
export const LoginPageContainer = style.div`
  background-color:${props =>
    props.lightTheme === true ? '#ffffff' : '#000000'};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
export const LoginFormContainer = style.form`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  color: #000000;
  box-shadow: 1px 1px 1px 1px ${props =>
    props.lightTheme === true ? '#909090' : '#383838'};
  background-color:${props =>
    props.lightTheme === true ? '#ffffff' : '#383838'};
`
export const LoginCheckBoxLabel = style.label`
  color:${props => (props.lightTheme === true ? '#000000' : '#ffffff')};
  font-size: 13px;
`
export const LoginInputContainer = style.div`
  margin-bottom:20px;
  font-size:20px;
  display:flex;
  flex-direction:column;
`
export const LoginInput = style.input`
  border:2px solid ${props =>
    props.lightTheme === true ? '#475569' : '#d7dfe9'};
  color:${props => (props.lightTheme === true ? '#000000' : '#ffffff')};
  padding:5px;
  background-color:transparent;
`
export const LoginInputLabel = style.label`
  color:${props => (props.lightTheme === true ? '#475569' : '#d7dfe9')};
  font-size:14px;
`
export const SidebarPageContainer = style.nav`
  background-color:${props =>
    props.lightTheme === true ? '#ffffff' : '#383838'};
  width:200px;
  @media(min-width:768px){
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  @media(max-width:767px){
    display:none;
  }
  flex-shrink:0;
  min-height:100vh;
  padding-right:7px;
`
export const SidebarLinkListItem = style.li`
  	background-color:${props => (props.active === true ? ' #cbd5e1' : 'none')};
    color:${props =>
      props.lightTheme === true
        ? props.active === true
          ? '#ff0b37'
          : '#7e858e'
        : props.active === true
        ? '#ff0b37'
        : '#cccccc'};
    margin-bottom:10px;
    display:flex;
    align-items:center;
    width:100%;
    border-radius:10px;
`
export const SidebarLinkPathPara = style.p`
  color:${props =>
    props.lightTheme === true
      ? props.active === true
        ? '#0000000'
        : '#7e858e'
      : props.active === true
      ? '#000000'
      : '#cccccc'};
  font-size:16px;
  font-weight:bold;
`
export const SidebarBottomContainer = style.div`
  color:${props => (props.lightTheme === true ? '#0000000' : '#ffffff')};
  display:flex;
  flex-direction:column;
  padding-left:15px;
`
export const SidebarbottomText = style.p`
  color:${props => (props.lightTheme === true ? '#000000' : '#ffffff')};
`
export const HomeBannerConatainer = style.div`
  background-image:url("https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png ");
  background-size:cover;
  display:flex;
  flex-direction:row;
  padding-left:20px;
  justify-content:space-between;
  height:250px;
`
export const HomeBannerMainConatainer = style.div`
  display:${props => props.remove === true && 'none'};
  width:100%;
  margin-bottom:15px;
`
export const HomeVideoMainPage = style.div`
  background-color:${props =>
    props.lightTheme === true ? '#f9f9f9' : '#181818'};
  padding:10px;
  width:100%;
`
export const HomeSearchInput = style.input`
  border:1px solid ${props =>
    props.lightTheme === true ? '#606060' : '#cccccc'};
  background-color:transparent;
  height:30px;
  width:100%;
  color:${props => (props.lightTheme === true ? '#313131' : ' #d7dfe9')}
`
export const HomeSearchButton = style.button`
  border:1px solid ${props =>
    props.lightTheme === true ? '#606060' : '#cccccc'};
  background-color:${props =>
    props.lightTheme === true ? '#909090' : '#7e858e'};
  height:30px;
  color:${props => (props.lightTheme === true ? '#ffffff' : '#ffffff')};
  cursor:pointer;
`
export const FailureViewHeading = style.h1`
  color:${props => (props.lightTheme === true ? '#000000' : '#ffffff')};
  font-size:28px;
  margin-bottom:10px;
`
export const FailureViewPara = style.p`
  color:${props => (props.lightTheme === true ? '#7e858e' : '#cccccc')};
  font-size:14px;
  margin-bottom:5px;
`
export const FailureViewButton = style.button`
  background-color: #00306e;
  color:#ffffff;
  padding:8px;
  border-radius:9px;
  border:none;
  align-self:center;
  font-weight:800;
  cursor:pointer;
`
export const VideoCardTitle = style.p`
  color:${props => (props.lightTheme === true ? '#383838' : '#d7dfe9')};
  font-size:22px;
`
export const VidoeCardPara = style.p`
  color:${props => (props.lightTheme === true ? '#606060' : '#94a3b8')};
  font-size:12px;
`
export const VideoDetailsMainContainer = style.div`
  background-color:${props =>
    props.lightTheme === true ? '#f9f9f9' : '#0f0f0f '};
  padding:10px;
  width:100%;
`
export const LikeButton = style.button`
  color:${props => (props.active === true ? '#2563eb' : '#64748b')};
  background-color:transparent;
  border:none;
  cursor:pointer;
`
export const SaveButton = style.button`
  color:${props => (props.isSaved === 'Saved' ? '#2563eb' : '#64748b')};
  background-color:transparent;
  border:none;
  cursor:pointer;
`

export const VideoDetailsTitle = style.p`
  color:${props => (props.lightTheme === true ? '#000000' : '#ffffff')};
  font-size:14px;
  margin-bottom:10px;
  font-weight:500;
`
export const VideoDetailsLikesAndViewContainer = style.div`
  color:${props => (props.lightTheme === true ? '#424242' : '#d7dfe9')};
  display:flex;
  justify-content:space-between;
`
export const VideoDetailsActiveIconsConatiner = style.button`
  color:${props => (props.active === true ? '#2563eb' : '#64748b')};
  margin-right:5px;
  display:flex;
  align-items:center;
  font-size:14px;
  border:none;
  cursor:pointer;
  background-color:transparent;
`
export const VideoDetailsActiveIconsSaveConatiner = style.button`
  color:${props => (props.isSaved === 'Saved' ? '#2563eb' : '#64748b')};
  margin-right:5px;
  display:flex;
  align-items:center;
  font-size:14px;
  border:none;
  cursor:pointer;
  background-color:transparent;
`
export const SavedVideosMainContainer = style.div`
  background-color:${props =>
    props.lightTheme === true ? '#f9f9f9' : '#0f0f0f'};
  width:100%;
`
export const NoSavedVideosHeading = style.h1`
  color:${props => (props.lightTheme === true ? '#000000' : '#ffffff')};
  font-size:28px;
  font-weight:800;
  margin-bottom:10px;
`
export const NoSavedVideosPara = style.p`
  color:${props => (props.lightTheme === true ? '#424242' : '#909090')};
  font-size:22px;
  margin-bottom:10px;
`
export const HighLightingHeader = style.div`
  background-color:${props =>
    props.lightTheme === true ? '#f9f9f9' : '#0f0f0f'};
  padding:10px;
  margin-bottom:15px;
  display:flex;
  flex-direction:row;
  align-items:center;
  border-bottom:1px solid ${props =>
    props.lightTheme === true ? '#cbd5e1' : '#606060'} ;
`
export const HighLightingHeaderHeading = style.h1`
  color:${props => (props.lightTheme === true ? '#313131' : '#d7dfe9')};
  font-size:32px;
  font-weight:bold;
`
export const TrendingVideosContainer = style.div`
  background-color:${props =>
    props.lightTheme === true ? '#f9f9f9' : '#0f0f0f'};
  width:100%;
`
export const GamingVideoHeading = style.p`
  color:${props => (props.lightTheme === true ? '#000000' : '#ffffff')};
  font-size:16px;
  margin-bottom:2px;
`
export const GamingVideoPara = style.p`
  color:${props => (props.lightTheme === true ? '#475569' : '#cbd5e1')};
  font-size:13px;
`
export const NotFoundMainContainer = style.div`
  background-color:${props =>
    props.lightTheme === true ? '#f9f9f9' : '#0f0f0f'};
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`
export const NotFoundheading = style.h1`
  color:${props => (props.lightTheme === true ? '#000000' : '#ffffff')};
  font-size:32px;
  font-weight:bold;
  margin-bottom:10px;
`
export const NotFoundPara = style.p`
  color:${props => (props.lightTheme === true ? '#1e293b' : '#94a3b8')};
  font-size:22px;
`
