/* eslint-disable camelcase */
/**
 * Created by sojharo on 20/07/2017.
 */

import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getuserdetails, getAutomatedOptions } from '../../redux/actions/basicinfo.actions'
import { bindActionCreators } from 'redux'
import { fetchSessions, fetchSingleSession, fetchUserChats, resetSocket } from '../../redux/actions/livechat.actions'

class Sidebar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isShowingModal: false,
      activeSession: '',
      currentProfile: {},
      loading: true,
      ignore: true,
      dashboard: true,
      broadcasts: false,
      surveys: false,
      polls: false,
      livechat: false,
      autoposting: false,
      persistentMenu: true,
      pages: true,
      subscribers: true,
      subscribeToMessenger: true,
      messengerLink: true,
      phoneNumber: true,
      settings: true,
      userGuide: true,
      inviteMembers: true,
      members: true,
      welcomeMessage: true,
      segmentSubscribers: true,
      commentCapture: true,
      landingPages: true,
      messengerRefURL: true,
      messageUs: true,
      messengerCode: true,
      smartReplies: false,
      templates: false,
      sequenceMessaging: false,
      waitingResponse: false,
      isKiboChat: false,
      messengerAds: true
    }
    this.openUserGuide = this.openUserGuide.bind(this)
    this.closeUserGuide = this.closeUserGuide.bind(this)
  }
  componentWillMount () {
    let url = window.location.hostname
    console.log('url', url)
    if (url === 'skibochat.cloudkibo.com' || url === 'kibochat.cloudkibo.com') {
      console.log('kibochat')
      this.setState({livechat: true, smartReplies: true, waitingResponse: true, broadcasts: false, polls: false, surveys: false, sequenceMessaging: false, templates: false, autoposting: false, isKiboChat: true})
    } else if (url === 'skiboengage.cloudkibo.com' || url === 'kiboengage.cloudkibo.com') {
      console.log('kiboEngage')
      this.setState({ broadcasts: true, polls: true, surveys: true, sequenceMessaging: true, templates: true, autoposting: true, livechat: false, smartReplies: false, waitingResponse: false })
    } else if (url === 'staging.kibopush.com') {
      console.log('staging')
      this.setState({broadcasts: true, polls: true, surveys: true, sequenceMessaging: true, templates: true, autoposting: true, livechat: true, smartReplies: true, waitingResponse: true})
    } else if (url.includes('localhost')) {
      console.log('localhost')
      this.setState({broadcasts: true, polls: true, surveys: true, sequenceMessaging: true, templates: true, autoposting: true, livechat: true, smartReplies: true, waitingResponse: true})
    }
    this.props.getuserdetails()
    this.props.getAutomatedOptions()
  }

  openUserGuide () {
    this.setState({isShowingModal: true})
  }

  closeUserGuide () {
    this.setState({isShowingModal: false})
  }

  componentWillReceiveProps (nextProps) {
    console.log('nextProps in sidebar', nextProps)

   /* if (nextProps.user) {
      this.setState({broadcasts: nextProps.user.uiMode.broadcasts,
        polls: nextProps.user.uiMode.polls,
        surveys: nextProps.user.uiMode.surveys,
        sequenceMessaging: nextProps.user.uiMode.sequenceMessaging,
        templates: nextProps.user.uiMode.templates,
        livechat: nextProps.user.uiMode.livechat,
        smartReplies: nextProps.user.uiMode.smartReplies,
        abandonedCarts: nextProps.user.uiMode.abandonedCarts,
        subscribers: nextProps.user.uiMode.subscribers,
        segmentSubscribers: nextProps.user.uiMode.segmentSubscribers,
        autoposting: nextProps.user.uiMode.autoposting,
        persistentMenu: nextProps.user.uiMode.persistentMenu,
        pages: nextProps.user.uiMode.pages,
        phoneNumber: nextProps.user.uiMode.phoneNumber,
        inviteMembers: nextProps.user.uiMode.inviteMembers,
        members: nextProps.user.uiMode.members,
        welcomeMessage: nextProps.user.uiMode.welcomeMessage,
        commentCapture: nextProps.user.uiMode.commentCapture})
    }   */
  }

  showAbandonedCarts () {
    if (this.props.user && this.props.user.advancedMode) {
      // include user persmissions
      return (
        <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
          <Link to='/abandonedCarts' className='m-menu__link m-menu__toggle'>
            <i className='m-menu__link-icon flaticon-comment' title='Comment Capture' />
            <span className='m-menu__link-text'>Abandoned Carts</span>
          </Link>
        </li>
      )
    } else {
      return (null)
    }
  }

  showOperationalDashboard () {
    if (this.props.user) {
      if (this.props.user.isSuperUser) {
        return (
          <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
            <Link to='/operationalDashboard' className='m-menu__link m-menu__toggle'>
              <i className='m-menu__link-icon flaticon-statistics' title='Operational Dashboard' />
              <span className='m-menu__link-text'>Operational Dashboard</span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showDashboard () {
    if (this.props.user) {
      if (this.props.user.permissions.dashboardPermission && this.props.user.plan.dashboard) {
        return (
          <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
            <Link to='/dashboard' className='m-menu__link m-menu__toggle'>
              <i className='m-menu__link-icon flaticon-squares-4' title='Dashboard' />
              <span className='m-menu__link-text'>Dashboard</span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showSubscribersItem () {
    if (this.props.user) {
      if (this.state.subscribers && this.props.user.permissions.subscriberPermission && this.props.user.plan.manage_subscribers) {
        return (
          <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
            <Link to='/subscribers' className='m-menu__link m-menu__toggle'>
              <i className='m-menu__link-icon flaticon-user-ok' title='Subscribers' />
              <span className='m-menu__link-text'>Subscribers</span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showBroadcastingItems () {
    if (!this.state.isKiboChat) {
      return (
        <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
          <a className='m-menu__link m-menu__toggle'>
            <i className='m-menu__link-icon flaticon-paper-plane' title='Broadcasting' />
            <span className='m-menu__link-text'>Broadcasting</span>
            <i className='m-menu__ver-arrow la la-angle-right' />
          </a>
          <div className='m-menu__submenu'>
            <span className='m-menu__arrow' />
            <ul className='m-menu__subnav'>
              <li className='m-menu__item  m-menu__item--parent' aria-haspopup='true' >
                <a className='m-menu__link'>
                  <span className='m-menu__link-text'>
                    Broadcasting
                  </span>
                </a>
              </li>
              {this.showBroadcastsItem()}
              {this.showSurveysItem()}
              {this.showPollsItem()}
              {this.showSegmentSubscribers()}
              {this.showTemplates()}
            </ul>
          </div>
        </li>
      )
    } else {
      return (
        <div />
      )
    }
  }

  showLiveChatItem () {
    if (this.props.user) {
      if (this.state.livechat && this.props.user.permissions.livechatPermission && this.props.user.plan.livechat &&
          (this.props.automated_options.automated_options === 'MIX_CHAT' ||
           this.props.automated_options.automated_options === 'HUMAN_CHAT')) {
        return (
          <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
            <Link to='/liveChat' className='m-menu__link m-menu__toggle'>
              <i className='m-menu__link-icon flaticon-chat-1' title='Live Chat' />
              <span className='m-menu__link-text'>Live Chat (Beta)</span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showAutomationItems () {
    return (
      <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
        <a className='m-menu__link m-menu__toggle'>
          <i className='m-menu__link-icon flaticon-share' title='Automation' />
          <span className='m-menu__link-text'>Automation</span>
          <i className='m-menu__ver-arrow la la-angle-right' />
        </a>
        <div className='m-menu__submenu'>
          <span className='m-menu__arrow' />
          <ul className='m-menu__subnav'>
            <li className='m-menu__item  m-menu__item--parent' aria-haspopup='true' >
              <a className='m-menu__link'>
                <span className='m-menu__link-text'>
                  Automation
                </span>
              </a>
            </li>
            {this.showSmartRespliesItem()}
            {this.showAutoPostingItem()}
            {this.showSequenceMessaging()}
          </ul>
        </div>
      </li>
    )
  }

  showGrowthToolsItems () {
    return (
      <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
        <a className='m-menu__link m-menu__toggle'>
          <i className='m-menu__link-icon flaticon-diagram' title='Growth Tools' />
          <span className='m-menu__link-text'>Growth Tools</span>
          <i className='m-menu__ver-arrow la la-angle-right' />
        </a>
        <div className='m-menu__submenu'>
          <span className='m-menu__arrow' />
          <ul className='m-menu__subnav'>
            <li className='m-menu__item  m-menu__item--parent' aria-haspopup='true' >
              <a className='m-menu__link'>
                <span className='m-menu__link-text'>
                  Growth Tools
                </span>
              </a>
            </li>
            {this.showCommentCapture()}
            {this.showInviteUsingPhoneNumber()}
            {this.showInviteSubscribers()}
            {this.showMessengerCode()}
            {this.showDiscoverTabs()}
            {this.showLandingPages()}
            {this.showMessengerAds()}
            {this.showMessengerRefURL()}
            {this.showMessageUs()}
          </ul>
        </div>
      </li>
    )
  }

  showManagePagesItems () {
    return (
      <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
        <a className='m-menu__link m-menu__toggle'>
          <i className='m-menu__link-icon flaticon-add' title='Manage Pages' />
          <span className='m-menu__link-text'>Manage Pages</span>
          <i className='m-menu__ver-arrow la la-angle-right' />
        </a>
        <div className='m-menu__submenu'>
          <span className='m-menu__arrow' />
          <ul className='m-menu__subnav'>
            <li className='m-menu__item  m-menu__item--parent' aria-haspopup='true' >
              <a className='m-menu__link'>
                <span className='m-menu__link-text'>
                  Manage Pages
                </span>
              </a>
            </li>
            {this.showPagesItem()}
            {this.showPersistentMenuItem()}
            {this.showWelcomeMessageItem()}
            {this.showGreetingText()}
          </ul>
        </div>
      </li>
    )
  }

  showOrganizationItems () {
    if (this.props.user.currentPlan.unique_ID === 'plan_C' || this.props.user.currentPlan.unique_ID === 'plan_D') {
      return (
        <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
          <a className='m-menu__link m-menu__toggle'>
            <i className='m-menu__link-icon flaticon-share' title='Organization' />
            <span className='m-menu__link-text'>Organization</span>
            <i className='m-menu__ver-arrow la la-angle-right' />
          </a>
          <div className='m-menu__submenu'>
            <span className='m-menu__arrow' />
            <ul className='m-menu__subnav'>
              <li className='m-menu__item  m-menu__item--parent' aria-haspopup='true' >
                <a className='m-menu__link'>
                  <span className='m-menu__link-text'>
                    Organization
                  </span>
                </a>
              </li>
              {this.showInviteMembersItem()}
              {this.showMembersItem()}
              {this.showTeams()}
            </ul>
          </div>
        </li>
      )
    }
  }

  showSettings () {
    if (this.state.settings) {
      return (
        <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
          <Link to='/settings' className='m-menu__link m-menu__toggle'>
            <i className='m-menu__link-icon flaticon-cogwheel' title='Settings' />
            <span className='m-menu__link-text'>Settings</span>
          </Link>
        </li>
      )
    }
  }

  showUserGuide () {
    if (this.state.settings) {
      return (
        <li className='m-menu__item  m-menu__item--submenu' aria-haspopup='true' data-menu-submenu-toggle='hover'>
          <a href='http://kibopush.com/user-guide/' target='_blank' className='m-menu__link m-menu__toggle'>
            <i className='m-menu__link-icon flaticon-info' title='User Guide' />
            <span className='m-menu__link-text'>User Guide</span>
          </a>
        </li>
      )
    }
  }

  showBroadcastsItem () {
    if (this.props.user) {
      if (this.state.broadcasts && this.props.user.permissions.broadcastPermission && this.props.user.plan.broadcasts) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/broadcasts' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Broadcasts
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showSurveysItem () {
    if (this.props.user) {
      if (this.state.surveys && this.props.user.permissions.surveyPermission && this.props.user.plan.surveys) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/surveys' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Surveys
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showPollsItem () {
    if (this.props.user) {
      if (this.state.polls && this.props.user.permissions.pollsPermission && this.props.user.plan.polls) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/poll' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Polls
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showSegmentSubscribers () {
    // add paid plan check later
    if (this.state.segmentSubscribers && this.props.user) {
      return (
        <li className='m-menu__item' aria-haspopup='true' >
          <Link to='/segmentedLists' className='m-menu__link'>
            <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
              <span />
            </i>
            <span className='m-menu__link-text'>
              Segment Subscribers
            </span>
          </Link>
        </li>
      )
    } else {
      return (null)
    }
  }

  showTemplates () {
    // add paid plan check later
    if (this.props.user && this.state.templates) {
      if ((this.props.user.role === 'buyer' || this.props.user.role === 'admin' || this.props.user.isSuperUser)) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/templates' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Templates
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showSmartRespliesItem () {
    if (this.props.user && this.props.user.isSuperUser && this.state.smartReplies && this.props.automated_options && (this.props.automated_options.automated_options === 'MIX_CHAT' ||
     this.props.automated_options.automated_options === 'AUTOMATED_CHAT')) {
      return (
        <li className='m-menu__item' aria-haspopup='true' >
          <Link to='/bots' className='m-menu__link'>
            <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
              <span />
            </i>
            <span className='m-menu__link-text'>
              Smart Replies
            </span>
          </Link>
        </li>
      )
    } else {
      return (null)
    }
  }

  showAutoPostingItem () {
    if (this.props.user) {
      if (this.state.autoposting && this.props.user.permissions.autopostingPermission && this.props.user.plan.autoposting) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/autoposting' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Autoposting
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showSequenceMessaging () {
    if (this.props.user && this.state.sequenceMessaging) {
      if (this.props.user.isSuperUser) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/sequenceMessaging' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Sequence Messaging
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showCommentCapture () {
    if (this.props.user) {
      // include user persmissions
      if (this.state.commentCapture) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/commentCapture' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Comment Capture
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showLandingPages () {
    if (this.props.user && this.props.user.isSuperUser) {
      // include user persmissions
      if (this.state.landingPages) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/landingPages' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Landing Pages
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showMessengerRefURL () {
    if (this.props.user) {
      // include user persmissions
      if (this.state.messengerRefURL) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/messengerRefURL' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Messenger Ref URL
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showMessengerAds () {
    if (this.props.user && this.props.user.isSuperUser) {
      // include user persmissions
      if (this.state.messengerAds) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/messengerAds' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Messenger Ads
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showMessageUs () {
    if (this.props.user) {
      // include user persmissions
      if (this.state.messageUs) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/messageUs' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Message Us
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showMessengerCode () {
    if (this.props.user) {
      // include user persmissions
      if (this.state.messengerCode) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/messengerCode' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Messenger Code
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }
  showDiscoverTabs () {
    if (this.props.user) {
      return (
        <li className='m-menu__item' aria-haspopup='true' >
          <Link to='/discoverTabs' className='m-menu__link'>
            <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
              <span />
            </i>
            <span className='m-menu__link-text'>
              Discover Tabs
            </span>
          </Link>
        </li>
      )
    } else {
      return (null)
    }
  }
  showInviteUsingPhoneNumber () {
    // add paid plan check later
    if (this.props.user && this.state.phoneNumber) {
      return (
        <li className='m-menu__item' aria-haspopup='true' >
          <Link to='/customerMatchingUsingPhNum' className='m-menu__link'>
            <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
              <span />
            </i>
            <span className='m-menu__link-text'>
              Invite Using Phone Numbers
            </span>
          </Link>
        </li>
      )
    } else {
      return (null)
    }
  }

  showInviteSubscribers () {
    // add paid plan check later
    if (this.props.user && this.state.phoneNumber) {
      return (
        <li className='m-menu__item' aria-haspopup='true' >
          <Link to='/inviteSubscribers' className='m-menu__link'>
            <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
              <span />
            </i>
            <span className='m-menu__link-text'>
              Invite Subscribers
            </span>
          </Link>
        </li>
      )
    } else {
      return (null)
    }
  }

  showHTMLWidget () {
    return (
      <li className='m-menu__item' aria-haspopup='true' >
        <a href='' className='m-menu__link'>
          <i className='m-mesing Phone Numbersnu__link-bullet m-menu__link-bullet--dot'>
            <span />
          </i>
          <span className='m-menu__link-text'>
            HTML Widget
          </span>
        </a>
      </li>
    )
  }

  showKiboPushWidget () {
    return (
      <li className='m-menu__item' aria-haspopup='true' >
        <a href='' className='m-menu__link'>
          <i className='m-mesing Phone Numbersnu__link-bullet m-menu__link-bullet--dot'>
            <span />
          </i>
          <span className='m-menu__link-text'>
            KiboPush Widget
          </span>
        </a>
      </li>
    )
  }

  showPagesItem () {
    if (this.props.user) {
      if (this.state.pages && this.props.user.permissions.pagesPermission && this.props.user.plan.manage_pages) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/pages' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Pages
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showPersistentMenuItem () {
    if (this.props.user) {
      if (this.state.persistentMenu && this.props.user.permissions.menuPermission && this.props.user.plan.menu) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/menu' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Persistent Menu
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showWelcomeMessageItem () {
    if (this.props.user) {
      if (this.state.welcomeMessage && this.props.user.permissions.pagesPermission) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/welcomeMessage' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Welcome Message
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showGreetingText () {
    return (
      <li className='m-menu__item' aria-haspopup='true' >
        <Link to='/greetingMessage' className='m-menu__link'>
          <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
            <span />
          </i>
          <span className='m-menu__link-text'>
            Greeting Text
          </span>
        </Link>
      </li>
    )
  }

  showInviteMembersItem () {
    if (this.props.user) {
      if (this.state.inviteMembers && (this.props.user.permissions.inviteAdminPermission || this.props.user.permissions.inviteAgentPermission) && this.props.user.plan.invite_team) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/inviteMembers' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Invite Members
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showMembersItem () {
    if (this.props.user) {
      if (this.state.members && this.props.user.permissions.membersPermission && this.props.user.plan.team_members_management) {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/members' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Members
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  showTeams () {
    if (this.props.user) {
      if (this.props.user.currentPlan.unique_ID === 'plan_C' || this.props.user.currentPlan.unique_ID === 'plan_D') {
        return (
          <li className='m-menu__item' aria-haspopup='true' >
            <Link to='/teams' className='m-menu__link'>
              <i className='m-menu__link-bullet m-menu__link-bullet--dot'>
                <span />
              </i>
              <span className='m-menu__link-text'>
                Teams
              </span>
            </Link>
          </li>
        )
      } else {
        return (null)
      }
    }
  }

  render () {
    console.log('this.state', this.state)

    if (this.props.user && this.props.user.permissionsRevoked) {
      browserHistory.push({pathname: '/connectFb', state: {permissionsRevoked: true}})
    }
    return (
      <div id='sidebarDiv'>
        <button className='m-aside-left-close  m-aside-left-close--skin-dark ' id='m_aside_left_close_btn'>
          <i className='la la-close' />
        </button>
        <div id='m_aside_left' className='m-grid__item m-aside-left  m-aside-left--skin-dark'>
          <div
            id='m_ver_menu'
            className='m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark m-scroller mCustomScrollbar _mCS_2 mCS-autoHide'
            data-menu-vertical='1'
            data-menu-scrollable='1'>
            <div id='mCSB_2' className='mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside' tabIndex='0' style={{maxHeight: 'none'}}>
              <div id='mCSB_2_container' className='mCSB_container' style={{position: 'relative', top: '0px', left: '0px'}} dir='ltr'>
                {this.props.user &&
                <ul className='m-menu__nav  m-menu__nav--dropdown-submenu-arrow '>
                  {this.showOperationalDashboard()}
                  {this.showDashboard()}
                  {this.showSubscribersItem()}
                  {this.showBroadcastingItems()}
                  {this.showLiveChatItem()}
                  {this.showAutomationItems()}
                  {this.showGrowthToolsItems()}
                  {this.showManagePagesItems()}
                  {this.showOrganizationItems()}
                  {this.showSettings()}
                  {this.showUserGuide()}
                </ul>
              }
              </div>
            </div>
            <div id='mCSB_2_scrollbar_vertical' className='mCSB_scrollTools mCSB_2_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical' style={{display: 'block'}}>
              <div className='mCSB_draggerContainer'>
                <div id='mCSB_2_dragger_vertical' className='mCSB_dragger' style={{position: 'absolute', minHeight: '50px', display: 'block', maxHeight: '303px', top: '0px'}}>
                  <div className='mCSB_dragger_bar' style={{lineHeight: '50px'}} />
                </div>
                <div className='mCSB_draggerRail' />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  console.log('state in sidebar', state)
  return {
    sessions: (state.liveChat.sessions),
    user: (state.basicInfo.user),
    updatedUser: (state.basicInfo.updatedUser),
    socketSession: (state.liveChat.socketSession),
    userChat: (state.liveChat.userChat),
    socketData: (state.liveChat.socketData),
    automated_options: (state.basicInfo.automated_options)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getuserdetails: getuserdetails,
    getAutomatedOptions: getAutomatedOptions,
    fetchSessions: fetchSessions,
    fetchUserChats: fetchUserChats,
    resetSocket: resetSocket,
    fetchSingleSession: fetchSingleSession
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
