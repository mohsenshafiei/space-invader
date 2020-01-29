import React from 'react';
import style from './style.scss';
import { useInterval } from "./useInterval";
import playerImage from './assets/player.png';
import enemyImage from './assets/enemy.png';
import bulletImage from './assets/bullet.png';
import {
  START_POSITION,
  START_ENEMIES_POSITION,
  GAME_SPEED
} from './constants';

export const SpaceInvader = () => {
  const ref = React.useRef(null);
  const [playerPostion, setPlayerPosition] = React.useState(START_POSITION);
  const [bulletsPosition, setBulletPosition] = React.useState([]);
  const [enemies, setEnemies] = React.useState(START_ENEMIES_POSITION)

  const pressed = ({ keyCode }) => {
    if (keyCode === 39) setPlayerPosition({x: playerPostion.x, y: playerPostion.y + 30})
    if (keyCode === 37) setPlayerPosition({x: playerPostion.x, y: playerPostion.y - 30})
    if (keyCode === 32) setBulletPosition([...bulletsPosition, playerPostion]);
  }

  const moveEnemies = () => {
    setEnemies(
      enemies.filter(enemy => (enemy.x < 680)).map(enemy => {
        if (enemy.y < 60) {
          return { x: enemy.x + 60, y: 580 }
        } else {
          return { x: enemy.x, y: enemy.y - 5 }
        }
      })
    )
  }

  const moveBullets = () => {
    setBulletPosition(
      bulletsPosition.filter(bullet => (bullet.x > 0)).map(bullet => {
        return { x: bullet.x - 5, y: bullet.y }
      })
    )
  }

  const collide = (x1, y1, x2, y2) => {
    const circle1 = {radius: 5, x: x1, y: y1};
    const circle2 = {radius: 5, x: x2, y: y2};
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < circle1.radius + circle2.radius)
  }

  const gameLoop = () => {
    moveEnemies();
    moveBullets();
  };

  useInterval(() => gameLoop(), GAME_SPEED);
  React.useEffect(() => ref.current.focus() , []);

  return (
    <div
      className={style.container}
      onKeyDown={e => pressed(e)}
      role="button"
      tabIndex="0"
      ref={ref}
      autoFocus
    >
      <img
        className={style.spaceship}
        src={playerImage}
        style={{ top: playerPostion.x,  left: playerPostion.y }}
      />
      {
        enemies.map((enemy, index) => {
          return(
            <img
              key={'enemy' + index}
              className={style.spaceship}
              src={enemyImage}
              style={{ top: enemy.x,  left: enemy.y }}
            />
          )
        })
      }
      {
        bulletsPosition.map((bullet, index) => {
          return(
            <img
              key={'bullet' + index}
              className={style.spaceship}
              src={bulletImage}
              style={{ top: bullet.x,  left: bullet.y }}
            />
          )
        })
      }
    </div>
  )
}
