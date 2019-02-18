/* eslint-disable no-return-assign */
/**
 * Created by imran on 11/11/2017.
 */

import React from 'react'

class ProgressBar extends React.Component {
  render () {
    return (
      <div className='row'>
        <div className='col-12 m-widget15'>
          <div className='m-widget15__item'>
            <span style={{fontSize: '1.1rem', fontWeight: '600', color: '#6f727d'}}>
              {this.props.rate}
            </span>
            <span style={{fontSize: '0.85rem', float: 'right', marginTop: '0.3rem', color: '#9699a2'}}>
              {this.props.label}
            </span>
            <div className='m--space-10' />
            <div className='progress m-progress--sm' style={{height: '6px'}}>
              <div className={`progress-bar bg-${this.props.progressStyle}`} role='progressbar' style={{width: this.props.rate}} aria-valuemin='0' aria-valuemax='100' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProgressBar
