import { useEffect, useCallback } from "react";
import { RootState } from "./store/rootReducer";
import { useSelector, useDispatch } from "react-redux";

export const usePlayer = () => {
  const dispatch = useCallback(useDispatch(), []);

  const nextAction = useSelector((state: RootState) => state.game.actions[0]);

  useEffect(() => {
    if (nextAction) {
      dispatch(nextAction);
    }
  }, [nextAction, dispatch]);
};
