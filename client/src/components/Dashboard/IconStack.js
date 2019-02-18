/* eslint-disable no-return-assign */
/**
 * Created by imran on 11/11/2017.
 */

import React from 'react'
import { Link } from 'react-router'

class IconStack extends React.Component {
  render () {
    return (
      <Link to={{pathname: this.props.path, state: this.props.state}} style={{color: '#575962'}}>
        <div className='m-widget21__item' style={{display: 'flex'}}>
          <span className='m-widget21__icon'>
            <a className={`btn btn-${this.props.iconStyle} m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill`}>
              <i className={`${this.props.icon} m--font-light`} />
            </a>
          </span>
          <div className='m-widget21__info' style={{marginLeft: '10px'}}>
            <span className='m-widget21__title'>
              {this.props.title}
            </span>
            <br />
            <span className='m-widget21__sub'>
              {this.props.subtitle}
            </span>
          </div>
        </div>
      </Link>
    )
  }
}

export default IconStack
