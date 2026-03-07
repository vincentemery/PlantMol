"use client";

import { useEffect, useState } from "react";

interface StatItemProps {
  label: string;
  target: number;
  suffix?: string;
}

function StatItem({ label, target, suffix = "" }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <div className="font-display text-3xl font-bold text-text-primary">
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-text-secondary">{label}</div>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="border-y border-card-border bg-card/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
        <StatItem label="Molecules" target={10} />
        <StatItem label="Pathways" target={3} />
        <StatItem label="Plant Genomes" target={4} />
        <StatItem label="Genes" target={30} suffix="+" />
      </div>
    </section>
  );
}
