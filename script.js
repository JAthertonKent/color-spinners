$(function() {

    function drawLine(a, b) {
      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.stroke()
      context.closePath()
    }

    function changeRGB(sinDiff) {
      var newColor = {red:undefined , green:undefined , blue:undefined }
      var j = 0
      for (var property in newColor) {
        colorInt = ~~(Math.sin(.15*i + (j++*sinDiff))*255/2 + 255/2)
        var hex = colorInt.toString(16)
        newColor[property] = ("00" + hex).substring(hex.length)
      }

      return newColor
    }

    function changeColor(sinDiff) {
      var newColor = changeRGB(sinDiff)

      color = '#' + newColor.red + newColor.green + newColor.blue
      context.strokeStyle = color
    }

    function terminationCondition() {
      //  if (i > 6)  clearInterval(s)
    }

    function calculateXY(center) {
      var r = 100
      return {
        x: center.x + r * Math.cos(i+32),
        y: center.y + r * Math.sin(i+32)
      }
    }

    function generateCircles() {
      var blar = 0
      for (var point in centers) {
        changeColor(blar++)
        var center = centers[point]
        drawLine(calculateXY(center), center)
      }
    }

    function gameLoop() {
      i+=1
      generateCircles()
      terminationCondition()
    }

    function generateCenters() {
      var centers = []
      for (var i = 0; i < 50; i++) {
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
