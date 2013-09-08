$(document).ready(function () {

    var datacenterLocations = new Array();

    var jobsdata = new Array();
    jobsdata.done = randomRange(400, 800);
    jobsdata.current = 0;

    var n = 40,
        random = d3.random.normal(0, 20),
        data = d3.range(n).map(random);

    var margin = { top: 0, right: 20, bottom: 20, left: 20 },
        width = 300 - margin.left - margin.right,
        height = 255 - margin.top - margin.bottom;

    var x = d3.scale.linear().domain([1, n - 2]).range([0, width]);
    var y = d3.scale.linear().domain([0, 25]).range([height, 0]);

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d, i) { return x(i); })
        .y(function (d, i) { return y(d); });


    var svg = d3.select("#liveJobsTile").insert("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "linearGraphJobs")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .attr("class", "y axis")
        .attr("style", "fill: #f3de70; outline: #ffb310")
        .call(d3.svg.axis().scale(y).orient("left"));

    var path = svg.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    function dataCenterLocation(x, y) {
        this.x = x;
        this.y = y;
    }

    function fillDataCenter(count) {
        for (i = 0; i < count; i++) {
            var x, y;
            var weight = Math.random();
            if (weight < 0.7) {
                x = randomRange(100, 240);
            } else {
                x = randomRange(211, 730);
            }

            if (x >= 100 && x < 300) {
                y = randomRange(250, 350);
            } else if (x >= 300 && x < 370) {
                y = randomRange(400, 420);
            } else if (x >= 370 && x < 690) {
                y = randomRange(250, 280);
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
            datacenter = datacenterLocations[randomRange(0, datacenterLocations.length - 1)];
        }

        jobsdata.current++;

        var svg = d3.select("#mapgraph");
        var newCircle = svg.append("circle")
            .attr("class", "little")
            .attr("r", randomRange(6, 15))
            .attr("cx", datacenter.x)
            .attr("cy", datacenter.y)
            .on("mouseover", function () {
                var that = d3.select(this);
                var r = that.attr("r");
                that.attr("r", r * 1.5);
            })
            .on("mouseout", function () {
                var that = d3.select(this);
                var r = that.attr("r");
                that.attr("r", r / 1.5);
            });
        setTimeout(function () { removeCircle(newCircle) }, randomRange(5000, 9000));
    }

    function removeCircle(circle) {
        console.log("Job complete!");

        jobsdata.current--;
        jobsdata.done++;
        updateJobsDone();

        circle.remove();
    }

    function circleMagic() {
        // Let's randomly determine whether the job has been completed
        addCircle();
        setTimeout(circleMagic, randomRange(700, 1200));
    }

    function jobsInProcess() { }

    function updateJobsDone() {
        $("h1#jobsDone").text(jobsdata.done.toString());
    }

    function randomRange(minVal, maxVal, floatVal) {
        var randVal = minVal + (Math.random() * (maxVal - minVal));
        return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
    }

    function setupUserButton() {
        $('#userButton').click(function () {
            $('#map').animate({ width: 'toggle' });
            $('.map').animate({ width: 'toggle' });
            $('#linearGraphJobs').fadeIn();
            $('.start').fadeOut();
            console.log("Toggling map!")
        });
    }

    function init() {
        $('#map').hide();
        fillDataCenter(50);
        console.log("Importing data center locations: " + datacenterLocations.length);
        // Add initial eight data centers
        for (i = 0; i < 15; i++) {
            addCircle(datacenterLocations[i]);
        }
        animateStroke(400);
        circleMagic();
        setupUserButton();
        tick();
    }

    function tick() {

        // push a new data point onto the back
        data.push(jobsdata.current);

        // redraw the line, and slide it to the left
        path
          .attr("d", line)
          .attr("transform", null)
        .transition()
          .duration(500)
          .ease("linear")
          .attr("transform", "translate(" + x(0) + ",0)")
          .each("end", tick);

        // pop the old data point off the front
        data.shift();

    }

    init();
});