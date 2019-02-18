/**
 * Created by sojharo on 20/08/2017.
 */
import io from 'socket.io-client'
import { setSocketStatus } from './../redux/actions/basicinfo.actions'
import { socketUpdate, socketUpdateSeen, fetchSingleSession } from './../redux/actions/livechat.actions'
import { loadAutopostingList } from './../redux/actions/autoposting.actions'
import { loadMyPagesList } from './../redux/actions/pages.actions'
import { fetchAllSequence } from './../redux/actions/sequence.action'
import { loadDashboardData, sentVsSeen } from './../redux/actions/dashboard.actions'
// import { allBroadcasts } from './../redux/actions/broadcast.actions'
import { loadPollsListNew } from './../redux/actions/poll.actions'
import { loadSurveysListNew } from './../redux/actions/surveys.actions'
import { loadTags } from './../redux/actions/tags.actions'
import { loadAllSubscribersListNew } from './../redux/actions/subscribers.actions'
import { fetchNotifications } from './../redux/actions/notifications.actions'

const socket = io('')
let store

var joined = false
var myId = ''

var callbacks = {
  new_chat: false,
  new_broadcast: false,
  autoposting_created: false,
  autoposting_updated: false,
  autoposting_removed: false,
  menu_updated: false,
  page_connect: false,
  page_disconnect: false,
  poll_created: false,
  survey_created: false,
  new_subscriber: false,
  dashboard_updated: false,
  sequence_create: false,
  sequence_update: false,
  sequence_delete: false,
  message_seen: false
}

export function registerAction (callback) {
  callbacks[callback.event] = callback.action
}

export function initiateSocket (storeObj) {
  store = storeObj
  socket.connect()
}

socket.on('connect', () => {
  console.log('Setting Socket Status to true')
  if (myId !== '') {
    joinRoom(myId)
  }
  store.dispatch(setSocketStatus(true))
})

socket.on('disconnect', () => {
  joined = false
  store.dispatch(setSocketStatus(false))
})

socket.on('new_chat', (data) => {
  store.dispatch(socketUpdate(data))
})

socket.on('message', (data) => {
  console.log('socket called', data)
  if (data.action === 'new_chat') {
    console.log('new message received from customer')
    store.dispatch(socketUpdate(data.payload))
    store.dispatch(loadDashboardData())
  } else if (data.action === 'message_seen') {
    store.dispatch(socketUpdateSeen(data.payload))
  } else if (data.action === 'autoposting_updated' || data.action === 'autoposting_removed') {
    store.dispatch(loadAutopostingList())
  } else if (data.action === 'page_disconnect' || data.action === 'page_connect') {
    store.dispatch(loadMyPagesList())
    store.dispatch(loadDashboardData())
  } else if (data.action === 'new_broadcast') {
    // store.dispatch(loadBroadcastsList())
    store.dispatch(sentVsSeen())
  } else if (data.action === 'poll_created') {
    store.dispatch(loadPollsListNew({last_id: 'none', number_of_records: 10, first_page: true, days: '0'}))
    store.dispatch(sentVsSeen())
  } else if (data.action === 'poll_send') {
    console.log('poll send function called')
    store.dispatch(loadPollsListNew({last_id: 'none', number_of_records: 10, first_page: 'first', days: '0'}))
    // store.dispatch(sentVsSeen())
  } else if (data.action === 'survey_created') {
    store.dispatch(loadSurveysListNew({last_id: 'none', number_of_records: 10, first_page: 'first', days: '0'}))
    store.dispatch(sentVsSeen())
  } else if (data.action === 'survey_send') {
    console.log('survey send function called')
    store.dispatch(loadSurveysListNew({last_id: 'none', number_of_records: 10, first_page: 'first', days: '0'}))
    // store.dispatch(sentVsSeen())
  } else if (['new_tag', 'tag_rename', 'tag_remove'].indexOf(data.action) > -1) {
    store.dispatch(loadTags())
  } else if (['tag_assign', 'tag_unassign'].indexOf(data.action) > -1) {
    store.dispatch(loadAllSubscribersListNew({last_id: 'none', number_of_records: 10, first_page: 'first', filter: false, filter_criteria: {search_value: '', gender_value: '', page_value: '', locale_value: '', tag_value: '', status_value: ''}}))
  } else if (data.action === 'session_status') {
    if (data.payload.status === 'new') {
      store.dispatch(fetchSingleSession(data.payload.session_id, {appendTo: 'open', deleteFrom: 'close'}))
    } else {
      store.dispatch(fetchSingleSession(data.payload.session_id, {appendTo: 'close', deleteFrom: 'open'}))
    }
    store.dispatch(fetchNotifications())
  } else if (['sequence_create', 'sequence_update', 'sequence_delete'].indexOf(data.action) > -1) {
    store.dispatch(fetchAllSequence())
  }

  if (callbacks[data.action]) {
    callbacks[data.action](data.payload)
  }
})

export function log (tag, data) {
  console.log(`${tag}: ${data}`)
  socket.emit('logClient', {
    tag,
    data
  })
}

export function joinRoom (data) {
  console.log('Trying to join room socket', data)
  myId = data
  if (joined) {
    return
  }
  socket.emit('message', {
    action: 'join_room',
    room_id: data
  })
  joined = true
}
