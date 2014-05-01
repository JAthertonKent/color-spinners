$(function() {
    $('#button').click(function() {
      colorCircles.generateCenters(1, canvas.width, canvas.height)
    })

    function terminationCondition() {
      //  if (i > 6)  clearInterval(s)
    }

    function gameLoop() {
      i++
      colorCircles.generateCircles(i)
      terminationCondition()
    }

    var canvas = document.getElementById('myCanvas')
    canvas.width  = window.innerWidth;
    canvas.height  = window.innerHeight;
    var context = canvas.getContext('2d')
    var timeInterval = 1000 / 60
    var i = 0

    var colorCircles = spinners(context)
    colorCircles.generateCenters(1, canvas.width, canvas.height)
    var s = window.setInterval(gameLoop, timeInterval)
});
