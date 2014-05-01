
var spinner = function(center, context, radius) {
  var that = {}

  that.center = center
  that.context = context
  that.iteration = 0

  that.radius = radius

  function drawLine(a, b) {
    that.context.beginPath()
    that.context.moveTo(a.x, a.y)
    that.context.lineTo(b.x, b.y)
    that.context.stroke()
    that.context.closePath()
  }

  function getHexColorComponent(rgbOffset, random) {
    var frequency = .015
    var amplitude = 255/2
    var waveCenter = 255/2
    var colorDecimal = Math.sin(frequency*that.iteration + (rgbOffset*random))
    var colorFloat = colorDecimal*amplitude + waveCenter
    var colorInt = ~~(colorFloat)
    var hex = colorInt.toString(16)
    return ("00" + hex).substring(hex.length)
  }

  function changeColor(random) {
    var newColor = {red:undefined , green:undefined , blue:undefined }
    var rgbOffset = 0
    for (var property in newColor) {
      newColor[property] = getHexColorComponent(rgbOffset, random)
      rgbOffset++
    }

    color = '#' + newColor.red + newColor.green + newColor.blue
    that.context.strokeStyle = color
  }

  function calculateCircleXY(center) {
    return {
      x: that.center.x + that.radius * Math.cos(that.iteration),
      y: that.center.y + that.radius * Math.sin(that.iteration)
    }
  }

  that.spin = function(random) {
    that.iteration++
    changeColor(random)
    drawLine(calculateCircleXY(that.center), that.center)
  }

  return that
}
