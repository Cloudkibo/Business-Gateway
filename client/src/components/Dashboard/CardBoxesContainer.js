/* eslint-disable no-return-assign */
/**
 * Created by imran on 11/11/2017.
 */

import React from 'react'
import CardBox from './CardBox'
import { Link } from 'react-router'
import { UncontrolledTooltip } from 'reactstrap'

/* card box style must be any of these
  band
  success
  danger
  accent
 */

class CardBoxesContainer extends React.Component {
  render () {
    const url = window.location.hostname
    return (
      <div className='col-xl-12'>
        <div className='row m-row--full-height'>
          <UncontrolledTooltip style={{minWidth: '100px', opacity: '1.0'}} target='totalPages'>
            <span>Number of Facebook pages you are admin of</span>
          </UncontrolledTooltip>
          <div className='col-sm-3 col-md-3 col-lg-3'>
            <Link to='/addPages' >
              <CardBox
                style='brand'
                value={this.props.data.totalPages ? this.props.data.totalPages : 0}
                label='Total Pages'
                id='totalPages'
              />
            </Link>
          </div>
          <UncontrolledTooltip style={{minWidth: '100px', opacity: '1.0'}} target='connectedPages'>
            <span>Number of Facebook pages connected with our app</span>
          </UncontrolledTooltip>
          <div className='col-sm-3 col-md-3 col-lg-3'>
            <Link to='/pages' >
              <CardBox
                style='success'
                value={this.props.data.pages ? this.props.data.pages : 0}
                label='Connected Pages'
                id='connectedPages'
              />
            </Link>
          </div>
          <UncontrolledTooltip style={{minWidth: '100px', opacity: '1.0'}} target='subscribers'>
            <span>Number of subscribers</span>
          </UncontrolledTooltip>
          <div className='col-sm-3 col-md-3 col-lg-3'>
            <Link to='/subscribers' >
              <CardBox
                style='danger'
                value={this.props.data.subscribers ? this.props.data.subscribers : 0}
                label='Subscribers'
                id='subscribers'
              />
            </Link>
          </div>
          <UncontrolledTooltip style={{minWidth: '100px', opacity: '1.0'}} target='properties'>
            {url.includes('kibochat.cloudkibo.com')
              ? <span>Number of new messages</span>
              : <span>Nunmber of sequences created</span>
            }
          </UncontrolledTooltip>
          <div className='col-sm-3 col-md-3 col-lg-3'>
            <Link to={url.includes('kibochat.cloudkibo.com') ? '/liveChat' : 'sequenceMessaging'} >
              <CardBox
                style='accent'
                value={url.includes('kibochat.cloudkibo.com') ? (this.props.data.unreadCount ? this.props.data.unreadCount : 0) : (this.props.data.sequences ? this.props.data.sequences : 0)}
                label={url.includes('kibochat.cloudkibo.com') ? 'New Messages' : 'Sequences'}
                id='properties'
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default CardBoxesContainer
