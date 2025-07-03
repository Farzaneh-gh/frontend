import React from 'react'
import { useEffect, useState } from 'react'
const LandingCounter = ({count}) => {
    const [countCounter, setCountCounter] = useState(0);
    useEffect(() => {
        const countInterval = setInterval(() => {
          setCountCounter((prevCount) => prevCount + 1);
        }, 1);
        if (countCounter >= count) {
          clearInterval(countInterval);
        }
        return () => clearInterval(countInterval);
      }, [countCounter,count]);
  return (
    <>{countCounter}</>
  )
}

export default LandingCounter