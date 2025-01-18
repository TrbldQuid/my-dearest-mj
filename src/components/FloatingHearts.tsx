import React, { useEffect, useState } from 'react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number }>>([]);

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now();
      const left = Math.random() * 100;
      setHearts(prev => [...prev, { id, left }]);
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== id));
      }, 4000);
    };

    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{ left: `${heart.left}%` }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;