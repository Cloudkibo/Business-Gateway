import React from 'react'
import PropTypes from 'prop-types'

function MyStickerPacks ({ stickerPacks, shop, toggleShop, showPack, colors }) {
  return (
    <section className='my-packs'>
      <section className='pack-list'>
        <div className='stickers-tab'>
          <div className='stickers' >
            {
              stickerPacks.length > 0
              ? stickerPacks.map(stickerPack => (
                <img style={{width: '50px', height: '50px', cursor: 'pointer'}}
                  className='sticker'
                  onClick={() => showPack(stickerPack.pack_name)}
                  src={stickerPack.main_icon.mdpi}
                  alt='sticker'
                />

              ))
              : <p>Loading...</p>
            }
          </div>
        </div>

      </section>
    </section>
  )
}

MyStickerPacks.propTypes = {
  stickerPacks: PropTypes.arrayOf(PropTypes.shape({
    pack_name: PropTypes.string.isRequired,
    main_icon: PropTypes.shape({
      mdpi: PropTypes.string.isRequired,
      hdpi: PropTypes.string.isRequired,
      xhdpi: PropTypes.string.isRequired,
      xxhdpi: PropTypes.string.isRequired
    }).isRequired
  })).isRequired,
  showPack: React.PropTypes.func.isRequired,
  toggleShop: React.PropTypes.func.isRequired,
  shop: React.PropTypes.bool.isRequired,
  colors: PropTypes.shape({
    primary: PropTypes.string.isRequired
  }).isRequired
}

export default MyStickerPacks
