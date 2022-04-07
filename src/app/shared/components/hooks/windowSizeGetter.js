import { useState, useEffect } from 'react'

/**
 * Gets dynamically window dimensions
 * 
 * @returns window dimensions
 * @author jerome
 */
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}
  
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}
		//As soon as the listener finds a new event, set windowDimensions hook to new retrieved dimensions
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
  	return windowDimensions;
}