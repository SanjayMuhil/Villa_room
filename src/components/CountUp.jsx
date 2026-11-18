import React, { useEffect, useState } from 'react';

export default function CountUp({ end, duration = 750, prefix = '₹', suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let startTimestamp = null;
    let animFrame = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        animFrame = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animFrame = window.requestAnimationFrame(step);
    return () => {
      if (animFrame) window.cancelAnimationFrame(animFrame);
    };
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
