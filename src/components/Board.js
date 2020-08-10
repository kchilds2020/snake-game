import React, {useContext, useEffect} from 'react'
import {Context} from './Context'
import styled from 'styled-components'
import {APPLE_WIDTH, APPLE_HEIGHT} from './config'


const Board = () => {

    let {canvas} = useContext(Context)

    useEffect(() => {
        if(canvas) {
            console.log('Board Context', canvas)
            let ctx = canvas.current.getContext("2d");
            ctx.fillStyle = 'red';
            ctx.fillRect(10, 10, APPLE_WIDTH, APPLE_HEIGHT);
        }
    }, [canvas])

    return (
        <Container>
            <Canvas  ref = {canvas}/>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Canvas = styled.canvas`
  width: 500px;
  height: 500px;
  border: black 1px solid;
  margin: 20px;
`


export default Board
