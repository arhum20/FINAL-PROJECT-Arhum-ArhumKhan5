var currentYear = "2020"; // Declare currentYear outside of functions

d3.select("#yearSlider")
  .on("input", function() {
    currentYear = this.value; // Update the value of currentYear
    svg.selectAll("path")
      .attr("fill", function(d) {
        if (!data[d.id]) return colorScale(0);
        let life = data[d.id][currentYear] || 0;
        return colorScale(life);
      });
  });


var countryNames = {};
let svgWidth = window.innerWidth * 1.3;
let svgHeight = window.innerHeight * 1.3;
let svg = d3.select("#myChart").append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(130)
  .center([10, 10])
  .translate([svgWidth / 3, svgHeight / 3]);

// Data and color scale
var data = {};
var colorScale = d3.scaleThreshold()
  .domain([40, 50, 60, 65, 70, 75, 80, 90])
  .range(d3.schemeBlues[7]);

const GEO_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const LIFE_URL = "data/life_expectancy_by_country.csv";

// Load external data and boot
d3.queue()
  .defer(d3.json, GEO_URL)
  .defer(d3.csv, LIFE_URL, function(d) {
    if (d.country_code in data) {
      let country = { ...data[d.country_code] };
      country[d.year] = +d.value;
      data[d.country_code] = country;
    } else {
      data[d.country_code] = {};
      data[d.country_code][d.year] = +d.value;
    }

    // Store the country name
    countryNames[d.country_code] = d.country_name;
  })
  .await(function(error, topo) {
    if (error) throw error;
    drawMap(error, topo); // pass topo as an argument to drawMap
  });

function drawMap(error, topo) {
  let countries = topo.features;
  let info = d3.select("#info");

  // Draw the map
  svg.append("g")
    .selectAll()
    .data(countries)
    .enter()
    .append("path")
    // draw each country
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    // set the color of each country
    .attr("fill", function(d) {
      if (!data[d.id]) return colorScale(0);
      let life = data[d.id][currentYear] || 0;
      return colorScale(life);
    })
    .on("click", function(d) {
      d3.select(this).attr("stroke", "red");
      let lifeExpectancy = Math.round(data[d.id][currentYear]);

      let countryId = d.id;
      var infoBox = document.getElementById("info");
      document.addEventListener("click", function(e) {
        var x = e.clientX;
        var y = e.clientY;
        infoBox.style.display = "block";
        infoBox.style.fontSize = "15px";
        infoBox.style.color = "orange";
        infoBox.style.top = y + "px";
        infoBox.style.left = x + "px";
        infoBox.style.fontWeight = "bold"
        info.text(`Life expectancy in ${countryNames[countryId]}: ${lifeExpectancy} years`);
      });

      info.text(`Life expectancy in ${countryNames[d.id]}: ${lifeExpectancy} years`);
    })
    .on('mouseleave', function(d) {
      d3.select(this).attr("stroke", "none");
    });

  visualizeLifeExpectancy(data, currentYear); // Move this line outside the .attr method chain
}

function updateVisualization() {
  // Get the selected year from the slider
  let currentYear = document.getElementById("yearSlider").value;

  // Update the map colors based on the selected year
  svg.selectAll("path")
    .attr("fill", function(d) {
      if (!data[d.id]) return colorScale(0);
      let life = data[d.id][currentYear] || 0;
      return colorScale(life);
    });

  // Call the visualizeLifeExpectancy function to update the life expectancy visualization
  visualizeLifeExpectancy(data, currentYear);
}

