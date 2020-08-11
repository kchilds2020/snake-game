import React, {useRef, useState, useEffect} from 'react';
import './App.css';
import {CANVAS_SIZE, SNAKE_START,APPLE_START, SCALE, SPEED, DIRECTIONS} from './config'
import styled from 'styled-components'
import {useInterval} from './useInterval'

function App() {
  const canvasRef = useRef(null)

  const [snake,setSnake] = useState(SNAKE_START)
  const [apple,setApple] = useState(APPLE_START)
  const [dir,setDir] = useState([0, -1])
  const [speed,setSpeed] = useState(null)
  const [gameOver,setGameOver] = useState(false)
  const [score, setScore] = useState(0)

const startGame = () =>{
  setSnake(SNAKE_START)
  setApple(APPLE_START)
  setDir([0,-1])
  setSpeed(SPEED)
  setGameOver(false)
  setScore(0)
}

const endGame = () =>{  
  setSpeed(null)
  setGameOver(true)

}

const moveSnake = ({ keyCode }) =>  keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

const createApple = () => apple.map((_, i) => Math.floor(Math.random() * CANVAS_SIZE[i]/SCALE)) 

const checkCollision = (piece, snk = snake) => {
  if(piece[0] * SCALE >= CANVAS_SIZE[0] || piece[0] < 0 || piece[1] * SCALE >= CANVAS_SIZE[1] || piece[1] < 0)
    return true

  for(const segment of snk){
    if(piece[0] === segment[0] && piece[1] === segment[1]) return true
  }
  return false

}

const checkAppleCollision = newSnake => {
  if(newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]){
    let newApple = createApple()
    setScore(score + 1)
    while(checkCollision(newApple, newSnake)){
      newApple = createApple()
    }
    setApple(newApple)
    return true
  }
  return false
}

const gameLoop = () => {
  const snakeCopy = JSON.parse(JSON.stringify(snake));
  const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]
  snakeCopy.unshift(newSnakeHead)
  if(checkCollision(newSnakeHead)) endGame()
  if(!checkAppleCollision(snakeCopy)) snakeCopy.pop()
  setSnake(snakeCopy)
}



useEffect(() => {
  const context = canvasRef.current.getContext('2d')
  context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
  context.clearRect(0,0,CANVAS_SIZE[0], CANVAS_SIZE[1])
  context.fillStyle = 'green'
  snake.forEach(([x,y]) => context.fillRect(x, y , 1, 1))
  context.fillStyle = 'pink'
  context.fillRect(apple[0],apple[1], 1, 1)
},[snake, apple, gameOver])

useInterval(() => gameLoop(), speed)

  return (
    <Window>
      <Container>
        <Game role='button' tabIndex='0' onKeyDown={e => moveSnake(e)}>
          {gameOver ? <Title>Game Over: {score}</Title> : <Title>Score: {score}</Title>}
          <Canvas ref={canvasRef} width = {CANVAS_SIZE[0]} height = {CANVAS_SIZE[1]}/>
          <Button onClick={startGame}>Start Game</Button>
        </Game>
      </Container>
    </Window>
  );
}


const Window = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(55, 60, 69);
`

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Game = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Canvas = styled.canvas`
  box-shadow: 0px 0px 4px #333;
  border-radius: 8px;
  margin-top: 20px;
  background-color: white;
`

const Button = styled.button`
  width: 100%;
  margin: 10px;
  padding: 5px;
  border: none;
  background-color: rgb(77, 115, 189);
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 8px;
  box-shadow: 0px 0px 4px #333;
  cursor: pointer;

  :focus{
    outline: none;
  }

`

const Title = styled.h2`
  margin: 0px;
  color: white;
`



export default App;
