
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
