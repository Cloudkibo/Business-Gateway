/* eslint-disable no-return-assign */
/**
 * Created by imran on 11/11/2017.
 */

import React from 'react'
import { Link } from 'react-router'

class PageLikesSubscribers extends React.Component {
  constructor (props, context) {
    super(props, context)
    //this.showDropDown = this.showDropDown.bind(this)
    //this.hideDropDown = this.hideDropDown.bind(this)
    //this.changePage = this.changePage.bind(this)
  }

  // showDropDown () {
  //   this.setState({showDropDown: true})
  // }

  // hideDropDown () {
  //   this.setState({showDropDown: false})
  // }

  // changePage (page) {
  //   let index = 0
  //   for (let i = 0; i < this.props.connectedPages.length; i++) {
  //     if (page === this.props.connectedPages[i].pageName) {
  //       index = i
  //       break
  //     }
  //   }
  //   this.setState({
  //     selectedPage: this.props.connectedPages[index].pageName,
  //     likes: this.props.connectedPages[index].likes,
  //     subscribers: this.props.connectedPages[index].subscribers,
  //     unsubscribes: this.props.connectedPages[index].unsubscribes
  //   })
  // }

  render () {
    var convertRate = this.props.pageLikesSubscribes.likes ? ((this.props.pageLikesSubscribes.subscribers / this.props.pageLikesSubscribes.likes) * 100).toFixed(1) + '%' : '0%'
    return (
      <div className='col-xl-6'>
        <div className='m-portlet m-portlet--full-height m-portlet--skin-light m-portlet--fit'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                <h3 className='m-portlet__head-text substring-dashboard'>
                  {this.props.pageLikesSubscribes.selectedPage ? this.props.pageLikesSubscribes.selectedPage : this.props.firstPage.pageName}
                </h3>
              </div>
            </div>
            {/* <div className='m-portlet__head-tools'>
              <ul className='m-portlet__nav'>
                <li onClick={this.showDropDown} className='m-portlet__nav-item m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push' data-dropdown-toggle='click'>
                  <a className='m-portlet__nav-link m-dropdown__toggle dropdown-toggle btn btn--sm m-btn--pill btn-secondary m-btn m-btn--label-brand'>
                    Change Page
                  </a>
                  {
                    this.state.showDropDown &&
                    <div className='m-dropdown__wrapper'>
                      <span className='m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust' />
                      <div className='m-dropdown__inner'>
                        <div className='m-dropdown__body'>
                          <div className='m-dropdown__content'>
                            <ul className='m-nav'>
                              <li className='m-nav__section m-nav__section--first'>
                                <span className='m-nav__section-text'>
                                  Connected Pages
                                </span>
                              </li>
                              {
                                this.props.connectedPages.map((page, i) => (
                                  <li key={page.pageId} className='m-nav__item'>
                                    <a onClick={() => this.changePage(page.pageName)} className='m-nav__link' style={{cursor: 'pointer'}}>
                                      <span className='m-nav__link-text'>
                                        {page.pageName}
                                      </span>
                                    </a>
                                  </li>
                                ))
                              }
                              <li className='m-nav__separator m-nav__separator--fit' />
                              <li className='m-nav__item'>
                                <a onClick={() => this.hideDropDown} style={{borderColor: '#f4516c'}} className='btn btn-outline-danger m-btn m-btn--pill m-btn--wide btn-sm'>
                                  Cancel
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </li>
              </ul>
            </div> */}
          </div>
          <div className='m-portlet__body'>
            <div className='m-widget21'>
              <div className='row'>
                <div className='col-xl-4'>
                  <Link to='/subscribers' >
                    <div className='m-widget21__item'>
                      <span className='m-widget21__icon'>
                        <a className='btn btn-brand m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'>
                          <i className='fa flaticon-user-ok m--font-light' />
                        </a>
                      </span>
                      <div className='m-widget21__info'>
                        <span className='m-widget21__title'>
                          {this.props.pageLikesSubscribes.subscribers ? this.props.pageLikesSubscribes.subscribers : this.props.firstPage.subscribers }
                        </span>
                        <br />
                        <span className='m-widget21__sub'>
                          Subscribers
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col-xl-4'>
                  <Link to='/subscribers' >
                    <div className='m-widget21__item'>
                      <span className='m-widget21__icon'>
                        <a className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'>
                          <i className='fa fa-thumbs-o-up m--font-light' />
                        </a>
                      </span>
                      <div className='m-widget21__info'>
                        <span className='m-widget21__title'>
                          {this.props.pageLikesSubscribes.likes ? this.props.pageLikesSubscribes.likes : this.props.firstPage.likes}
                        </span>
                        <br />
                        <span className='m-widget21__sub'>
                          Likes
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col-xl-4'>
                  <Link to='/subscribers' >
                    <div className='m-widget21__item'>
                      <span className='m-widget21__icon'>
                        <a className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'>
                          <i className='fa flaticon-users m--font-light' />
                        </a>
                      </span>
                      <div className='m-widget21__info'>
                        <span className='m-widget21__title'>
                          {this.props.pageLikesSubscribes.unsubscribes ? this.props.pageLikesSubscribes.unsubscribes : this.props.firstPage.unsubscribes}
                        </span>
                        <br />
                        <span className='m-widget21__sub'>
                          Unsubscribes
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className='m--space-30' />
              <div className='m-widget15'>
                <div className='m-widget15__item'>
                  <span style={{fontSize: '1.1rem', fontWeight: '600', color: '#6f727d'}}>
                    {convertRate}
                  </span>
                  <span style={{fontSize: '0.85rem', float: 'right', marginTop: '0.3rem', color: '#9699a2'}}>
                    Followers converted into Subscribers
                  </span>
                  <div className='m--space-10' />
                  <div className='progress m-progress--sm' style={{height: '6px'}}>
                    <div className='progress-bar bg-success' role='progressbar' style={{width: convertRate}} aria-valuenow={(this.props.pageLikesSubscribes.subscribers / this.props.pageLikesSubscribes.likes) * 100} aria-valuemin='0' aria-valuemax='100' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageLikesSubscribers
