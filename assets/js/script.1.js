// constructor used to create a Point object
function Point(angle, circleRadius, precision = 4) {
    // capture input parameters
    this.degrees = angle % 360
    this.radians = cRad(this.degrees)
    this.radius = circleRadius

    // calculate X, Y coordinate values
    this.x = Math.cos(this.radians) * this.radius
    this.y = Math.sin(this.radians) * this.radius

    this.formatted = {
        x: Number(this.x.toFixed(4)),
        y: Number(this.y.toFixed(4))
    }
};

// converts value in degrees to radians
const cRad = (degrees) => degrees * Math.PI / 180

// converts value in radians to degrees
const cDeg = (radians) => radians * 180 / Math.PI


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


// initiates hole position calculations
function calculate() {
    const holeCount = $('#instances').val()
    const circleDia = $('#circle-diameter').val()
    const startAng = parseFloat($('#start-angle').val())
    const holeInc = 360 / holeCount
    const myPoints = []

    for (var i = startAng; i < 360 + startAng; i += holeInc) {
        myPoints.push(new Point(i, circleDia / 2))
    }

    printTableData(myPoints)
    plot(myPoints, circleDia)
}

$('form').on('submit', (e) => {
    e.preventDefault()
    calculate()
})

