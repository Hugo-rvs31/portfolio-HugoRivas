import BackButton from "../components/BackButton";
import MainNavigation from "../components/MainNavigation";
import React, { useRef, useEffect, useState } from "react";

const DRAWER_WIDTH = 210;
const TOGGLE_WIDTH = 28;

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [isEraser, setIsEraser] = useState(false);
  const [stickerDrawerOpen, setStickerDrawerOpen] = useState(false);

  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(18);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.imageSmoothingEnabled = true;
    ctxRef.current = ctx;

    const resize = () => {
      const wrapper = canvas.parentElement;
      if (!wrapper) return;

      const dpr = window.devicePixelRatio || 1;

      const cssWidth = wrapper.clientWidth;
      const cssHeight = wrapper.clientHeight;

      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;

      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.imageSmoothingEnabled = true;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.lineWidth = Number(brushSize);
    ctx.strokeStyle = brushColor;
  }, [brushColor, brushSize]);

  const getEventPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;

    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const pos = getEventPos(e);

    if (selectedSticker) {
      placeSticker(pos);
      return;
    }

    setIsDrawing(true);
    lastPosRef.current = pos;
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = ctxRef.current;
    const pos = getEventPos(e);

    if (isEraser) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.shadowBlur = 0;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = brushColor;
      ctx.shadowBlur = 1; //izdhelzidhilddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
      ctx.shadowColor = brushColor;
    }

    ctx.lineWidth = Number(brushSize);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPosRef.current = pos;
  };

  const handleMouseUp = (e) => {
    if (e) e.preventDefault();
    setIsDrawing(false);
  };

  const handleTouchStart = (e) => handleMouseDown(e);
  const handleTouchMove = (e) => handleMouseMove(e);
  const handleTouchEnd = (e) => handleMouseUp(e);

  const handleErase = () => {
    setIsEraser(true);
    setSelectedSticker(null);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const placeSticker = (pos) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;

    const size = Number(brushSize) * 2;

    ctx.font = `${size}px serif`;

    // IMPORTANT
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(selectedSticker, pos.x, pos.y);
  };

  return (
    <div className="Drawing-canvas">
      <div
        className={`left ${isOpen ? "open" : ""}`}
        style={{ width: `${DRAWER_WIDTH}px` }}
        aria-hidden={!isOpen}
      >
        <button
          className="drawer-toggle"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close the drawer" : "Open the drawer"}
        >
          {isOpen ? "❮" : "❯"}
        </button>

        <div className="navigation-part">
          <BackButton variant="drawing-canvas" />
        </div>

        <div className="tools-part">
          <h3>Tools</h3>

          <div className="tool-group">
            <label>Coulor:</label>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => {
                setBrushColor(e.target.value);
                setIsEraser(false);
                setSelectedSticker(null);
              }}
            />
          </div>

          <div className="tool-group">
            <label>Size:</label>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
            />
          </div>

          <div className="tool-group">
            <label>Stickers :</label>

            <button
              className="toggle-stickers"
              onClick={() => setStickerDrawerOpen(!stickerDrawerOpen)}
            >
              {stickerDrawerOpen ? "Close" : "Show Stickers"}
            </button>

            {stickerDrawerOpen && (
              <div className="stickers-drawer">
                {[
                  "❤️",
                  "🧡",
                  "💛",
                  "💚",
                  "💙",
                  "💜",
                  "✨",
                  "⭐",
                  "🌟",
                  "⚡",
                  "🌸",
                  "🌼",
                  "🌺",
                  "🍀",
                  "🍁",
                  "🔥",
                  "🌈",
                  "🎈",
                  "🎉",
                  "🐱",
                  "🐶",
                  "🐰",
                  "🐸",
                  "🐼",
                  "🐻",
                  "🍓",
                  "🍒",
                  "🍉",
                  "🥐",
                  "✦",
                  "✧",
                ].map((item) => (
                  <button
                    key={item}
                    className={`sticker-btn ${
                      selectedSticker === item ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedSticker(item);
                      setIsEraser(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleErase}>Eraser</button>
          <button onClick={handleClear}>Clear Canvas</button>
        </div>
      </div>

      <div className="box-drawing">
        <div className="h1-box">
          <h1>You can make your own drawing</h1>
        </div>

        <div className="drawing-wrapper">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
