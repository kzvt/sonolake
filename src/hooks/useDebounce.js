import { useEffect, useState } from "react";

export default (val, time) => {
  const [debounced, setDebounced] = useState(val)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(val), time);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);
  return debounced;
}