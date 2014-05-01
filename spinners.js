
var spinners = function(context) {
  var that = {}

  that.context = context
  that.centers = undefined

  function drawLine(a, b) {
    that.context.beginPath()
    that.context.moveTo(a.x, a.y)
    that.context.lineTo(b.x, b.y)
    that.context.stroke()
    that.context.closePath()
  }

  function getHexColorComponent(rgbOffset, random, iteration) {
    var frequency = .015
    var amplitude = 255/2
    var waveCenter = 255/2
    var colorDecimal = Math.sin(frequency*iteration + (rgbOffset*random))
    var colorFloat = colorDecimal*amplitude + waveCenter
    var colorInt = ~~(colorFloat)
    var hex = colorInt.toString(16)
    return ("00" + hex).substring(hex.length)
  }

  function changeColor(random, i) {
    var newColor = {red:undefined , green:undefined , blue:undefined }
    var rgbOffset = 0
    for (var property in newColor) {
      newColor[property] = getHexColorComponent(rgbOffset, random, i)
      rgbOffset++
    }

    color = '#' + newColor.red + newColor.green + newColor.blue
    that.context.strokeStyle = color
  }

  function calculateCircleXY(center, i) {
    var radius = 400
    return {
      x: center.x + radius * Math.cos(i),
      y: center.y + radius * Math.sin(i)
    }
  }

  that.generateCircles = function(i) {
    var center
    var random = 0
    for (var point in that.centers) {
      changeColor(random++, i)
      center = that.centers[point]
      drawLine(calculateCircleXY(center, i), center)
    }
  }

  that.generateCenters = function(centerNo, maxWidth, maxHeight) {
    that.centers = that.centers || []
    for (var i = 0; i < centerNo; i++) {
      that.centers.push({
        x: Math.floor((Math.random()*maxWidth)+1),
        y: Math.floor((Math.random()*maxHeight)+1)
      })
    }
  }
  return that
}
