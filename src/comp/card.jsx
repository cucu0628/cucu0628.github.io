// Card.js
import { useEffect, useRef, useState } from "react";
import "../App.css"

function Card  ({ title, description, image , site}) {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      {
        root: document.querySelector("#scroll-container"),
        threshold: 0.6,
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <a href={site}>
    <div
      ref={ref}
      className={`snap-center flex-shrink-0 w-64 rounded-xl shadow-md bg-gradient-to-r from-pink-500 to-purple-800 mx-2 transition-transform duration-300 anim text-black ${
        isActive ? "scale-105" : "scale-95"
      }`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
    </a>
  );
};

export default Card;
