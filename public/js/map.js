function animateStroke(duration) {
    var circles = d3.selectAll("circle");
    circles.transition()
        .duration(duration)
        .style("stroke-width", "8px")
        .transition()
        .style("stroke-width", "2px");
    setTimeout(function () { animateStroke(duration); }, (Math.random() + 2) * duration);
}

animateStroke(400);