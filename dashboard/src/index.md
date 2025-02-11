---
theme: dashboard
toc: false
---

# Ping Pong Watch 🏓

```js
const response = await FileAttachment("data/log.json");
const content = await response.text();
const now = Date.now();
const data = content
  .split("\n")
  .filter((d) => d.trim())
  .map(JSON.parse)
  .map((d) => ({...d, timestamp: +d.millis + now}));
```

<!-- Cards with big numbers -->

<div class="grid grid-cols-4">
  <div class="card">
    <h2>Max</h2>
    <span class="big">${d3.max(data, d => d.sensor)}</span>
  </div>
  <div class="card">
    <h2>Min</h2>
    <span class="big">${d3.min(data, d => d.sensor)}</span>
  </div>
  <div class="card">
    <h2>Mean</h2>
    <span class="big">${d3.mean(data, d => d.sensor) | 0}</span>
  </div>
  <div class="card">
    <h2>Median</h2>
    <span class="big">${d3.median(data, d => d.sensor) | 0}</span>
  </div>
</div>

<!-- Plot of launch history -->

```js
function lineChart(data, {width} = {}) {
  return Plot.plot({
    title: "Values over time",
    width,
    height: 250,
    y: {grid: true, label: "Value", nice: true},
    marks: [
      Plot.line(data, {
        x: (d) => new Date(+d.timestamp),
        y: "sensor",
        curve: "step-before",
      }),
    ],
  });
}
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => lineChart(data, {width}))}
  </div>
</div>

```js
function histogram(data, {width} = {}) {
  return Plot.plot({
    title: "Values distribution",
    height: 250,
    y: {grid: true, nice: true},
    x: {label: "value →"},
    marks: [Plot.rectY(data, Plot.binX({y: "count"}, {x: "sensor"}))],
  });
}
```

```js
function table(data) {
  return Inputs.table(data);
}
```

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => histogram(data, {width}))}
  </div>
  <div class="card">
    ${resize((width) => table(data))}
  </div>
</div>
