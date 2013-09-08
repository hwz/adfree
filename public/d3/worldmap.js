var width = 960,
    height = 480;

var projection = d3.geo.kavrayskiy7(),
    color = d3.scale.category20(),
    graticule = d3.geo.graticule();

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#worldmap").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("/d3/world-50m.json", function(error, world) {
  var countries = topojson.feature(world, world.objects.countries).features,
      neighbors = topojson.neighbors(world.objects.countries.geometries);
  
  svg.selectAll(".country")
      .data(countries)
    .enter().insert("path", ".graticule")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", "#DDDDDD");
      //.style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); });
});
