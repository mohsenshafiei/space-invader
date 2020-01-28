import React from 'react';
import style from './style.scss';
import playerImage from './assets/player.png';
export const SpaceInvader = () => {
  const ref = React.useRef(null);
  const [playerPostion, setPlayerPosition] = React.useState({x: 550, y: 310});

  const pressed = ({ keyCode }) => {
    console.log(keyCode);
    if (keyCode === 39) {
      setPlayerPosition({x: playerPostion.x, y: playerPostion.y + 30})
    }
    if (keyCode === 37) {
      setPlayerPosition({x: playerPostion.x, y: playerPostion.y - 30})
    }
  }

  return (
    <div
      className={style.container}
      onKeyDown={e => pressed(e)}
      role="button"
      tabIndex="0"
      ref={ref}
    >
      <img
        className={style.spaceship}
        src={playerImage}
        style={{ top: playerPostion.x,  left: playerPostion.y }}
      />
    </div>
  )
}
