async function chartingDots(){
    let data = await d3.csv('cities.csv', d3.autotype);
    console.log("european cities", data)
    /* Filter the data */

    /* Display the number of European Cities */
    d3.select('.city-count').text("Number of Cities: " + data.length)

    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
		.append('svg')
        .attr('width', width)
        .attr('height', height)

    let circleSelection = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return (d.x); } )
        .attr("cy", function (d) { return (d.y); } )
        .attr("r", function(d){
            if(d.population < 1000000){
                return 4
            }
            else {
                return 8
            }
        })
        .style("fill", "#69b3a2")
    
    let dataText = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d){
            if(d.population > 1000000) {
                return d.city
            }
        })
        .attr("x", function (d) {
            return (d.x);
        })
        .attr("y", function (d) {
            return (d.y - 12);
        })
        .attr("text-anchor", "middle")
        .attr("font-size", 11)
}

chartingDots();

async function chartingBars(){
    let data = await d3.csv('buildings.csv', d3.autotype);
    console.log("buildings", data)

    //sort the dataset based on building height
    data.sort(function (a, b) {
        return b.height_px - a.height_px;
    });

    const width = 500;
    const height = 500;
    const svg = d3.select('.bar-chart')
		.append('svg')
        .attr('width', width)
        .attr('height', height)

    let bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('x', 250)
        .attr('y', function(d, i) { return i * 50 + 5 }) // space them evenly vertically
        .attr('height', 40)
        .attr('width', function(d) { return (d.height_px); })
        .on("click", function(event, d) {
            d3.select('.building-name')
            .append("text")
            .text(d.building)
            d3.select(".image")
            .attr("src", "img/"+d.image)
            d3.select('.height')
            .append("text")
            .text(d.height_ft)
            d3.select('.city')
            .append("text")
            .text(d.city)
            d3.select('.country')
            .append("text")
            .text(d.country)
            d3.select('.floors')
            .append("text")
            .text(d.floors)
            d3.select('.completed')
            .append("text")
            .text(d.completed)
        })

    let textBuildings = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return d.building;
        })
        .attr('x', 0)
        .attr('y', function(d, i) { return i * 50  + 30})
    
    let textHeights = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return d.height_px
        })
        .attr('x', function(d) { return (d.height_px)})
        .attr('y', 20)
        .attr("text-anchor", "end")
        .attr("fill", "white");

}

chartingBars();
