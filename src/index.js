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
        let row = [];

        this.props.mat.forEach((value) => {
            
            row.push(
                (
                    <div className="row container">
                        {this.renderPiece(value[0])}
                        {this.renderPiece(value[1])}
                        {this.renderPiece(value[2])}
                    </div>
                )
            );  

        });

        return (
            <div className="interact-area">
                { row }
            </div>
        );
    }
}

class Game extends React.Component
{
    constructor(props) {
        super(props);
        let mat = [];

        mat = this.shuffle();
        this.state = {mat: mat};
    }

    shuffle()
    {
        let sortedMat = [0,1,2,3,4,5,6,7,8];
        let arr = [];

        // Trick
        for(var j, x, i = sortedMat.length; i; j = parseInt(Math.random() * i), x = sortedMat[--i], sortedMat[i] = sortedMat[j], sortedMat[j] = x);
        
        let count = 0;
        for(let i = 0; i < 3; i++) {
            arr[i] = [];
            for (let j = 0; j < 3; j++) {
                arr[i][j] = sortedMat[count];
                count++;
            }
        }
	    return arr;
    }
    
    render()
    {
        return (
            <div className="game">
                <PuzzleArea 
                    mat={this.state.mat}
                />
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("app"));