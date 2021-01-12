import { useEffect } from "react";

export const useTimeout = (
  action: () => void,
  delayInMilliseconds: number,
  deps: any[] = []
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      action();
    }, delayInMilliseconds);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayInMilliseconds, action, ...deps]);
};

export const useInterval = (
  action: () => void,
  delayInMilliseconds: number,
  deps: any[] = []
) => {
  useEffect(() => {
    const timer = setInterval(() => {
      action();
    }, delayInMilliseconds);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayInMilliseconds, action, ...deps]);
};
