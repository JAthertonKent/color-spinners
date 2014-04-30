$(function() {

    function drawLine(a, b) {
      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.stroke()
      context.closePath()
    }

    function changeColor(sinDiff) {
      var newColor = {red:undefined , green:undefined , blue:undefined }
      var offsetMultiplier = 0
      var frequency = .15
      for (var property in newColor) {
        colorDecimal = Math.sin(frequency*i + (offsetMultiplier++*sinDiff))
        var colorFloat = colorDecimal*255/2 + 255/2
        var colorInt = ~~(colorFloat)
        var hex = colorInt.toString(16)
        newColor[property] = ("00" + hex).substring(hex.length)
      }

      color = '#' + newColor.red + newColor.green + newColor.blue
      context.strokeStyle = color
    }

    function terminationCondition() {
      //  if (i > 6)  clearInterval(s)
    }

    function calculateCircleXY(center) {
      var radius = 400
      return {
        x: center.x + radius * Math.cos(i),
        y: center.y + radius * Math.sin(i)
      }
    }

    function generateCircles() {
      var sinOffset = 2
      for (var point in centers) {
        changeColor(sinOffset++)
        var center = centers[point]
        drawLine(calculateCircleXY(center), center)
      }
    }

    function gameLoop() {
      i++
      generateCircles()
      terminationCondition()
    }

    function generateCenters() {
      var centers = []
      for (var i = 0; i < 1; i++) {
        centers.push({
          x: Math.floor((Math.random()*canvas.width)+1),
          y: Math.floor((Math.random()*canvas.height)+1)
        })
      }
      return centers
    }

    var canvas = document.getElementById('myCanvas')
    canvas.width  = window.innerWidth;
    canvas.height  = window.innerHeight;
    var context = canvas.getContext('2d')
    var timeInterval = 1000 / 60
    var i = 0

    var centers = generateCenters()
    var s = window.setInterval(gameLoop, timeInterval)
});
