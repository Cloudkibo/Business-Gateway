/* eslint-disable no-return-assign */
/**
 * Created by imran on 11/11/2017.
 */

import React from 'react'

class CardsWithProgress extends React.Component {
  render () {
    var broadcastSeenConvertRate = this.props.data.broadcast.broadcastSentCount !== 0 ? ((this.props.data.broadcast.broadcastSeenCount / this.props.data.broadcast.broadcastSentCount) * 100).toFixed(1) + '%' : '0%'
    var pollSeenConvertRate = this.props.data.poll.pollSentCount !== 0 ? ((this.props.data.poll.pollSeenCount / this.props.data.poll.pollSentCount) * 100).toFixed(1) + '%' : '0%'
    var pollResponseConvertRate = this.props.data.poll.pollSentCount !== 0 ? ((this.props.data.poll.pollResponseCount / this.props.data.poll.pollSentCount) * 100).toFixed(1) + '%' : '0%'
    var surveySeenConvertRate = this.props.data.survey.surveySentCount !== 0 ? ((this.props.data.survey.surveySeenCount / this.props.data.survey.surveySentCount) * 100).toFixed(1) + '%' : '0%'
    var surveyResponseConvertRate = this.props.data.survey.surveySentCount !== 0 ? ((this.props.data.survey.surveyResponseCount / this.props.data.survey.surveySentCount) * 100).toFixed(1) + '%' : '0%'
    return (
      <div className='row'>
        <div className='col-xl-4'>
          <div className='m-portlet m-portlet--bordered-semi m-portlet--full-height'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  <h3 className='m-portlet__head-text'>
                    Broadcasts
                  </h3>
                </div>
              </div>
            </div>
            <div className='m-portlet__body'>
              <div style={{fontSize: '2.5em', fontWeight: '500'}} className='m--font-success'>
                {this.props.data.broadcast.broadcastSentCount ? this.props.data.broadcast.broadcastSentCount : 0}
              </div>
              <div className='m--space-10' />
              <div className='m-widget15'>
                <div className='m-widget15__items'>
                  <div className='row'>
                    <div className='col'>
                      <div className='m-widget15__item'>
                        <span className='m-widget15__stats'>
                          {broadcastSeenConvertRate}
                        </span>
                        <span className='m-widget15__text'>
                          Seen
                        </span>
                        <div className='m--space-10' />
                        <div className='progress m-progress--sm' style={{height: '6px'}}>
                          <div className='progress-bar bg-primary' role='progressbar' style={{width: broadcastSeenConvertRate}} aria-valuenow={(this.props.data.broadcast.broadcastSeenCount / this.props.data.broadcast.broadcastSentCount) * 100} aria-valuemin='0' aria-valuemax='100' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-4'>
          <div className='m-portlet m-portlet--bordered-semi m-portlet--full-height'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  <h3 className='m-portlet__head-text'>
                    Polls
                  </h3>
                </div>
              </div>
            </div>
            <div className='m-portlet__body'>
              <div style={{fontSize: '2.5em', fontWeight: '500'}} className='m--font-primary'>
                {this.props.data.poll.pollSentCount ? this.props.data.poll.pollSentCount : 0}
              </div>
              <div className='m--space-10' />
              <div className='m-widget15'>
                <div className='m-widget15__items'>
                  <div className='row'>
                    <div className='col'>
                      <div className='m-widget15__item'>
                        <span className='m-widget15__stats'>
                          {pollSeenConvertRate}
                        </span>
                        <span className='m-widget15__text'>
                          Seen
                        </span>
                        <div className='m--space-10' />
                        <div className='progress m-progress--sm' style={{height: '6px'}}>
                          <div className='progress-bar bg-primary' role='progressbar' style={{width: pollSeenConvertRate}} aria-valuenow={(this.props.data.poll.pollSeenCount / this.props.data.poll.pollSentCount) * 100} aria-valuemin='0' aria-valuemax='100' />
                        </div>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='m-widget15__item'>
                        <span className='m-widget15__stats'>
                          {pollResponseConvertRate}
                        </span>
                        <span className='m-widget15__text'>
                          Responded
                        </span>
                        <div className='m--space-10' />
                        <div className='progress m-progress--sm' style={{height: '6px'}}>
                          <div className='progress-bar bg-success' role='progressbar' style={{width: pollResponseConvertRate}} aria-valuenow={(this.props.data.poll.pollResponseCount / this.props.data.poll.pollSentCount) * 100} aria-valuemin='0' aria-valuemax='100' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-4'>
          <div className='m-portlet m-portlet--bordered-semi m-portlet--full-height'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  <h3 className='m-portlet__head-text'>
                    Surveys
                  </h3>
                </div>
              </div>
            </div>
            <div className='m-portlet__body'>
              <div style={{fontSize: '2.5em', fontWeight: '500'}} className='m--font-warning'>
                {this.props.data.survey.surveySentCount ? this.props.data.survey.surveySentCount : 0}
              </div>
              <div className='m--space-10' />
              <div className='m-widget15'>
                <div className='m-widget15__items'>
                  <div className='row'>
                    <div className='col'>
                      <div className='m-widget15__item'>
                        <span className='m-widget15__stats'>
                          {surveySeenConvertRate}
                        </span>
                        <span className='m-widget15__text'>
                          Seen
                        </span>
                        <div className='m--space-10' />
                        <div className='progress m-progress--sm' style={{height: '6px'}}>
                          <div className='progress-bar bg-primary' role='progressbar' style={{width: surveySeenConvertRate}} aria-valuenow={(this.props.data.survey.surveySeenCount / this.props.data.survey.surveySentCount) * 100} aria-valuemin='0' aria-valuemax='100' />
                        </div>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='m-widget15__item'>
                        <span className='m-widget15__stats'>
                          {surveyResponseConvertRate}
                        </span>
                        <span className='m-widget15__text'>
                          Responded
                        </span>
                        <div className='m--space-10' />
                        <div className='progress m-progress--sm' style={{height: '6px'}}>
                          <div className='progress-bar bg-success' role='progressbar' style={{width: surveyResponseConvertRate}} aria-valuenow={(this.props.data.survey.surveyResponseCount / this.props.data.survey.surveySentCount) * 100} aria-valuemin='0' aria-valuemax='100' />
                        </div>
                      </div>
                    </div>
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

export default CardsWithProgress
