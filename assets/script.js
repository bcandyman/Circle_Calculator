// constructor used to create a Point object
function Point(angle, circleRadius, precision = 4) {
    // capture input parameters
    this.degrees = angle % 360
    this.radians = cRad(this.degrees)
    this.radius = circleRadius

    // calculate X coordiante value
    this.x = Math.cos(this.radians) * this.radius
    this.x = this.x.toFixed(precision)

    // calculate Y coordiante value
    this.y = Math.sin(this.radians) * this.radius
    this.y = this.y.toFixed(precision)
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
                                <th scope="row">${i}</th>
                                <td>${points[i].degrees}</td>
                                <td>${points[i].x}</td>
                                <td>${points[i].y}</td>
                            </tr>`);
    }
}


// initiates hole position calculations
function calculate() {
    const holeCount = $('#hole-count').val()
    const circleDia = $('#circle-dia').val()
    const startAng = parseFloat($('#start-angle').val())
    const holeInc = 360 / holeCount
    const myPoints = []

    for (var i = startAng; i < 360 + startAng; i += holeInc) {
        myPoints.push(new Point(i, circleDia / 2))
    }

    printTableData(myPoints)
}

$('#calculate').on('click', calculate)