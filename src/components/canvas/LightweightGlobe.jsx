import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { geoOrthographic, geoPath } from 'd3-geo';
import * as topojson from 'topojson-client';

const LightweightGlobe = () => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Get container dimensions
    const containerWidth = svgRef.current.clientWidth || 300;
    const containerHeight = svgRef.current.clientHeight || 300;
    
    // Clear any existing content
    const existingSvg = d3.select(svgRef.current);
    existingSvg.selectAll("*").remove();
    
    // Setup SVG with viewBox for responsiveness
    const svg = existingSvg
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("class", "globe-svg");
    
    // Calculate center point
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    
    // Create a fresh globe group
    const globeGroup = svg.append("g")
      .attr("class", "globe-group")
      .attr("transform", `translate(${centerX},${centerY})`);
    
    // Create projection with explicit center at [0,0]
    const radius = Math.min(containerWidth, containerHeight) / 2 - 10;
    const projection = geoOrthographic()
      .scale(radius)
      .translate([0, 0])
      .clipAngle(90);
    
    // Toronto coordinates [longitude, latitude]
    const toronto = [-79.3832, 43.6532];
    
    // Set initial rotation to center Toronto at the start
    projection.rotate([-toronto[0], -toronto[1], 0]);
    
    const path = geoPath().projection(projection);
    
    // Create ocean circle
    globeGroup.append("circle")
      .attr("class", "ocean")
      .attr("r", radius)
      .attr("fill", "#23366e")
      .attr("stroke", "#000")
      .attr("stroke-width", "0.2");
    
    // Create graticules
    const graticule = d3.geoGraticule();
    globeGroup.append("path")
      .attr("class", "graticule")
      .datum(graticule)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "rgba(255,255,255,0.2)")
      .attr("stroke-width", 0.5);
    
    // Create a dedicated group for the countries
    const countriesGroup = globeGroup.append("g")
      .attr("class", "countries-group");
    
    // Create a dedicated group for always-visible elements
    const markerGroup = globeGroup.append("g")
      .attr("class", "marker-group");
    
    // Single marker for Toronto that will always be visible
    const marker = markerGroup.append("circle")
      .attr("class", "toronto-marker")
      .attr("r", 4)
      .attr("fill", "#ff5252");
    
    // Create a "shadow" marker that shows when Toronto is on the back side
    const shadowMarker = markerGroup.append("circle")
      .attr("class", "toronto-shadow-marker")
      .attr("r", 4)
      .attr("fill", "rgba(255, 82, 82, 0.3)")  // Transparent version of the marker
      .attr("display", "none");
    
    // Create a label for Toronto
    const labelGroup = markerGroup.append("g")
      .attr("class", "toronto-label-group");
    
    // Text background for better readability
    const labelBackground = labelGroup.append("rect")
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "rgba(255, 255, 255, 0.7)")
      .attr("display", "none");
    
    // Label text
    const labelText = labelGroup.append("text")
      .attr("class", "toronto-label")
      .text("I am based in Toronto")
      .attr("font-size", "12px")
      .attr("font-family", "Arial, sans-serif")
      .attr("fill", "#333")
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("display", "none");
    
    // Create shadow label for the back side
    const shadowLabelGroup = markerGroup.append("g")
      .attr("class", "toronto-shadow-label-group");
    
    // Shadow label background
    const shadowLabelBackground = shadowLabelGroup.append("rect")
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "rgba(255, 255, 255, 0.4)")
      .attr("display", "none");
    
    // Shadow label text
    const shadowLabelText = shadowLabelGroup.append("text")
      .attr("class", "toronto-shadow-label")
      .text("I am here in Toronto")
      .attr("font-size", "12px")
      .attr("font-family", "Arial, sans-serif")
      .attr("fill", "#666")
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("opacity", "0.5")
      .attr("display", "none");
    
    // Function to calculate if a point is visible
    function isVisible(coords) {
      // Get the current rotation
      const [lambda, phi] = projection.rotate();
      // Convert to radians
      const lambdaRad = lambda * Math.PI / 180;
      const phiRad = phi * Math.PI / 180;
      // Convert point to radians
      const lonRad = coords[0] * Math.PI / 180;
      const latRad = coords[1] * Math.PI / 180;
      
      // Calculate the cosine of the angle between the point and the visible center
      const cosAngle = Math.sin(phiRad) * Math.sin(-latRad) +
                       Math.cos(phiRad) * Math.cos(-latRad) * Math.cos(lambdaRad - lonRad);
      
      // If cosine is positive, the point is visible
      return cosAngle > 0;
    }
    
    // Update function for animation
    function update() {
      // Update country paths
      countriesGroup.selectAll(".country").attr("d", path);
      
      // Update graticule
      globeGroup.select(".graticule").attr("d", path);
      
      // Calculate marker position
      const coords = projection(toronto);
      
      // Check if Toronto is currently visible on the globe
      const visible = isVisible(toronto);
      
      if (coords) {
        // Always position the marker at Toronto's coordinates
        marker.attr("cx", coords[0])
              .attr("cy", coords[1])
              .attr("display", visible ? "block" : "none");
              
        // Show the shadow marker when Toronto is on the back side
        shadowMarker.attr("cx", coords[0])
                    .attr("cy", coords[1])
                    .attr("display", visible ? "none" : "block");
        
        // Position the label with offset from the marker
        const labelOffset = 10; // Distance from marker to label
        
        // Get the label's text dimensions to size the background
        const labelBox = labelText.node().getBBox();
        const paddingX = 6;
        const paddingY = 4;
        
        // Position and display the main label
        labelText.attr("x", coords[0] + labelOffset)
                 .attr("y", coords[1])
                 .attr("display", visible ? "block" : "none");
        
        // Position and size the label background
        labelBackground.attr("x", coords[0] + labelOffset - paddingX)
                       .attr("y", coords[1] - labelBox.height/2 - paddingY)
                       .attr("width", labelBox.width + paddingX * 2)
                       .attr("height", labelBox.height + paddingY * 2)
                       .attr("display", visible ? "block" : "none");
        
        // Shadow label and background (for when Toronto is on back side)
        shadowLabelText.attr("x", coords[0] + labelOffset)
                       .attr("y", coords[1])
                       .attr("display", visible ? "none" : "block");
        
        shadowLabelBackground.attr("x", coords[0] + labelOffset - paddingX)
                             .attr("y", coords[1] - labelBox.height/2 - paddingY)
                             .attr("width", labelBox.width + paddingX * 2)
                             .attr("height", labelBox.height + paddingY * 2)
                             .attr("display", visible ? "none" : "block");
      }
    }
    
    // Load world data
    d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
      .then(data => {
        // Draw countries
        countriesGroup.selectAll(".country")
          .data(topojson.feature(data, data.objects.countries).features)
          .enter().append("path")
          .attr("class", "country")
          .attr("d", path)
          .attr("fill", "#69b3a2")
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.3)
          .style("opacity", 0.8);
        
        // Initial update to ensure everything is in place
        update();
        
        // Get the initial rotation values
        let [startLongitude, startLatitude, startRoll] = projection.rotate();
        
        // Animation logic - continuous rotation
        const timer = d3.timer((elapsed) => {
          // Calculate rotation based on elapsed time
          const rotationAngle = startLongitude + (elapsed * 0.01);
          projection.rotate([rotationAngle, startLatitude, startRoll]);
          update();
        });
        
        // Store cleanup function for later
        return () => {
          timer.stop();
        };
      })
      .catch(error => console.error("Error loading or parsing data:", error));
    
    // Cleanup function when component unmounts
    return () => {
      // Clear all SVG content
      if (svg && !svg.empty()) {
        svg.selectAll("*").remove();
      }
    };
  }, []); // Empty dependency array ensures this runs only once
  
  return (
    <div className="lightweight-globe-container" style={{ width: '100%', height: '100%' }}>
      <svg 
        ref={svgRef} 
        className="rounded-xl globe-container"
        style={{ width: '100%', height: '100%' }}
      ></svg>
    </div>
  );
}; 

export default LightweightGlobe;