const faceapi = require('@vladmandic/face-api')  
const canvas = require("canvas")  
const fs = require("fs")  
const path = require("path")

async function facedetect(file, filename) {
    // mokey pathing the faceapi canvas
    const { Canvas, Image, ImageData } = canvas  
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

    const faceDetectionNet = faceapi.nets.ssdMobilenetv1

    // SsdMobilenetv1Options
    const minConfidence = 0.5

    // TinyFaceDetectorOptions
    const inputSize = 408  
    const scoreThreshold = 0.5

    // MtcnnOptions
    const minFaceSize = 50  
    const scaleFactor = 0.8

    function getFaceDetectorOptions(net) {  
        return net === faceapi.nets.ssdMobilenetv1
            ? new faceapi.SsdMobilenetv1Options({ minConfidence })
            : (net === faceapi.nets.tinyFaceDetector
                ? new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
                : new faceapi.MtcnnOptions({ minFaceSize, scaleFactor })
            )
    }

    const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet)

    // simple utils to save files
    const baseDir = path.resolve(__dirname, './')  
    function saveFile(fileName, buf) {  
        if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir)
        }
        // this is ok for prototyping but using sync methods
        // is bad practice in NodeJS
        fs.writeFileSync(path.resolve(baseDir, fileName), buf)
    }
    // load weights
    await faceDetectionNet.loadFromDisk('weights')
    await faceapi.nets.faceLandmark68Net.loadFromDisk('weights')
    await faceapi.nets.ageGenderNet.loadFromDisk('weights')
    // load the image
    const img = await canvas.loadImage(file)

    // detect the faces with landmarks
    const results = await faceapi.detectAllFaces(img, faceDetectionOptions).withAgeAndGender()
    // create a new canvas and draw the detection and landmarks
    const out = faceapi.createCanvasFromMedia(img)
    faceapi.draw.drawDetections(out, results)

    // save the new canvas as image
    saveFile(filename, out.toBuffer('image/png'))
    const data = []
    for(let objs of results) {
        data.push({
            gender: objs.gender,
            probality_gender: objs.genderProbability.toFixed(2)*100+'%',
            age: parseInt(objs.age)
        })
    }
    return data
}

module.exports = facedetect