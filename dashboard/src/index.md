---
theme: dashboard
toc: false
---

# Ping Pong Watch 🏓

```js
import {plot} from "./components/plot.js";
const data = await FileAttachment("data/log.csv").csv();
```

<div class="card">
  ${plot(data, {width})}
</div>

<div class="card">
  ${Inputs.table(data)}
</div>
