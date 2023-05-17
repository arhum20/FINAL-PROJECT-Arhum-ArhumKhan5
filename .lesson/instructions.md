# Instructions  
1. See if you can use the on mouseOver / mouseLeave Repl example (6.0) to get the country name to show up when you hover over the mouse.
2. Then can you get the life expectancy to show up using the same logic?
3. Can you modify the colors - see if you can figure out this code (domain refers to the range of the data initially, e.g. the birth rate range...):

```javascript
// TBH, not sure why there are 7 num
var colorScale = d3.scaleThreshold()
  .domain([40, 50, 60, 65, 70, 75, 80, 90])
  .range(d3.schemeBlues[7]);
```

4. Can you add a slider that changes the "current year"?