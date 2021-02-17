import React from "react";
import { useEffect } from "react";

export function HotKey(props) {
  const scope = props.scope || window.parent;
  useEffect(() => {
    scope.addEventListener("keydown", onKeydown);
    return () => {
      scope.removeEventListener("keydown", onKeydown);
    };
  });

  let keys = props.keys; // see https://keycode.info/
  if (!keys || !keys.length) return <></>;
  if (typeof keys == "string" || keys instanceof String) keys = [keys];

  const parent = React.createRef();
  const onKeydown =
    props.callback ||
    ((e) => {
      if (keys.indexOf(e.code) >= 0) {
        parent &&
          parent.current &&
          parent.current.children &&
          parent.current.children[0] &&
          parent.current.children[0].click();
      }
    });

  return (
    <div data-hotkey={props.keys} ref={parent}>
      {props.children}
    </div>
  );
}

export default HotKey;
