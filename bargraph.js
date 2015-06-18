function bargraph(data,key,value) {
  var target = 'body';

  data = data.filter(function(a){if (a[key] && a[value]) return true});
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    
    d3.select(target).select('svg').remove();

  var svg = d3.select(target).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d[key] }));
    y.domain([0, d3.max(data, function(d) { return d[value] })]);
    
    var colors = d3.scale.category20();


    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(value);

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr('fill',function(d,i){
        
        return colors(i);
       })
      .attr("x", function(d) { return x(d[key]); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d[value]); })
      .attr("height", function(d) { return height - y(d[value]); })
      .on('click',function(d){console.info(d)})

  function type(d) {
    d[value] = +d[value];
    return d;
  }
}