/* eslint-disable no-return-assign */
/**
 * Created by imran on 11/11/2017.
 */

import React from 'react'
import { Link } from 'react-router'
class AlertMessage extends React.Component {
  render () {
    return (
      <div>
        {this.props.type === 'page'
        ? <div className='m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-warning alert-dismissible fade show' role='alert'>
          <div className='m-alert__icon'>
            <i className='flaticon-exclamation-1' style={{color: 'white'}} />
            <span />
          </div>
          <div className='m-alert__text'>
            <strong>
            0 Pages Connected!&nbsp;
            </strong>
            You have no pages connected. Please connect your facebook page to use this feature.&nbsp; <Link style={{cursor: 'pointer'}} to='/addPages' >Connect Page</Link>
          </div>
        </div>
        : this.props.type === 'subscriber' &&
        <div className='m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-warning alert-dismissible fade show' role='alert'>
          <div className='m-alert__icon'>
            <i className='flaticon-exclamation-1' style={{color: 'white'}} />
            <span />
          </div>
          <div className='m-alert__text'>
            <strong>
            0 Subscribers!&nbsp;
            </strong>
            Your connected pages have zero subscribers. Unless you do not have any subscriber, you will not be able to broadcast message, polls and surveys.
            To invite subscribers click <Link to='/invitesubscribers' style={{cursor: 'pointer'}}> here </Link>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default AlertMessage
