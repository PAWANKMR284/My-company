import { useState } from "react";
import { industries } from "../data/siteContent";

export function IndustryTabs() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);
  const activeIndex = industries.indexOf(activeIndustry) + 1;

  return (
    <>
      <div className="industry-tabs">
        {industries.map((industry) => (
          <button
            className={activeIndustry === industry ? "active" : ""}
            key={industry}
            onClick={() => setActiveIndustry(industry)}
          >
            {industry}
            <span>↗</span>
          </button>
        ))}
      </div>
      <div className="industry-note">
        <span>{String(activeIndex).padStart(2, "0")}</span>
        <p>
          We create digital experiences for{" "}
          <strong>{activeIndustry.toLowerCase()}</strong> teams who believe
          technology should move people forward.
        </p>
      </div>
    </>
  );
}
