
var spinnerManager = function(context) {
  var that = {}

  that.context = context
  that.centers = []

  that.generateCircles = function() {
    var center
    var random = 0
    for (var point in that.centers) {
      center = that.centers[point]
      center.spin(random++)
    }
  }

  that.generateCenters = function(centerNo) {
    for (var i = 0; i < centerNo; i++) {
      that.centers.push(spinner({
        x: Math.floor((Math.random()*WIDTH)+1),
        y: Math.floor((Math.random()*HEIGHT)+1)
      }, that.context))
    }
  }

  return that
}

var spinner = function(center, context) {
  var that = {}

  that.center = center
  that.context = context
  that.iteration = 0

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
    var radius = 400
    return {
      x: that.center.x + radius * Math.cos(that.iteration),
      y: that.center.y + radius * Math.sin(that.iteration)
    }
  }

  that.spin = function(random) {
    that.iteration++
    changeColor(random)
    drawLine(calculateCircleXY(that.center), that.center)
  }

  return that
}
