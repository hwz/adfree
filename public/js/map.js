var datacenterLocations = new Array();

var jobsdata[];
jobsdata.done = randomRange(400, 800);
jobsdata.current = 0;

function dataCenterLocation(x, y) {
    this.x = x;
    this.y = y;
}

function fillDataCenter(count) {
    for (i=0; i<count; i++) {
        var x, y;
        var weight = Math.random();
        if (weight < 0.7) {
            x = randomRange(100, 210);
        } else { 
           x = randomRange(211, 730);
        }

        if (x >= 100 && x < 210) {
            y = randomRange(190, 214);
        } else if (x >= 210 && x < 370) {
            y = randomRange(310, 320);
        } else if (x >= 370 && x < 690) {
            y = randomRange(150, 210);
        } else if (x >= 690 && x <= 730) {
            y = randomRange(360, 400);
        } 

        datacenterLocations[i] = new dataCenterLocation(x, y);
    }
}

function animateStroke(duration) {
    var circles = d3.selectAll("circle");
    circles.transition()
        .duration(duration)
        .style("stroke-width", "6px")
        .transition()
        .style("stroke-width", "2px");
    setTimeout(function () { animateStroke(duration); }, (Math.random() + 2) * duration);
}

/// Add a circle with a given datacenter.
/// If no datacenter is passed, use a random one.
function addCircle(datacenter) {
    if (datacenter == undefined) {
        datacenter = datacenterLocations[randomRange(0, datacenterLocations.length)];
    }

    jobsdata.current++;

    var svg = d3.select("#mapgraph");
    var newCircle = svg.append("circle")
        .attr("class", "little")
        .attr("r", randomRange(6, 15))
        .attr("cx", datacenter.x)
        .attr("cy", datacenter.y)
        .on("mouseover", function(){ 
            var that = d3.select(this);
            var r = that.attr("r");
            that.attr("r", r * 1.5); 
        })
        .on("mouseout", function(){
            var that = d3.select(this);
            var r = that.attr("r");
            that.attr("r", r / 1.5);
        });
        setTimeout(function() { removeCircle(newCircle) }, randomRange(5000, 9000));
}

function removeCircle(circle) {
    console.log("Job complete!");

    jobsdata.current--;
    jobsdata.done++;

    circle.remove();
}

function circleMagic() {
    // Let's randomly determine whether the job has been completed
    addCircle();
    setTimeout(circleMagic, randomRange(700, 1600));
}

function jobsInProcess() { }

function randomRange(minVal, maxVal, floatVal) {
  var randVal = minVal + (Math.random() * (maxVal-minVal));
  return typeof floatVal == 'undefined' ? Math.round(randVal):randVal.toFixed(floatVal);
}

function init() { 
    fillDataCenter(50);
    console.log("Importing data center locations: " + datacenterLocations.length);
    // Add initial eight data centers
    for (i=0; i<15; i++) {
        addCircle(datacenterLocations[i]);
    }
    animateStroke(400);
    circleMagic();
}

init();