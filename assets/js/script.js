
// constructor used to create a Bolt hole arc calculator
function BoltArcCalculator(startAng, endAng, circleDia, instances) {
  // constructor used to create a Point object
  function Point(angle, circleRadius, precision = 4) {

    // converts value in degrees to radians
    const cRad = (degrees) => degrees * Math.PI / 180;

    // capture input parameters
    this.degrees = angle % 360;
    this.radians = cRad(this.degrees);
    this.radius = circleRadius;

    this.x = Math.cos(this.radians) * this.radius;
    this.y = Math.sin(this.radians) * this.radius;
    this.formatted = {
      x: Number(this.x.toFixed(4)),
      y: Number(this.y.toFixed(4))
    };
  };

  this.instances = instances;
  this.startAng = startAng;
  this.incAngle = (endAng - startAng) / this.instances
  this.endAng = endAng;
  this.circleDia = circleDia;
  this.circleRad = circleDia / 2;
  this.points = [];


  this.printPointsToTable = (table) => {
    table.empty()
    this.points.forEach((point, i) => {
      table.append(`<tr>
                      <th scope="row">${i + 1}</th>
                      <td>${point.degrees}</td>
                      <td>${point.formatted.x}</td>
                      <td>${point.formatted.y}</td>
                    </tr>`);
    })
  };


  // plots the positions onto the canvas
  this.plotToCanvas = (canvas, context) => {
    function drawCircle(x, y, radius) {
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fill();
    };

    function drawLine(startX, startY, endX, endY, style) {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.strokeStyle = style
      context.stroke();
    }

    // draw centerpoint
    const cntrPt = { x: canvas.width * .5, y: canvas.width * .5 }
    drawCircle(cntrPt.x, cntrPt.y, 2)

    // draw origin lines
    drawLine(0, cntrPt.y, canvas.width, cntrPt.y, '#F4D03F')
    drawLine(cntrPt.x, 0, cntrPt.x, canvas.height, '#F4D03F')

    this.points.forEach((point) => {
      const muliplier = canvas.width / this.circleDia
      const isXPositive = Math.sign(point.formatted.x)
      const isYPositive = Math.sign(point.formatted.y)

      drawCircle(cntrPt.x + point.x * muliplier - isXPositive * 10, cntrPt.y - point.y * muliplier + isYPositive * 10, 5)
    }, this);
  }


  // initiates hole position calculations
  this.calculate = () => {
    for (var i = this.startAng; i < this.endAng; i += this.incAngle) {
      this.points.push(new Point(i, this.circleRad));
    };
  };
};



$('form').on('submit', (e) => {
  e.preventDefault();

  const resizeCanvas = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = canvas.width;
  };

  const startAng = parseFloat($('#start-angle').val());
  const endAng = startAng + 360;
  const circleDia = $('#circle-diameter').val();
  const instances = $('#instances').val();
  const table = $('#table-body');
  const canvas = document.getElementById("plotter");
  const context = canvas.getContext("2d");

  resizeCanvas(canvas)

  const myCalc = new BoltArcCalculator(startAng, endAng, circleDia, instances);
  myCalc.calculate();
  myCalc.printPointsToTable(table);
  myCalc.plotToCanvas(canvas, context);
});


