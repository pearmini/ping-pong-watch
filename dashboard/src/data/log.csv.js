import {text} from "d3-fetch";
import {csvFormat} from "d3-dsv";

const content = await text("https://tigoe.net/data.json");

const data = content
  .split("\n")
  .map((line) => line.trim())
  .filter((d) => !!d)
  .map((line) => JSON.parse(line));

const startTime = "2025-03-14T16:08:31.531Z";
// const startTime = "2025-03-14T22:24:31.963Z";
// const startTime = "2025-03-16T22:19:48.509Z";
// const startTime = "2025-03-17T04:00:00.000Z";

const filtered = data.filter((d) => d.creator === "jim_pingpong")
.filter((d) => new Date(d.timeStamp) > new Date(startTime));

process.stdout.write(csvFormat(filtered));
