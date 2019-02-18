/* eslint-disable no-undef */
/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import Image from '../../containers/convo/Image'
import List from '../../containers/convo/List'
import Video from '../../containers/convo/Video'
import Audio from '../../containers/convo/Audio'
import File from '../../containers/convo/File'
import Text from '../../containers/convo/Text'
import Card from '../../containers/convo/Card'
import Gallery from '../../containers/convo/Gallery'
import Media from '../../containers/convo/Media'
import { validateFields } from '../../containers/convo/utility'
import StickyDiv from 'react-stickydiv'
import AlertContainer from 'react-alert'
import { browserHistory } from 'react-router'

class LandingPageMessage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      broadcast: [],
      title: this.props.title ? this.props.title : '',
      pages: this.props.pages,
      editMessage: this.props.editMessage ? this.props.editMessage : []
    }
    this.handleMedia = this.handleMedia.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleCard = this.handleCard.bind(this)
    this.handleGallery = this.handleGallery.bind(this)
    this.handleList = this.handleList.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.removeComponent = this.removeComponent.bind(this)
    this.saveMessage = this.saveMessage.bind(this)
    this.goBack = this.goBack.bind(this)
    this.setEditComponents = this.setEditComponents.bind(this)
  }
  setEditComponents () {
    var payload = this.state.editMessage
    var message = []
    var temp = []
    for (var i = 0; i < payload.length; i++) {
      if (payload[i].componentType === 'text') {
        temp.push(<Text id={payload[i].id} pageId={this.props.pageId} key={payload[i].id} handleText={this.handleText} onRemove={this.removeComponent} message={payload[i].text} buttons={payload[i].buttons} removeState />)
        this.setState({list: temp})
        message.push(payload[i])
        this.setState({broadcast: message})
      } else if (payload[i].componentType === 'image') {
        temp.push(<Image id={payload[i].id} pages={this.state.pages} key={payload[i].id} handleImage={this.handleImage} onRemove={this.removeComponent} image={payload[i].image_url} />)
        this.setState({list: temp})
        message.push(payload[i])
        this.setState({broadcast: message})
      } else if (payload[i].componentType === 'audio') {
        temp.push(<Audio id={payload[i].id} pages={this.state.pages} key={payload[i].id} handleFile={this.handleFile} onRemove={this.removeComponent} file={payload[i]} />)
        this.setState({list: temp})
        message.push(payload[i])
        this.setState({broadcast: message})
      } else if (payload[i].componentType === 'video') {
        temp.push(<Video id={payload[i].id} pages={this.state.pages} key={payload[i].id} handleFile={this.handleFile} onRemove={this.removeComponent} file={payload[i]} />)
        this.setState({list: temp})
        message.push(payload[i])
        this.setState({broadcast: message})
      } else if (payload[i].componentType === 'file') {
        temp.push(<File id={payload[i].id} pages={this.state.pages} key={payload[i].id} handleFile={this.handleFile} onRemove={this.removeComponent} file={payload[i]} />)
        this.setState({list: temp})
        message.push(payload[i])
        this.setState({broadcast: message})
      } else if (payload[i].componentType === 'card') {
        temp.push(<Card id={payload[i].id} pageId={this.props.pageId} pages={this.state.pages} key={payload[i].id} handleCard={this.handleCard} onRemove={this.removeComponent} cardDetails={payload[i]} singleCard />)
        this.setState({list: temp})
        message.push(payload[i])
        this.setState({broadcast: message})
      } else if (payload[i].componentType === 'gallery') {
        if (payload[i].cards) {
          for (var m = 0; m < payload[i].cards.length; m++) {
            payload[i].cards[m].id = m
          }
        }
        temp.push(<Gallery id={payload[i].id} pageId={this.props.pageId} pages={this.state.pages} key={payload[i].id} handleGallery={this.handleGallery} onRemove={this.removeComponent} galleryDetails={payload[i]} />)
        this.setState({list: temp})
        message.push(payload[i])
        this.setState({broadcast: message})
      } else if (payload[i].componentType === 'list') {
        temp.push(<List id={payload[i].id} pageId={this.props.pageId} pages={this.state.pages} key={payload[i].id} list={payload[i]} cards={payload[i].listItems} handleList={this.handleList} onRemove={this.removeComponent} />)
        this.setState({list: temp})
        message.push(payload[i])
        this.setState({broadcast: message})
      } else if (payload[i].componentType === 'media') {
        temp.push(<Media id={payload[i].id} pageId={this.props.pageId} pages={this.state.pages} key={payload[i].id} handleMedia={this.handleMedia} onRemove={this.removeComponent} media={payload[i]} />)
        this.setState({list: temp})
        message.push(payload[i])
        this.setState({broadcast: message})
      }
    }
  }
  componentDidMount () {
    this.setEditComponents()
  }
  goBack () {
    if (this.props.module === 'landingPage') {
      browserHistory.push({
        pathname: `/createLandingPage`,
        state: {pageId: this.props.pageId, _id: this.props.pages[0]}
      })
    } else if (this.props.module === 'messengerRefURL') {
      console.log('in back', this.props.module)
      browserHistory.push({
        pathname: `/createMessengerRefURL`,
        state: {pageId: this.props.pageId, _id: this.props.pages[0], module: 'createMessage'}
      })
    }
  }
  saveMessage () {
    if (!validateFields(this.state.broadcast, this.msg)) {
      return
    }
    this.setState({
      editMessage: this.state.broadcast
    })
    this.props.saveMessage(this.state.broadcast)
  }
  handleText (obj) {
    console.log('handleText', obj)
    var temp = this.state.broadcast
    var isPresent = false
    temp.map((data, i) => {
      if (data.id === obj.id) {
        temp[i].text = obj.text
        if (obj.button.length > 0) {
          temp[i].buttons = obj.button
        } else {
          delete temp[i].buttons
        }
        isPresent = true
      }
    })

    if (!isPresent) {
      if (obj.button.length > 0) {
        temp.push({id: obj.id, text: obj.text, componentType: 'text', buttons: obj.button})
      } else {
        temp.push({id: obj.id, text: obj.text, componentType: 'text'})
      }
    }

    this.setState({broadcast: temp})
  }

  handleCard (obj) {
    if (obj.error) {
      if (obj.error === 'invalid image') {
        this.msg.error('Please select an image of type jpg, gif, bmp or png')
      }
      return
    }
    var temp = this.state.broadcast
    var isPresent = false
    temp.map((data, i) => {
      if (data.id === obj.id) {
        temp[i].fileName = obj.fileName
        temp[i].fileurl = obj.fileurl
        temp[i].image_url = obj.image_url
        temp[i].size = obj.size
        temp[i].type = obj.type
        temp[i].title = obj.title
        temp[i].buttons = obj.buttons
        temp[i].description = obj.description
        if (obj.default_action && obj.default_action !== '') {
          temp[i].default_action = obj.default_action
        } else if (temp[i].default_action) {
          delete temp[i].default_action
        }
        isPresent = true
      }
    })
    if (!isPresent) {
      temp.push(obj)
    }
    this.setState({broadcast: temp})
  }

  handleMedia (obj) {
    if (obj.error) {
      if (obj.error === 'invalid image') {
        this.msg.error('Please select an image of type jpg, gif, bmp or png')
        return
      }
      if (obj.error === 'file size error') {
        this.msg.error('File size cannot exceed 25MB')
        return
      }
      if (obj.error === 'invalid file') {
        this.msg.error('File is not valid')
        return
      }
    }
    var temp = this.state.broadcast
    var isPresent = false
    temp.map((data, i) => {
      if (data.id === obj.id) {
        temp[i].fileName = obj.fileName
        temp[i].mediaType = obj.mediaType
        temp[i].fileurl = obj.fileurl
        temp[i].image_url = obj.image_url
        temp[i].size = obj.size
        temp[i].type = obj.type
        temp[i].buttons = obj.buttons
        isPresent = true
      }
    })
    if (!isPresent) {
      temp.push(obj)
    }
    this.setState({broadcast: temp})
  }

  handleGallery (obj) {
    var temp = this.state.broadcast
    var isPresent = false
    if (obj.cards) {
      obj.cards.forEach((d) => {
        delete d.id
      })
    }
    temp.map((data, i) => {
      if (data.id === obj.id) {
        temp[i].cards = obj.cards
        isPresent = true
      }
    })
    if (!isPresent) {
      temp.push(obj)
    }
    this.setState({broadcast: temp})
  }

  handleImage (obj) {
    var temp = this.state.broadcast
    var isPresent = false
    temp.map((data, i) => {
      if (data.id === obj.id) {
        temp[i] = obj
        isPresent = true
      }
    })

    if (!isPresent) {
      temp.push(obj)
    }

    this.setState({broadcast: temp})
  }

  handleFile (obj) {
    var temp = this.state.broadcast
    var isPresent = false
    temp.map((data, i) => {
      if (data.id === obj.id) {
        temp[i] = obj
        isPresent = true
      }
    })

    if (!isPresent) {
      temp.push(obj)
    }

    this.setState({broadcast: temp})
  }
  handleList (obj) {
    console.log('in create convo handleList', obj)
    var temp = this.state.broadcast
    var isPresent = false
    obj.listItems.forEach((d) => {
      delete d.id
    })
    temp.map((data, i) => {
      if (data.id === obj.id) {
        temp[i].listItems = obj.listItems
        temp[i].topElementStyle = obj.topElementStyle
        temp[i].buttons = obj.buttons
        isPresent = true
      }
    })
    if (!isPresent) {
      temp.push(obj)
    }
    console.log('temp', temp)
    this.setState({broadcast: temp})
  }

  removeComponent (obj) {
    console.log('obj in removeComponent', obj)
    var temp = this.state.list.filter((component) => { return (component.props.id !== obj.id) })
    var temp2 = this.state.broadcast.filter((component) => { return (component.id !== obj.id) })
    console.log('temp', temp)
    console.log('temp2', temp2)
    this.setState({list: temp, broadcast: temp2})
  }
  render () {
    let timeStamp = new Date().getTime()
    console.log('timeStamp', timeStamp)
    var alertOptions = {
      offset: 75,
      position: 'top right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    }
    return (
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <AlertContainer ref={a => { this.msg = a }} {...alertOptions} />
        <div className='m-content'>
          <div className='row'>

            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <div className='row' >
                <div className='col-3'>
                  <div className='ui-block hoverbordercomponent' id='text' onClick={() => { var temp = this.state.list; this.msg.info('New Text Component Added'); this.setState({list: [...temp, <Text id={timeStamp} pageId={this.props.pageId} key={timeStamp} handleText={this.handleText} onRemove={this.removeComponent} removeState />]}); this.handleText({id: timeStamp, text: '', button: []}) }}>
                    <div className='align-center'>
                      <img src='https://cdn.cloudkibo.com/public/icons/text.png' alt='Text' style={{maxHeight: 25}} />
                      <h6>Text</h6>
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <div className='ui-block hoverbordercomponent' onClick={() => { var temp = this.state.list; this.msg.info('New Image Component Added'); this.setState({list: [...temp, <Image id={timeStamp} pages={this.state.pages} key={timeStamp} handleImage={this.handleImage} onRemove={this.removeComponent} />]}); this.handleImage({id: timeStamp, componentType: 'image', image_url: '', fileurl: ''}) }}>
                    <div className='align-center'>
                      <img src='https://cdn.cloudkibo.com/public/icons/picture.png' alt='Image' style={{maxHeight: 25}} />
                      <h6>Image</h6>
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <div className='ui-block hoverbordercomponent' onClick={() => { var temp = this.state.list; this.msg.info('New Card Component Added'); this.setState({list: [...temp, <Card id={timeStamp} pageId={this.props.pageId} pages={this.state.pages} key={timeStamp} handleCard={this.handleCard} onRemove={this.removeComponent} singleCard />]}); this.handleCard({id: timeStamp, componentType: 'card', title: '', description: '', fileurl: '', buttons: []}) }}>
                    <div className='align-center'>
                      <img src='https://cdn.cloudkibo.com/public/icons/card.png' alt='Card' style={{maxHeight: 25}} />
                      <h6>Card</h6>
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <div className='ui-block hoverbordercomponent' onClick={() => { var temp = this.state.list; this.msg.info('New Gallery Component Added'); this.setState({list: [...temp, <Gallery id={timeStamp} pageId={this.props.pageId} pages={this.state.pages} key={timeStamp} handleGallery={this.handleGallery} onRemove={this.removeComponent} />]}); this.handleGallery({id: timeStamp, componentType: 'gallery', cards: []}) }}>
                    <div className='align-center'>
                      <img src='https://cdn.cloudkibo.com/public/icons/layout.png' alt='Gallery' style={{maxHeight: 25}} />
                      <h6>Gallery</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-3'>
                  <div className='ui-block hoverbordercomponent' onClick={() => { var temp = this.state.list; this.msg.info('New Audio Component Added'); this.setState({list: [...temp, <Audio id={timeStamp} pages={this.state.pages} key={timeStamp} handleFile={this.handleFile} onRemove={this.removeComponent} />]}); this.handleFile({id: timeStamp, componentType: 'audio', fileurl: ''}) }}>
                    <div className='align-center'>
                      <img src='https://cdn.cloudkibo.com/public/icons/speaker.png' alt='Audio' style={{maxHeight: 25}} />
                      <h6>Audio</h6>
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <div className='ui-block hoverbordercomponent' onClick={() => { var temp = this.state.list; this.msg.info('New Video Component Added'); this.setState({list: [...temp, <Video id={timeStamp} pages={this.state.pages} key={timeStamp} handleFile={this.handleFile} onRemove={this.removeComponent} />]}); this.handleFile({id: timeStamp, componentType: 'video', fileurl: ''}) }}>
                    <div className='align-center'>
                      <img src='https://cdn.cloudkibo.com/public/icons/video.png' alt='Video' style={{maxHeight: 25}} />
                      <h6>Video</h6>
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <div className='ui-block hoverbordercomponent' onClick={() => { var temp = this.state.list; this.msg.info('New File Component Added'); this.setState({list: [...temp, <File id={timeStamp} pages={this.state.pages} key={timeStamp} handleFile={this.handleFile} onRemove={this.removeComponent} />]}); this.handleFile({id: timeStamp, componentType: 'file', fileurl: ''}) }}>
                    <div className='align-center'>
                      <img src='https://cdn.cloudkibo.com/public/icons/file.png' alt='File' style={{maxHeight: 25}} />
                      <h6>File</h6>
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <div className='ui-block hoverbordercomponent' onClick={() => { var temp = this.state.list; this.msg.info('New List Component Added'); this.setState({list: [...temp, <List id={timeStamp} pageId={this.props.pageId} pages={this.state.pages} key={timeStamp} handleList={this.handleList} onRemove={this.removeComponent} />]}); this.handleList({id: timeStamp, componentType: 'list', listItems: [], topElementStyle: 'compact'}) }}>
                    <div className='align-center'>
                      <img src='https://cdn.cloudkibo.com/public/icons/list.png' alt='List' style={{maxHeight: 25}} />
                      <h6>List</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-3'>
                  <div className='ui-block hoverbordercomponent' onClick={() => { var temp = this.state.list; this.msg.info('New Media Component Added'); this.setState({list: [...temp, <Media id={timeStamp} pageId={this.props.pageId} pages={this.state.pages} key={timeStamp} handleMedia={this.handleMedia} onRemove={this.removeComponent} />]}); this.handleMedia({id: timeStamp, componentType: 'media', fileurl: '', buttons: []}) }}>
                    <div className='align-center'>
                      <img src='https://cdn.cloudkibo.com/public/icons/media.png' alt='Media' style={{maxHeight: 25}} />
                      <h6>Media</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <button style={{float: 'left', marginLeft: 20, marginTop: 20}} id='save' onClick={() => this.saveMessage()} className='btn btn-primary' disabled={(this.state.broadcast.length === 0)}> Save </button>
                <button onClick={this.goBack} style={{float: 'left', marginLeft: 20, marginTop: '20px'}} className='btn btn-primary'> Back </button>
              </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <StickyDiv zIndex={1}>
                <div style={{border: '1px solid #ccc', borderRadius: '0px', backgroundColor: '#e1e3ea'}} className='ui-block'>
                  <div style={{padding: '5px'}}>
                    <h3>{this.state.title ? this.state.title : 'Message Title'}</h3>
                  </div>
                </div>
              </StickyDiv>
              <div className='ui-block' style={{height: 90 + 'vh', overflowY: 'scroll', marginTop: '-15px', paddingLeft: 75, paddingRight: 75, paddingTop: 30, borderRadius: '0px', border: '1px solid #ccc'}}>
                {/* <h4  className="align-center" style={{color: '#FF5E3A', marginTop: 100}}> Add a component to get started </h4> */}
                {this.state.list}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPageMessage
