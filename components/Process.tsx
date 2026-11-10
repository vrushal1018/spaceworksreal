"use client";
// The measure line: six steps as tabs, each with an architect's tick.
import { useState } from "react";
import { STEPS } from "@/lib/content";

export default function Process() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <div className="measure">
      <div className="line" aria-hidden="true"></div>
      <div className="steps" role="tablist" aria-label="Steps">
        {STEPS.map((st, k) => (
          <button key={st.t} className="step" role="tab" id={`st-${k}`} aria-selected={k === i} aria-controls="stepDetail" onClick={() => setI(k)}>
            <span className="tick" aria-hidden="true"></span><span className="n">0{k + 1}</span><span className="t">{st.t}</span>
          </button>
        ))}
      </div>
      <div className="detail" id="stepDetail" role="tabpanel" aria-labelledby={`st-${i}`} aria-live="polite">
        <h3>{s.t}. <b>{s.h}</b></h3>
        <p>{s.p}</p>
      </div>
    </div>
  );
}
