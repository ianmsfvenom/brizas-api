const GIF = require('gif-encoder-2')
const { createCanvas } = require('canvas')
const canvas = createCanvas(480, 270)
const { drawAnimation } = require('./constants/drawAnimation')
const fs = require('fs')
const {
    ANIMATION_SECONDS,
    ANIMATION_SPEEDUP,
    GIF_ANIMATION_FRAME_TIME_DELAY
} = require('./constants/animation')

async function gif(ejectedText, impostorText, characterImages) {
    const gif = new GIF(480,270)
    await gif.start()

    for (let elapsed = 0; elapsed <= ANIMATION_SECONDS; elapsed += (GIF_ANIMATION_FRAME_TIME_DELAY)) {
        await drawAnimation(canvas, ejectedText, impostorText, characterImages, elapsed)
        const image = canvas.getContext('2d')
        gif.setDelay((GIF_ANIMATION_FRAME_TIME_DELAY * 1000) / ANIMATION_SPEEDUP)
        gif.addFrame(image)
    }

    gif.finish()

    return gif.out.getData()
}

module.exports = gif