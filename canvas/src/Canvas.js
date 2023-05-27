import { useRef, useEffect } from 'react';
import './index.css';

const Canvas = () => {
  const ref = useRef(null);
  const refLeft = useRef(null);
  const refTop = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);
  const startPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const resizableEle = ref.current;
    const styles = window.getComputedStyle(resizableEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    resizableEle.style.top = '250px';
    resizableEle.style.left = '45%';

    const onMouseMove = (event) => {
      const dx = event.clientX - x;
      const dy = event.clientY - y;
      const left = parseInt(styles.left, 10) + dx;
      const top = parseInt(styles.top, 10) + dy;

      resizableEle.style.left = `${left}px`;
      resizableEle.style.top = `${top}px`;

      x = event.clientX;
      y = event.clientY;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseDown = (event) => {
      x = event.clientX;
      y = event.clientY;
      startPosition.current.x = x - parseInt(styles.left, 10);
      startPosition.current.y = y - parseInt(styles.top, 10);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    resizableEle.addEventListener('mousedown', onMouseDown);

    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizableEle.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizableEle.style.left = styles.left;
      resizableEle.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Top resize
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizableEle.style.height = `${height}px`;
    };

    const onMouseUpTopResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizableEle);
      resizableEle.style.bottom = styles.bottom;
      resizableEle.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizableEle.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizableEle);
      resizableEle.style.top = styles.top;
      resizableEle.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizableEle.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event) => {
      x = event.clientX;
      resizableEle.style.right = styles.right;
      resizableEle.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Add mouse down event listener
    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerTop = refTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize);
    const resizerBottom = refBottom.current;
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
      resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
      resizableEle.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  const handleLogPositions = () => {
    const resizableEle = ref.current;
    const styles = window.getComputedStyle(resizableEle);
    const width = parseInt(styles.width, 10);
    const height = parseInt(styles.height, 10);
    const left = parseInt(styles.left, 10);
    const top = parseInt(styles.top, 10);
    console.log(`Object Position: (${left}px, ${top}px), Size: (${width}px, ${height}px)`);
  };

  return (
    <>
      <button className="button" onClick={handleLogPositions}>
        Log Object Positions
      </button>
      <div className="container">
        <div ref={ref} className="resizeable">
          <div ref={refLeft} className="resizer resizer-l"></div>
          <div ref={refTop} className="resizer resizer-t"></div>
          <div ref={refRight} className="resizer resizer-r"></div>
          <div ref={refBottom} className="resizer resizer-b"></div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
