import React, {useState, useEffect} from 'react';

export const useHomePlanet = ({planetId}) => {
  const [planet, setPlanet] = useState('');
  const isCancelled = React.useRef(false);
  useEffect(() => {
    if (!planetId) {
      return;
    }
    fetch(`https://swapi.dev/api/planets/${planetId}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        if (!isCancelled.current) {
          setPlanet(response.name);
        }
      });
    return () => {
      isCancelled.current = true;
    };
  }, [planetId]);
  return planet;
};
