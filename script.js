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

    function gameLoop() {
      i+=1
      drawLine(calculateXY(center), center)
      changeColor(0)
      side = {x:100, y:canvas.height/2}
      drawLine(calculateXY(side), side)
      changeColor(2)
      terminationCondition()
    }

    var canvas = document.getElementById('myCanvas')
    canvas.width  = window.innerWidth;
    canvas.height  = window.innerHeight;
    var context = canvas.getContext('2d')
    var center = {x:canvas.width/2, y:canvas.height/2}
    var timeInterval = 1000 / 60
    var i = 0
    var color = '#CC00FF'

    var s = window.setInterval(gameLoop, timeInterval)
});
