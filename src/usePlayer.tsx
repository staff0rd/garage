import { useEffect, useCallback } from "react";
import { Game } from "./Game";
import { RootState } from "./store/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import * as gsap from "gsap";
import { dequeue } from "store/playerSlice";
import { Utils } from "@staff0rd/typescript";

export const usePlayer = (game: Game) => {
  const dispatch = useCallback(useDispatch(), []);
  const destination = useSelector(
    (state: RootState) => state.player.destination
  );
  const nextAction = useSelector((state: RootState) => state.player.actions[0]);

  useEffect(() => {
    if (game && game.player && destination) {
      const distance = Utils.distance(game.player, destination);
      const time = distance / game.player.pixelsPerSecond;
      gsap.TweenLite.to(game.player._view, time, {
        ...destination,
        ease: gsap.Power0.easeIn,
        onComplete: () => {
          dispatch(dequeue());
        },
      });
    }
  }, [destination, game, game.player, dispatch]);

  useEffect(() => {
    if (nextAction) {
      dispatch(nextAction);
    }
  }, [nextAction, dispatch]);
};
