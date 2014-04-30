$(function() {
    $('#button').click(function() {
      alert("hey")
    })

    function drawLine(a, b) {
      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.stroke()
      context.closePath()
    }

    function getHexColorComponent(rgbOffset, random) {
      var frequency = .015
      var amplitude = 255/2
      var waveCenter = 255/2
      var colorDecimal = Math.sin(frequency*i + (rgbOffset*random))
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
      var center
      var random = 0
      for (var point in centers) {
        changeColor(random++)
        center = centers[point]
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
      for (var i = 0; i < 22; i++) {
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
