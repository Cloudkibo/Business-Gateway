import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StickerPipeClient from './client'
import Storage from './storage'
import MyStickerPacks from './components/my-sticker-packs.js'
import StickerPack from './components/sticker-pack.js'
import parseResponse from './parse-response'
import defaultColors from './default-colors'

class StickerMenu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stickerPacks: [],
      pack: {},
      shop: true
    }

    this.client = new StickerPipeClient(props.apiKey, props.userId, 'https://api.stickerpipe.com/api/v2')
    this.storage = new Storage(props.userId)

    this.getMyPacks = this.getMyPacks.bind(this)
    this.showPack = this.showPack.bind(this)
    this.toggleShop = this.toggleShop.bind(this)
  }

  getChildContext () {
    return {
      client: this.client,
      storage: this.storage
    }
  }

  componentDidMount () {
    this.getMyPacks(this.showPack)
  }

  getMyPacks (callback) {
    const storedPacks = this.storage.getMyPacks()

    if (storedPacks && storedPacks.length > 0) {
      if (callback) {
        callback(storedPacks[0].pack_name)
      }

      this.setState({
        stickerPacks: storedPacks
      })

      return false
    }

    this.client.getMyPacks((err, res) => {
      if (err) {
        console.error(err)

        return false
      }

      const stickerPacks = parseResponse(res)

      if (callback) {
        callback(stickerPacks[0].pack_name)
      }

      this.storage.storeMyPacks(stickerPacks)

      this.setState({
        stickerPacks
      })

      return false
    })

    return false
  }

  showPack (packName) {
    const { client, storage } = this

    const storedPack = storage.getPack(packName)

    if (storedPack) {
      this.setState({
        pack: storedPack,
        shop: false
      })

      return false
    }

    client.purchasePack(packName, (err, res) => {
      if (err) {
        console.error(err)

        return false
      }

      const pack = parseResponse(res)

      storage.storePack(pack.pack_name, pack.title, pack.stickers)

      this.setState({
        pack,
        shop: false
      })

      return false
    })

    return false
  }

  toggleShop () {
    this.setState({
      shop: !this.state.shop
    })
  }

  render () {
    const { sendSticker, colors } = this.props
    const { stickerPacks, pack, shop } = this.state

    const mergedColors = Object.assign(defaultColors, colors)

    return (
      <section className='sticker-menu'>
        <div style={{border: '1px solid #e0e0eb', width: '250px'}}>
          <MyStickerPacks
            stickerPacks={stickerPacks}
            showPack={this.showPack}
            toggleShop={this.toggleShop}
            shop={shop}
            colors={mergedColors}
        />
        </div>
        {
          (pack && pack.stickers) && !shop
          ? <div style={{border: '1px solid #e0e0eb', overflow: 'scroll', width: '250px', height: '280px'}}>
            <StickerPack pack={pack} sendSticker={sendSticker} />
          </div>
          : null
        }
      </section>
    )
  }
}

StickerMenu.propTypes = {
  apiKey: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  sendSticker: PropTypes.func.isRequired,
  toggleButton: React.PropTypes.element,
  colors: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string
  })
}

StickerMenu.defaultProps = {
  colors: defaultColors,
  toggleButton: null
}

StickerMenu.childContextTypes = {
  client: PropTypes.shape({
    getMyPacks: PropTypes.func.isRequired,
    purchasePack: PropTypes.func.isRequired
  }).isRequired,
  storage: PropTypes.shape({
    storePack: PropTypes.func.isRequired,
    getPack: PropTypes.func.isRequired
  }).isRequired
}

export default StickerMenu
