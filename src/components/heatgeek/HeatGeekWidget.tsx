"use client";

import { useEffect, useRef } from "react";

// Embeds the Heat Geek search widget (our partner tenancy) by injecting
// their script tag. Each instance gets its own container so multiple
// widgets can live on one page.

interface HeatGeekWidgetProps {
  widgetStyle?: "banner" | "block" | "widget";
  align?: "left" | "center" | "right";
  className?: string;
}

const SCRIPT_SRC = "https://upgrades.heatgeek.com/static/js/searchWidget.v1.js";
const TENANCY_ID = "71";

export default function HeatGeekWidget({
  widgetStyle = "widget",
  align = "center",
  className,
}: HeatGeekWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || container.childElementCount > 0) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.dataset.tenancyId = TENANCY_ID;
    script.dataset.widgetStyle = widgetStyle;
    script.dataset.widgetAlign = align;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [widgetStyle, align]);

  return <div ref={ref} className={className} />;
}
