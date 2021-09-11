// @TODO: YOUR CODE HERE!
var margin = { top: 20, right: 40, bottom: 40, left: 80 };
var width = 950 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// append svg object to the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // import data
d3.csv("assets/data/data.csv").then(function(data) {
    data.forEach(d => {
        d.age = +d.age;
        d.smokes = +d.smokes;
    });

    // X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data.map(d => d.age)))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // X label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .text("Age");

    // Y axis
    var y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.smokes))
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Y label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", (height / 2) * -1)
        .attr("dy", -40)
        .text("Smokes");

    // create dots
    var gdots = svg.selectAll("g.dot")
        .data(data)
        .enter()
        .append('g');

    // Add dots to gdots
    gdots.append("circle")
        .attr("cx", d => x(d.age))
        .attr("cy", d => y(d.smokes))
        .attr("r", 8)
        .style("fill", "#69b3a2");
    
    // Add text to gdots
    gdots.append("text")
        .text(d => d.abbr)
        .attr("x", d => x(d.age))
        .attr("y", d => y(d.smokes))
        .attr("dx", -5)
        .attr("dy", 2)
        .style("font-size", "7px");
    //Catch error
}).catch(e => {console.log(e);});