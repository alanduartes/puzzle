import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Piece(props)
{
    return <div className={"piece container " + (props.value === "0" ? 'empty-piece' : '')}
                onClick={props.onClick}
            >
                    {props.value}
            </div>;
}

class PuzzleArea extends React.Component
{
    handleClick(i)
    {
        alert('Handoulando o clique ' + i);
    }

    renderPiece(idx)
    {
        return (<Piece 
                    value={idx}
                    onClick={() => this.handleClick(idx)}
                />);
    }

    render()
    {
        return (
            <div className="interact-area">
                <div className="row container">
                    {this.renderPiece(0)}
                    {this.renderPiece(1)}
                    {this.renderPiece(2)}
                </div>
                <div className="row container">
                    {this.renderPiece(3)}
                    {this.renderPiece(4)}
                    {this.renderPiece(5)}
                </div>
                <div className="row container">
                    {this.renderPiece(6)}
                    {this.renderPiece(7)}
                    {this.renderPiece(8)}
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