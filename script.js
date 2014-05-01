WIDTH = window.innerWidth
HEIGHT = window.innerHeight;

$(function() {
    $('#button').click(function() {
      colorCircles.generateCenters(1, canvas.width, canvas.height)
    })

    function gameLoop() {
      colorCircles.generateCircles()
    }

    var canvas = document.getElementById('myCanvas')
    $(canvas).attr("width", WIDTH).attr("height", HEIGHT);
    var context = canvas.getContext('2d')

    var colorCircles = spinnerManager(context)
    colorCircles.generateCenters(1)

    var timeInterval = 1000 / 60
    window.setInterval(gameLoop, timeInterval)
});
