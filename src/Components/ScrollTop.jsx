import { useState, useEffect } from "react";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="scroll-top-button"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          ⬆️
          <span className="tooltip">Top</span>
        </button>
      )}

      {}
      <style>{`
        .scroll-top-button {
          position: fixed;
          right: 20px;
          bottom: 40px;
          z-index: 1000;
          background-color: #1e90ff;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          color: #fff;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          box-shadow: 0 4px 10px rgba(30,144,255,0.4);
          animation: fadeBounceIn 0.5s ease;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .scroll-top-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 12px #1e90ff, 0 0 25px #1e90ff;
        }

        .tooltip {
          position: absolute;
          bottom: 110%;
          left: 50%;
          transform: translateX(-50%) translateY(0);
          background-color: #333;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
          white-space: nowrap;
        }

        .scroll-top-button:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-8px);
        }

        @keyframes fadeBounceIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.7);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "1rem" }}>Scroll Down</h1>

      {}
      <div style={{ height: "1800px", background: "#f0f8ff" }}>
        <p
          style={{
            paddingTop: "900px",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          👋 Scroll to see the button...
        </p>
      </div>

      <ScrollTop />
    </div>
  );
}
