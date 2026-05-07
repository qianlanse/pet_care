"use client";

import { useState } from "react";

export type PricingPlan = {
  label: string;
  title: string;
  price: string;
  desc: string;
  items: string[];
  featured?: boolean;
};

type PricingGridProps = {
  plans: PricingPlan[];
};

export default function PricingGrid({ plans }: PricingGridProps) {
  const defaultIndex = Math.max(
    plans.findIndex((plan) => plan.featured),
    0,
  );
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="pricing-grid" onMouseLeave={() => setActiveIndex(defaultIndex)}>
      {plans.map((item, index) => (
        <article
          className={`pricing-card${activeIndex === index ? " featured" : ""}`}
          key={item.title}
          data-animate="card"
          onMouseEnter={() => setActiveIndex(index)}
        >
          <div className="section-label">{item.label}</div>
          <h3>{item.title}</h3>
          <strong>{item.price}</strong>
          <span>{item.desc}</span>
          <ul>
            {item.items.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
