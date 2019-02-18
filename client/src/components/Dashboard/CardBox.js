/* eslint-disable no-return-assign */
/**
 * Created by imran on 11/11/2017.
 */

import React from 'react'

/* this.props.style must be any of these
  band
  success
  danger
  accent
 */

class CardBox extends React.Component {
  render () {
    return (
      <div className={`m-portlet m-portlet--border-bottom-${this.props.style}`}>
        <div className='m-portlet__body'>
          <div className='m-widget26' id={this.props.id}>
            <div className='m-widget26__number'>
              {this.props.value}
              <small>
                {this.props.label}
              </small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CardBox
