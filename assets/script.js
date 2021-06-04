const cRad = (degrees) => degrees * Math.PI / 180
const cDeg = (radians) => radians * 180 / Math.PI

function Point(angle, circleRadius, asDegrees = true, precision = 6) {
    if (asDegrees) {
        this.degrees = angle
        this.radians = cRad(angle)
    }
    else {
        this.degrees = cDeg(radians)
        this.radians = angle
    }

    this.degrees = this.degrees % 360
    this.radians = this.radians % (Math.PI * 2)

    this.radius = circleRadius
    this.x = Math.cos(this.radians) * this.radius
    this.x = this.x.toFixed(precision)
    this.y = Math.sin(this.radians) * this.radius
    this.y = this.y.toFixed(precision)
};


function printTableData(points) {
    function clearBody() {
        while (tableBody.firstChild) {
            tableBody.firstChild.remove()
        }
    }

    function printBody() {
        clearBody()
        for (var i = 0; i < points.length; i++) {
            tableBody.insertAdjacentHTML('beforeend', ` <tr>
                                                            <th scope="row">${i}</th>
                                                            <td>${points[i].radians}</td>
                                                            <td>${points[i].degrees}</td>
                                                            <td>${points[i].x}</td>
                                                            <td>${points[i].y}</td>
                                                        </tr>`);
        }
    }

    const tableBody = document.getElementById('table-body');
    printBody()
}


function calculate() {
    let holeCount = document.getElementById('hole-count').value
    let circleDia = document.getElementById('circle-dia').value
    let startAng = parseFloat(document.getElementById('start-angle').value)
    let holeInc = 360 / holeCount

    const myPoints = []
    for (var i = startAng; i < 360 + startAng; i += holeInc) {
        myPoints.push(new Point(i, circleDia / 2))
    }

    console.table(myPoints)
    printTableData(myPoints)
}

document.getElementById('calculate')
    .addEventListener('click', calculate)