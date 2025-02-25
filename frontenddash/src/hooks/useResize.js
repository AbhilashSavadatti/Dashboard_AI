import { useState, useCallback, useEffect } from "react";

function useResize(initialWidth, initialHeight, initialLeft, initialTop) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [left, setLeft] = useState(initialLeft);
  const [top, setTop] = useState(initialTop);

  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState(null);

  const startResize = useCallback((e, direction) => {
    e.preventDefault();
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setResizeDirection(direction); // Set the resize direction (top, bottom, left, right, etc.)
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (isResizing) {
        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;

        switch (resizeDirection) {
          case "top":
            setHeight((prevHeight) => prevHeight - deltaY);
            setTop((prevTop) => prevTop + deltaY);
            break;
          case "bottom":
            setHeight((prevHeight) => prevHeight + deltaY);
            break;
          case "left":
            setWidth((prevWidth) => prevWidth - deltaX);
            setLeft((prevLeft) => prevLeft + deltaX);
            break;
          case "right":
            setWidth((prevWidth) => prevWidth + deltaX);
            break;
          case "top-left":
            setHeight((prevHeight) => prevHeight - deltaY);
            setTop((prevTop) => prevTop + deltaY);
            setWidth((prevWidth) => prevWidth - deltaX);
            setLeft((prevLeft) => prevLeft + deltaX);
            break;
          case "top-right":
            setHeight((prevHeight) => prevHeight - deltaY);
            setTop((prevTop) => prevTop + deltaY);
            setWidth((prevWidth) => prevWidth + deltaX);
            break;
          case "bottom-left":
            setHeight((prevHeight) => prevHeight + deltaY);
            setWidth((prevWidth) => prevWidth - deltaX);
            setLeft((prevLeft) => prevLeft + deltaX);
            break;
          case "bottom-right":
            setHeight((prevHeight) => prevHeight + deltaY);
            setWidth((prevWidth) => prevWidth + deltaX);
            break;
          default:
            break;
        }

        setStartPos({ x: e.clientX, y: e.clientY });
      }
    },
    [isResizing, startPos, resizeDirection]
  );

  const stopResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopResize);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopResize);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing, onMouseMove, stopResize]);

  return { width, height, left, top, startResize };
}
