async function chartingDots(){
    let data = await d3.csv('cities.csv', d3.autotype);
    console.log("european cities", data)
    
    /* Filter the data */
    const nonEurope = ['New Zealand', 'USA', 'Japan']
    data = data.filter(d => !nonEurope.includes(d.country));

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
        .style("fill", "#ffb4a2")
    
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
    let data = await d3.csv('buildings.csv', d3.autoType);
    console.log(data);

    data.sort(function (a, b) {
        return b.height_px - a.height_px;
    });


    const svg = d3.select('.bar-chart')
        .append('svg')
        .attr('width', 500)
        .attr('height', 500)

    var rectangle = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 180)
        .attr('y', function(d, i) { 
            return i * 50 + 5 // space them evenly vertically
        }) 
        .attr('height', 40)
        .attr('width', function(d) { 
            return (d.height_px) 
        })
        .on("click", function(event, d) {
            d3.select('.building-name')
            .text(d.building)
            d3.select(".image")
            .attr("src", "img/"+d.image)
            d3.select(".building-name")
            .text(d.building)
            d3.select(".height")
            .text(d.height_ft)
            d3.select(".city")
            .text(d.city)
            d3.select(".country")
            .text(d.country)
            d3.select(".floors")
            .text(d.floors)
            d3.select(".completed")
            .text(d.completed)
        })
        .attr("fill", "#b5838d");

    var buildingNames = svg.selectAll(".buildingNames")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "buildingNames")
        .text(function(d){
            return d.building;
        })
        .attr('x',0)
        .attr('y', function(d,i){ return i * 50 + 30})
        .attr("font-size", 12)

    let textHeights = svg.selectAll(".buildingHeight")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "buildingHeight")
        .text(function(d){
            return d.height_ft
        })
        .attr('x', function(d){ return 180 + d.height_px - 5})
        .attr('y', function(d, i){ return i * 50 +30})
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .attr("font-size", 12)

}
    
chartingBars();
