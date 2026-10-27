"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { dragPosition } from "@/lib/canvas";
import type { HeroTile } from "./hero-tiles";
import { MoveIcon } from "./icons";

const tints = {
  lilac: "bg-lilac-tint",
  rose: "bg-rose-tint",
} as const;

const corners = [
  "-top-1 -left-1",
  "-top-1 -right-1",
  "-bottom-1 -left-1",
  "-bottom-1 -right-1",
];

export function HeroCanvas({
  tiles,
  hint,
}: {
  tiles: HeroTile[];
  hint: string;
}) {
  const layer = useRef<HTMLDivElement>(null);
  const topZ = useRef(1);
  const [hintHidden, setHintHidden] = useState(false);

  // Plain DOM writes while dragging: no React state per pointermove.
  function startDrag(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    e.preventDefault();
    const tile = e.currentTarget;
    const size = tile.getBoundingClientRect();
    const grab = { x: e.clientX - size.left, y: e.clientY - size.top };
    tile.setPointerCapture(e.pointerId);
    tile.style.zIndex = String(++topZ.current); // the grabbed tile stays in front
    tile.dataset.dragging = "";

    const move = (ev: globalThis.PointerEvent) => {
      const { x, y } = dragPosition(
        { x: ev.clientX, y: ev.clientY },
        grab,
        size,
        layer.current!.getBoundingClientRect(),
      );
      for (const [k, v] of [
        ["x", x],
        ["mx", x],
        ["y", y],
        ["my", y],
      ] as const) {
        tile.style.setProperty(`--${k}`, `${v}%`);
      }
    };
    tile.addEventListener("pointermove", move);
    tile.addEventListener(
      "lostpointercapture",
      () => {
        tile.removeEventListener("pointermove", move);
        delete tile.dataset.dragging;
        setHintHidden(true);
      },
      { once: true },
    );
  }

  return (
    <>
      <div
        ref={layer}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-2"
      >
        {tiles.map((t, i) => (
          <div
            key={t.label}
            data-tile={t.label}
            onPointerDown={startDrag}
            style={
              {
                "--i": i,
                "--x": `${t.x}%`,
                "--y": `${t.y}%`,
                "--mx": `${t.mobile?.x}%`,
                "--my": `${t.mobile?.y}%`,
              } as CSSProperties
            }
            className={`group pointer-events-auto absolute top-(--y) left-(--x) grid cursor-grab touch-none place-items-center border border-line shadow-[0_12px_24px_-14px_rgb(46_42_40/0.35)] transition-[rotate,scale,box-shadow] duration-200 select-none data-dragging:cursor-grabbing data-dragging:shadow-[0_26px_40px_-18px_rgb(46_42_40/0.45)] motion-safe:animate-drop motion-safe:[animation-delay:calc(var(--i)*60ms_+_150ms)] motion-safe:data-dragging:scale-106 motion-safe:data-dragging:rotate-[-3deg] max-md:top-(--my) max-md:left-(--mx) ${
              t.photo
                ? "aspect-[4/5] w-36 rounded-[1.25rem] p-1.5"
                : "size-19 rounded-[1.25rem] max-md:size-14 max-md:rounded-2xl"
            } ${t.tint ? tints[t.tint] : "bg-surface"} ${t.mobile ? "" : "max-md:hidden"}`}
          >
            <Image
              src={t.image}
              alt=""
              sizes={t.photo ? "144px" : "44px"}
              className={
                t.photo
                  ? "pointer-events-none size-full rounded-[0.9rem] object-cover object-[50%_35%]"
                  : "pointer-events-none h-auto w-[44%]"
              }
            />
            <span className="pointer-events-none absolute -inset-[7px] border-[1.5px] border-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-data-dragging:opacity-100">
              {corners.map((c) => (
                <i
                  key={c}
                  className={`absolute size-[7px] border-[1.5px] border-primary bg-white ${c}`}
                />
              ))}
              <b className="absolute bottom-[calc(100%+6px)] -left-[1.5px] rounded-[3px] bg-primary px-[0.4rem] py-[0.15rem] text-[0.6875rem]/[1.3] font-medium whitespace-nowrap text-white">
                {t.label}
              </b>
            </span>
          </div>
        ))}
      </div>
      <p
        aria-hidden="true"
        className={`absolute bottom-8 left-1/2 z-1 flex -translate-x-1/2 items-center gap-2 text-[0.8125rem] whitespace-nowrap text-muted transition-[opacity,visibility] duration-400 max-md:bottom-5 ${hintHidden ? "invisible opacity-0" : ""}`}
      >
        <MoveIcon width={16} height={16} strokeWidth={1.8} />
        {hint}
      </p>
    </>
  );
}
