
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

    // initiates hole position calculations
    this.calculate = () => {
        for (var i = this.startAng; i < this.endAng; i += this.incAngle) {
            this.points.push(new Point(i, this.circleRad));
        };
    };
};






// converts value in radians to degrees
// const cDeg = (radians) => radians * 180 / Math.PI


// generates html used to display coordinate data to user
function printTableData(points) {
    const tableBody = $('#table-body');

    tableBody.empty()

    for (var i = 0; i < points.length; i++) {
        tableBody.append(`  <tr>
                                <th scope="row">${i + 1}</th>
                                <td>${points[i].degrees}</td>
                                <td>${points[i].formatted.x}</td>
                                <td>${points[i].formatted.y}</td>
                            </tr>`);
    }
}


// plots the positions onto the canvas
function plot(points, circleDia) {
    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = canvas.width;
    };

    function drawCircle(context, x, y, radius) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
    };

    var c = document.getElementById("plotter")
    var ctx = c.getContext("2d");

    resizeCanvas(c);
    // draw centerpoint
    const cntrPt = { x: c.width * .5, y: c.width * .5 }
    drawCircle(ctx, cntrPt.x, cntrPt.y, 2)

    points.forEach((point) => {
        const muliplier = c.width / circleDia
        const isXPositive = Math.sign(point.formatted.x)
        const isYPositive = Math.sign(point.formatted.y)

        drawCircle(ctx, cntrPt.x + point.x * muliplier - isXPositive * 10, cntrPt.y - point.y * muliplier + isYPositive * 10, 5)
    }, this);
}


$('form').on('submit', (e) => {
    e.preventDefault()

    const startAng = parseFloat($('#start-angle').val());
    const endAng = 360;
    const circleDia = $('#circle-diameter').val();
    const instances = $('#instances').val();
    const tableBody = $('#table-body');
    tableBody.empty()

    const myCalc = new Calculator(startAng, endAng, circleDia, instances)
    myCalc.calculate();

    myCalc.points.forEach((point, i) => {
        tableBody.append(`  <tr>
                                <th scope="row">${i + 1}</th>
                                <td>${point.degrees}</td>
                                <td>${point.formatted.x}</td>
                                <td>${point.formatted.y}</td>
                            </tr>`);
    })
});