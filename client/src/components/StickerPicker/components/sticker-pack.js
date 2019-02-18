import React from 'react'
import PropTypes from 'prop-types'

function StickerPack ({ pack, sendSticker }) {
  return (
    <section className='sticker-pack'>
      <section className='stickers'>
        {pack.stickers.map(sticker => (
          <img style={{width: '64px', height: '64px'}}
            className='sticker'
            onClick={() => sendSticker(sticker)}
            src={sticker.image.mdpi}
            alt='sticker'
          />
        ))}
      </section>
    </section>
  )
}

StickerPack.propTypes = {
  pack: PropTypes.shape({
    title: PropTypes.string.isRequired,
    stickers: PropTypes.arrayOf(
      PropTypes.shape({
        content_id: PropTypes.number.isRequired,
        image: PropTypes.shape({
          mdpi: PropTypes.string.isRequired,
          hdpi: PropTypes.string.isRequired,
          xhdpi: PropTypes.string.isRequired,
          xxhdpi: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  sendSticker: PropTypes.func.isRequired
}

export default StickerPack
