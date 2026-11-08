import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/loader.css";

const phases = [
  [0, "BOOT / CORE SYSTEM"],
  [20, "LINK / ESTABLISHING"],
  [40, "FLIGHT CONTROL / CHECK"],
  [65, "TELEMETRY / SYNC"],
  [85, "AIRCRAFT / READY"],
];

function SystemLoader() {
  const loader = useRef(null);
  const progress = useRef(null);
  const progressLine = useRef(null);
  const status = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const context = gsap.context(() => {
      document.body.style.overflow = "hidden";

      const counterElements = gsap.utils.toArray(
        ".telemetry-value, .spec-value",
      );
      const setCounterFinalValues = () => {
        counterElements.forEach((element) => {
          element.textContent = element.dataset.final;
        });
      };

      const setFinalState = () => {
        gsap.set(".startup-target", {
          opacity: 1,
          visibility: "visible",
          x: 0,
          y: 0,
          scale: 1,
          scaleX: 1,
          scaleY: 1,
          clearProps: "clipPath",
        });
        gsap.set(".startup-line", { clearProps: "transform" });
        setCounterFinalValues();
        gsap.set(".telemetry__bar i", { width: "94%" });
        gsap.set(loader.current, {
          display: "none",
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
          clearProps: "clipPath",
        });
        document.body.style.overflow = "";
      };

      if (reducedMotion) {
        setFinalState();
        return;
      }

      const progressValue = { value: 0 };
      gsap.set(".startup-target", {
        opacity: 0,
        visibility: "visible",
        x: 0,
        y: 0,
      });
      gsap.set(".startup-line", { scaleX: 0, scaleY: 0 });
      gsap.set(counterElements, { textContent: "0" });
      gsap.set(".telemetry__bar i", { width: 0 });
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: setFinalState,
      });

      timeline.to(progressValue, {
        value: 100,
        duration: 2.45,
        ease: "power1.inOut",
        onUpdate: () => {
          const value = Math.round(progressValue.value);
          progress.current.textContent = String(value).padStart(3, "0");
          progressLine.current.style.width = `${value}%`;
          const phase = phases.reduce(
            (current, item) => (value >= item[0] ? item : current),
            phases[0],
          );
          status.current.textContent = phase[1];
        },
      });
      timeline.to(status.current, {
        textContent: "SYSTEM / ONLINE",
        duration: 0.1,
      });
      timeline.to(
        ".startup-target",
        { opacity: 1, y: 0, x: 0, duration: 0.55, stagger: 0.055 },
        "-=0.65",
      );
      timeline.to(
        ".startup-line",
        { scaleX: 1, scaleY: 1, duration: 0.55, stagger: 0.04 },
        "<",
      );
      counterElements.forEach((element, index) => {
        const counter = { value: 0 };
        timeline.to(
          counter,
          {
            value: Number(element.dataset.final),
            duration: 0.8,
            ease: "power1.out",
            snap: { value: 1 },
            onUpdate: () => {
              element.textContent = String(Math.round(counter.value));
            },
          },
          index === 0 ? "-=0.3" : "<",
        );
      });
      timeline.to(".telemetry__bar i", { width: "94%", duration: 0.8 }, "<");
      timeline.to(
        loader.current,
        { clipPath: "inset(0 0 0 100%)", duration: 0.65, ease: "power3.inOut" },
        "-=0.52",
      );
    });

    return () => {
      context.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="system-loader" ref={loader} aria-live="polite">
      <div className="system-loader__panel">
        <div className="system-loader__brand">LIBTEC</div>
        <div className="system-loader__title">System initialization</div>
        <div className="system-loader__status" ref={status}>
          BOOT / CORE SYSTEM
        </div>
        <div className="system-loader__progress">
          <i ref={progressLine} />
        </div>
        <div className="system-loader__value" ref={progress}>
          000
        </div>
      </div>
    </div>
  );
}

export default SystemLoader;
