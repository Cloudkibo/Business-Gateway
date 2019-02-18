
import { Route, IndexRoute } from 'react-router'
import React from 'react'
import App from './sub.app.js'
import Home from './containers/home'
import Login from './containers/login/new'
import MessageUs from './containers/messageUs/messageUs'
import Signup from './containers/signup/signup'
import ResendVerificationEmail from './containers/signup/resendEmail'
import ForgotPassword from './containers/login/resetPassword'
import ForgotNamespace from './containers/login/forgotWorkspaceName.js'
import Subscriber from './containers/subscriber/subscriber'
import OperationalDashboard from './containers/operationalDashboard/operationalDashboard'
import StackedBar from './containers/dashboard/stackedBar'
import ViewPageSubscribers from './containers/dashboard/viewPageSubscribers'
import MainMenu from './containers/menu/persistentMenu'
import CreateMessage from './containers/menu/CreateMessage'
import GrowthTools from './containers/GrowthTools/growthTools'
import ShareOptions from './containers/GrowthTools/ShareOptions'
import CustomerMatching from './containers/GrowthTools/customerMatchingUsingPhNum'
import NonSubscribersList from './containers/GrowthTools/nonSubscribersList'
import Stats from './containers/stats/stats'
import Convo from './containers/convo/convo'
import Page from './containers/page/page'
import GreetingMessage from './containers/page/greetingMessage'
import AddPage from './containers/page/addPage'
import InviteSubscribers from './containers/page/InviteSubscribers'
import CreateConvo from './containers/convo/CreateConvo'
import Surveys from './containers/survey/surveys'
import ViewSurvey from './containers/survey/ViewSurvey'
import SubmitSurvey from './containers/survey/SubmitSurvey'
import ViewSurveyDetail from './containers/survey/ViewSurveyDetail'
import AddSurvey from './containers/survey/add_survey'
import SurveyResult from './containers/survey/SurveyResult'
import CreatePoll from './containers/polls/CreatePoll'
import Poll from './containers/polls/poll'
import PollResult from './containers/polls/PollResult'
import ViewPoll from './containers/polls/ViewPoll'
import UserDetails from './containers/operationalDashboard/userDetails'
import ViewPollDetail from './containers/operationalDashboard/pollDetails'
import UserBroadcasts from './containers/operationalDashboard/userBroadcasts'
import SurveyDetails from './containers/operationalDashboard/surveyDetails'
import ViewBroadcastDetail from './containers/operationalDashboard/broadcastDetails'
import PageSubscribers from './containers/operationalDashboard/pageSubscribers'
import UserPolls from './containers/operationalDashboard/userPolls'
import UserSurveys from './containers/operationalDashboard/userSurveys'
import SurveysByDays from './containers/operationalDashboard/surveysByDays'
import PollsByDays from './containers/operationalDashboard/pollsByDays'
import BroadcastsByDays from './containers/operationalDashboard/broadcastsByDays'
import SubscribeToMessenger from './containers/subscribeToMessenger/subscribeToMessenger'
import Autoposting from './containers/autoposting/autoposting'
import AutopostingMessages from './containers/autoposting/autoposting_messages'
import ItemSettings from './containers/autoposting/itemSettings'
import LiveChat from './containers/liveChat/live'
import Settings from './containers/settings/settings'
import CreateSurvey from './containers/templates/createSurvey'
import CreateTemplatePoll from './containers/templates/createPoll'
import Template from './containers/templates/templates'
import TemplatePoll from './containers/templates/templatePolls'
import TemplateSurvey from './containers/templates/templateSurveys'
import TemplateBroadcasts from './containers/templates/templateBroadcasts'
import CreateBroadcastTemplate from './containers/templates/createBroadcastTemplate'
import ViewBroadcastTemplate from './containers/templates/viewBroadcastTemplate'
import EditBroadcastTemplate from './containers/templates/editBroadcastTemplate'
import ViewTemplateSurvey from './containers/templates/viewSurvey'
import ViewTemplatePoll from './containers/templates/viewPoll'
import EditPoll from './containers/templates/editPoll'
import EditSurvey from './containers/templates/editSurvey'
import Categories from './containers/templates/categories'
import ShowTemplateSurveys from './containers/survey/showTemplates'
import EditTemplateSurvey from './containers/survey/editTemplate'
import ShowTemplatePolls from './containers/polls/showTemplates'
import EditTemplatePoll from './containers/polls/editTemplate'
import ViewTemplatePollUser from './containers/polls/viewTemplate'
import ViewTemplateSurveyUser from './containers/survey/viewTemplate'
import ShowTemplateBroadcasts from './containers/convo/showTemplates'
import EditTemplateBroadcast from './containers/convo/editTemplate'
import Invitations from './containers/invitations/invitations'
import InviteMembers from './containers/invitations/inviteMember'
import Members from './containers/members/members'
import Connect from './containers/facebookConnect/connect'
import WelcomeMessage from './containers/welcomeMessage/welcomeMessage'
import ViewWelcomeMessage from './containers/welcomeMessage/viewMessage'
import SegmentedLists from './containers/segmentedLists/segmentedLists'
import CustomerLists from './containers/GrowthTools/customerLists'
import CustomerListDetails from './containers/GrowthTools/customerListDetails'
import PhoneList from './containers/segmentedLists/listDetails'
import CreateSubList from './containers/segmentedLists/createSubList'
import AddPageWizard from './containers/wizard/addPage'
import InviteUsingLinkWizard from './containers/wizard/inviteUsingLink'
import GreetingTextWizard from './containers/wizard/greetingText'
import WelcomeMessageWizard from './containers/wizard/welcomeMessage'
import AutopostingWizard from './containers/wizard/autoposting'
import MenuWizard from './containers/wizard/persistentMenu'
import PaymentMethodsWizard from './containers/wizard/paymentMethods'
import Finish from './containers/wizard/finish'
import ResponseMethods from './containers/wizard/responseMethods'
import CreateTeam from './containers/teams/createTeam'
import Teams from './containers/teams/teams'
import EditTeam from './containers/teams/editTeam'
import Bots from './containers/smart_replies/bots'
import UnansweredQueries from './containers/smart_replies/unansweredQueries'
import CreateBot from './containers/smart_replies/createBot'
import EditBot from './containers/smart_replies/editBot'
import ViewBot from './containers/smart_replies/viewBot'
import Sequence from './containers/sequence/sequence'
import ViewMessage from './containers/sequence/viewMessage'
import CreateMessageSeq from './containers/sequence/createMessage'
import EditSequence from './containers/sequence/editSequence'
import FacebookPosts from './containers/commentCapture/facebookPosts'
import FacebookPost from './containers/commentCapture/newFacebookPost'
import LandingPages from './containers/landingPages/landingPages'
import CreateLandingPage from './containers/landingPages/createLandingPage'
import MessengerCode from './containers/messengerCode/messengerCode'
import WaitingReplyList from './containers/smart_replies/waitingReplyList'
import Plans from './containers/billingPricing/plans'
import Permissions from './containers/permissions/permissions'
import Features from './containers/features/features'
import Usage from './containers/usage/usage'
import AbandonedCarts from './containers/abandoned_carts/abandonedCarts'
import ConnectFBPages from './containers/signup/connectFbPages'
import DiscoverTabs from './containers/GrowthTools/discoverTabs'
import LandingPageMessage from './containers/landingPages/createMessage'
import DemoSSA from './containers/demoSSA/demoSSA'
import MessengerAds from './containers/messengerAds/messengerAds'
import CreateMessengerAdMessage from './containers/messengerAds/createMessage'
import CreateAdMessage from './containers/messengerAds/createMessengerAd'
import MessengerRefURL from './containers/messengerRefURL/messengerRefURL'
import CreateMessengerRefURL from './containers/messengerRefURL/create'
import CreateMessengerRefURLMessage from './containers/messengerRefURL/createMessage'
import auth from './utility/auth.service'

function requireAuth (nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function redirectAuthUsers (nextState, replace) {
  if (auth.loggedIn()) {
    if (auth.getNext() === 'addPages') {
      auth.removeNext()
      return replace({
        pathname: '/addfbpages',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    replace({
      pathname: '/dashboard',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} onEnter={redirectAuthUsers} />
    <Route path='/login' component={Login} onEnter={redirectAuthUsers} />
    <Route path='/signup' component={Signup} />
    <Route path='/addfbpages' component={ConnectFBPages} onEnter={requireAuth} />
    <Route path='/dashboard' component={Home} onEnter={requireAuth} />
    <Route path='/resendVerificationEmail' component={ResendVerificationEmail} />
    <Route path='/forgotPassword' component={ForgotPassword} />
    <Route path='/resetPassword' component={ForgotPassword} />
    <Route path='/forgotWorkspaceName' component={ForgotNamespace} />
    <Route path='/operationalDashboard' component={OperationalDashboard} onEnter={requireAuth} />
    <Route path='/subscribers' component={Subscriber} onEnter={requireAuth} />
    <Route path='/broadcasts' component={Convo} onEnter={requireAuth} />
    <Route path='/autoposting' component={Autoposting} onEnter={requireAuth} />
    <Route path='/autopostingMessages' component={AutopostingMessages} onEnter={requireAuth} />
    <Route path='/autopostingItemSettings' component={ItemSettings} onEnter={requireAuth} />
    <Route path='/pages' component={Page} onEnter={requireAuth} />
    <Route path='/addPages' component={AddPage} onEnter={requireAuth} />
    <Route path='/surveys' component={Surveys} onEnter={requireAuth} />
    <Route path='/createBroadcast' component={CreateConvo} onEnter={requireAuth} />
    <Route path='/createPoll' component={CreatePoll} onEnter={requireAuth} />
    <Route path='/poll' component={Poll} onEnter={requireAuth} />
    <Route path='/stats' component={Stats} />
    <Route path='/subscribeToMessenger' component={SubscribeToMessenger} onEnter={requireAuth} />
    <Route path='/addSurvey' component={AddSurvey} onEnter={requireAuth} />
    <Route path='/pollResult' component={PollResult} onEnter={requireAuth} />
    <Route path='/pollView' component={ViewPoll} onEnter={requireAuth} />
    <Route path='/surveyResult' component={SurveyResult} onEnter={requireAuth} />
    <Route path='/viewSurvey/:id/:subscriberid' component={ViewSurvey} onEnter={requireAuth} />
    <Route path='/viewSurveyDetail' component={ViewSurveyDetail} onEnter={requireAuth} />
    <Route path='/viewPollDetail' component={ViewPollDetail} onEnter={requireAuth} />
    <Route path='/viewBroadcastDetail' component={ViewBroadcastDetail} onEnter={requireAuth} />
    <Route path='/submitSurveyResponse' component={SubmitSurvey} />
    <Route path='/inviteSubscribers' component={InviteSubscribers} onEnter={requireAuth} />
    <Route path='/userDetails' component={UserDetails} onEnter={requireAuth} />
    <Route path='/pageSubscribers' component={PageSubscribers} onEnter={requireAuth} />
    <Route path='/userBroadcasts' component={UserBroadcasts} onEnter={requireAuth} />
    <Route path='/userPolls' component={UserPolls} onEnter={requireAuth} />
    <Route path='/userSurveys' component={UserSurveys} onEnter={requireAuth} />
    <Route path='/growthTools' component={GrowthTools} onEnter={requireAuth} />
    <Route path='/discoverTabs' component={DiscoverTabs} onEnter={requireAuth} />
    <Route path='/shareOptions' component={ShareOptions} onEnter={requireAuth} />
    <Route path='/customerMatchingUsingPhNum' component={CustomerMatching} onEnter={requireAuth} />
    <Route path='/nonSubscribersList' component={NonSubscribersList} onEnter={requireAuth} />
    <Route path='/liveChat' component={LiveChat} onEnter={requireAuth} />
    <Route path='/menu' component={MainMenu} onEnter={requireAuth} />
    <Route path='/createMessage' component={CreateMessage} onEnter={requireAuth} />
    <Route path='/stackedBar' component={StackedBar} onEnter={requireAuth} />
    <Route path='/surveyDetails' component={SurveyDetails} onEnter={requireAuth} />
    <Route path='/settings' component={Settings} onEnter={requireAuth} />
    <Route path='/createSurvey' component={CreateSurvey} onEnter={requireAuth} />
    <Route path='/createTemplatePoll' component={CreateTemplatePoll} onEnter={requireAuth} />
    <Route path='/templates' component={Template} onEnter={requireAuth} />
    <Route path='/templatePolls' component={TemplatePoll} onEnter={requireAuth} />
    <Route path='/templateSurveys' component={TemplateSurvey} onEnter={requireAuth} />
    <Route path='/templateBroadcasts' component={TemplateBroadcasts} onEnter={requireAuth} />
    <Route path='/createBroadcastTemplate' component={CreateBroadcastTemplate} onEnter={requireAuth} />
    <Route path='/viewBroadcastTemplate' component={ViewBroadcastTemplate} onEnter={requireAuth} />
    <Route path='/editBroadcastTemplate' component={EditBroadcastTemplate} onEnter={requireAuth} />
    <Route path='/viewSurvey' component={ViewTemplateSurvey} onEnter={requireAuth} />
    <Route path='/viewPoll' component={ViewTemplatePoll} onEnter={requireAuth} />
    <Route path='/editPoll' component={EditPoll} onEnter={requireAuth} />
    <Route path='/editSurvey' component={EditSurvey} onEnter={requireAuth} />
    <Route path='/showTemplatePolls' component={ShowTemplatePolls} onEnter={requireAuth} />
    <Route path='/showTemplateSurveys' component={ShowTemplateSurveys} onEnter={requireAuth} />
    <Route path='/editTemplatePoll' component={EditTemplatePoll} onEnter={requireAuth} />
    <Route path='/editTemplateSurvey' component={EditTemplateSurvey} onEnter={requireAuth} />
    <Route path='/viewTemplateSurveyUser' component={ViewTemplateSurveyUser} onEnter={requireAuth} />
    <Route path='/viewTemplatePollUser' component={ViewTemplatePollUser} onEnter={requireAuth} />
    <Route path='/ShowTemplateBroadcasts' component={ShowTemplateBroadcasts} onEnter={requireAuth} />
    <Route path='/categories' component={Categories} onEnter={requireAuth} />
    <Route path='/editTemplateBroadcast' component={EditTemplateBroadcast} onEnter={requireAuth} />
    <Route path='/editWelcomeMessage' component={EditTemplateBroadcast} onEnter={requireAuth} />
    <Route path='/inviteMembers' component={Invitations} onEnter={requireAuth} />
    <Route path='/newInvitation' component={InviteMembers} onEnter={requireAuth} />
    <Route path='/members' component={Members} onEnter={requireAuth} />
    <Route path='/connectFb' component={Connect} onEnter={requireAuth} />
    <Route path='/welcomeMessage' component={WelcomeMessage} onEnter={requireAuth} />
    <Route path='/viewWelcomeMessage' component={ViewWelcomeMessage} onEnter={requireAuth} />
    <Route path='/listDetails' component={PhoneList} onEnter={requireAuth} />
    <Route path='/segmentedLists' component={SegmentedLists} onEnter={requireAuth} />
    <Route path='/customerLists' component={CustomerLists} onEnter={requireAuth} />
    <Route path='/customerListDetails' component={CustomerListDetails} onEnter={requireAuth} />
    <Route path='/createSubList' component={CreateSubList} onEnter={requireAuth} />
    <Route path='/addPageWizard' component={AddPageWizard} onEnter={requireAuth} />
    <Route path='/inviteUsingLinkWizard' component={InviteUsingLinkWizard} onEnter={requireAuth} />
    <Route path='/greetingTextWizard' component={GreetingTextWizard} onEnter={requireAuth} />
    <Route path='/welcomeMessageWizard' component={WelcomeMessageWizard} onEnter={requireAuth} />
    <Route path='/autopostingWizard' component={AutopostingWizard} onEnter={requireAuth} />
    <Route path='/menuWizard' component={MenuWizard} onEnter={requireAuth} />
    <Route path='/paymentMethodsWizard' component={PaymentMethodsWizard} onEnter={requireAuth} />
    <Route path='/finish' component={Finish} onEnter={requireAuth} />
    <Route path='/responseMethods' component={ResponseMethods} onEnter={requireAuth} />
    <Route path='/surveysByDays' component={SurveysByDays} onEnter={requireAuth} />
    <Route path='/pollsByDays' component={PollsByDays} onEnter={requireAuth} />
    <Route path='/broadcastsByDays' component={BroadcastsByDays} onEnter={requireAuth} />
    <Route path='/createTeam' component={CreateTeam} onEnter={requireAuth} />
    <Route path='/teams' component={Teams} onEnter={requireAuth} />
    <Route path='/editTeam' component={EditTeam} onEnter={requireAuth} />
    <Route path='/bots' component={Bots} onEnter={requireAuth} />
    <Route path='/UnansweredQueries' component={UnansweredQueries} onEnter={requireAuth} />
    <Route path='/createBot' component={CreateBot} onEnter={requireAuth} />
    <Route path='/editBot' component={EditBot} onEnter={requireAuth} />
    <Route path='/viewBot' component={ViewBot} onEnter={requireAuth} />
    <Route path='/sequenceMessaging' component={Sequence} onEnter={requireAuth} />
    <Route path='/viewMessage' component={ViewMessage} onEnter={requireAuth} />
    <Route path='/editSequence' component={EditSequence} onEnter={requireAuth} />
    <Route path='/createMessageSeq' component={CreateMessageSeq} onEnter={requireAuth} />
    <Route path='/commentCapture' component={FacebookPosts} onEnter={requireAuth} />
    <Route path='/landingPages' component={LandingPages} onEnter={requireAuth} />
    <Route path='/createLandingPage' component={CreateLandingPage} onEnter={requireAuth} />
    <Route path='/messengerCode' component={MessengerCode} onEnter={requireAuth} />
    <Route path='/createPost' component={FacebookPost} onEnter={requireAuth} />
    <Route path='/WaitingReplyList' component={WaitingReplyList} onEnter={requireAuth} />
    <Route path='/viewPageSubscribers' component={ViewPageSubscribers} onEnter={requireAuth} />
    <Route path='/plans' component={Plans} onEnter={requireAuth} />
    <Route path='/permissions' component={Permissions} onEnter={requireAuth} />
    <Route path='/features' component={Features} onEnter={requireAuth} />
    <Route path='/usage' component={Usage} onEnter={requireAuth} />
    <Route path='/abandonedCarts' component={AbandonedCarts} onEnter={requireAuth} />
    <Route path='/greetingMessage' component={GreetingMessage} onEnter={requireAuth} />
    <Route path='/createLandingPageMessage' component={LandingPageMessage} onEnter={requireAuth} />
    <Route path='/messageUs' component={MessageUs} onEnter={requireAuth} />
    <Route path='/messengerAds' component={MessengerAds} onEnter={requireAuth} />
    <Route path='/createMessengerAdMessage' component={CreateMessengerAdMessage} onEnter={requireAuth} />
    <Route path='/createAdMessage' component={CreateAdMessage} onEnter={requireAuth} />
    <Route path='/messengerRefURL' component={MessengerRefURL} onEnter={requireAuth} />
    <Route path='/createMessengerRefURL' component={CreateMessengerRefURL} onEnter={requireAuth} />
    <Route path='/createMessengerRefURLMessage' component={CreateMessengerRefURLMessage} onEnter={requireAuth} />
    <Route path='/demoSSA' component={DemoSSA} />
  </Route>

)

export default routes
