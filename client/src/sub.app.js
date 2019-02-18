import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './components/header/header'
import SimpleHeader from './containers/wizard/header'
import Sidebar from './components/sidebar/sidebar'
import auth from './utility/auth.service'
import { browserHistory } from 'react-router'
import $ from 'jquery'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      path: '/'
    }
  }

  componentDidMount () {
    this.unlisten = browserHistory.listen(location => {
      this.setState({path: location.pathname})
      if (!this.isWizardOrLogin(location.pathname)) {
        /* eslint-disable */
        if ($('#sidebarDiv')) {
          $('#sidebarDiv').removeClass('hideSideBar')
        }
        if ($('#headerDiv')) {
          $('#headerDiv').removeClass('hideHeader')
        }
        /* eslint-enable */
      }
    })
  }
  componentWillUnmount () {
    this.unlisten()
  }

  isWizardOrLogin (path) {
    if (path === '/addPageWizard' || path === '/inviteUsingLinkWizard' || path === '/greetingTextWizard' ||
        path === '/welcomeMessageWizard' || path === '/autopostingWizard' || path === '/menuWizard' ||
        path === '/responseMethods' || path === '/paymentMethodsWizard' || path === '/finish' ||
        path === '/resendVerificationEmail' || path === '/connectFb' || path === '/addfbpages') {
      return true
    }
    return false
  }
  render () {
    return (
      <div>
        { auth.loggedIn() && ['/addfbpages'].indexOf(this.state.path) === -1
           ? <div>
             <Header />
             <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
               <Sidebar />
               { this.props.children }
             </div>
           </div>
           : ['/addfbpages'].indexOf(this.state.path) > -1
           ? <div>
             <SimpleHeader />
             <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
               { this.props.children }
             </div>
           </div>
           : <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
             { this.props.children }
           </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default connect()(App)
