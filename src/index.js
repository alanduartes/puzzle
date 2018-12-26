import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Piece(props)
{
    return <div className={"piece container " + (props.value === "0" ? 'empty-piece' : '')}
                onClick={props.handleClick}
            >
                    {props.value}
            </div>;
}

class PuzzleArea extends React.Component
{
    handleClick()
    {
        alert('Handoulando o clique');
    }

    render()
    {
        return (
            <div className="interact-area" onClick={this.handleClick}>
                <div className="row container">
                    <Piece value="0"/>
                    <Piece value="1"/>
                    <Piece value="2"/>
                </div>
                <div className="row container">
                    <Piece value="3"/>
                    <Piece value="4"/>
                    <Piece value="5"/>
                </div>
                <div className="row container">
                    <Piece value="6"/>
                    <Piece value="7"/>
                    <Piece value="8"/>
                </div>
            </div>
        );
    }
}

class Game extends React.Component
{
    render()
    {
        return (
            <div className="game">
                <PuzzleArea />
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("app"));