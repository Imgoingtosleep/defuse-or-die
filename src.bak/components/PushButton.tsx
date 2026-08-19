import React, { useState, useRef, useEffect } from 'react';
import '../styles/PushButton.css'; // Add CSS for button styling

type Props = {
  onPress?: () => void;
  onHold?: () => void;
  onRelease?: () => void;
};

const PushButton: React.FC<Props> = ({
  onPress = () => {},
  onHold = () => {},
  onRelease = () => {}
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const isMouseDown = useRef(false); // Track if mouseDown has occurred
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = () => {
    console.log('Mouse Down');

    setIsPressed(true);
    isMouseDown.current = true; // Mark mouseDown occurred
    onPress();

    // Set timeout to detect hold action
    holdTimeout.current = setTimeout(() => {
      setIsHolding(true);
      onHold(); // Trigger hold action after 500ms
    }, 500);
  };

  const handleMouseUp = () => {
    console.log('Mouse Up');

    // Clear the hold timeout when mouse is released
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }

    if (isMouseDown.current) { // Only call onRelease if mouseDown occurred
      if (isHolding) {
        setIsHolding(false);
        onRelease(); // Trigger release action if held long enough
      }
      setIsPressed(false);
      isMouseDown.current = false; // Reset mouseDown tracking
    }
  };

  const handleMouseLeave = () => {
    if (isPressed) {
      // Handle case where mouse leaves button while pressed
      handleMouseUp();
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = (event: MouseEvent) => {
      if (isMouseDown.current) {
        handleMouseUp(); // Handle global mouse up event
      }
    };

    // Add global event listener for mouse up
    document.addEventListener('mouseup', handleGlobalMouseUp);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      if (holdTimeout.current) {
        clearTimeout(holdTimeout.current);
      }
    };
  }, []);

  return (
    <button
      className={`push-button ${isPressed ? 'pressed' : ''} ${isHolding ? 'holding' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      Press, Hold, Release
    </button>
  );
};

export default PushButton;
