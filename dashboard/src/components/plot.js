import * as Plot from "npm:@observablehq/plot";

export function plot(data, {width}) {
  const options = {
    width,
    title: "Count over time",
    grid: true,
    x: {type: "time", nice: true},
    y: {label: "Count per minute"},
    height: 400,
    marks: [
      Plot.dotX(
        data,
        Plot.dodgeY({
          x: (d) => new Date(d.timeStamp),
          tip: true,
        })
      ),
    ],
  };
  const node = Plot.plot(options);
  node.style.opacity = 0;
  document.body.appendChild(node);
  const g = node.querySelector("[aria-label='dot']");
  const height = g.getBoundingClientRect().height + 40;
  document.body.removeChild(node);
  return Plot.plot({...options, height});
}
