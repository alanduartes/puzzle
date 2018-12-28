import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Timer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =  {
            time: 0
        };
    }

    tick()
    {
        const countingTime = this.state.time + 1;
        this.setState({
            time: countingTime
        });
    }

    componentDidMount()
    {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount()
    {
        clearInterval(this.interval);
    }

    render()
    {
        return (
            <div className="timer">
                { this.state.time ? this.state.time : 0}
            </div>
        );
    }
}

function Piece(props)
{
    return <div className={"piece container " + (props.value === 0 ? 'empty-piece' : '')}
                onClick={props.onClick}
            >
                    {props.value}
            </div>;
}

class PuzzleArea extends React.Component
{
    renderPiece(idx)
    {
        return (<Piece 
                    value={idx}
                    onClick={() => this.props.onClick(idx)}
                    key={idx}
                />);
    }

    render()
    {
        let row = [];
        // Passa por cada elemento da matriz para monta-lá na ordem em que ela se encontra
        this.props.mat.forEach((value, k) => {
            let pieces = [];
            // Montagem linha por linha
            for (let i = 0; i < value.length; i++) {
                pieces.push(this.renderPiece(value[i]));    
            }
            // Adiciona todos as peças de cada linha
            row.push(
                (
                    <div className="row container" key={k}>
                        { pieces }
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

        do {

            mat = this.shuffle();

        } while (!this.puzzleIsSolvable(mat));

        this.state = {mat: mat};
    }

    handleClick(i)
    {
        let mat = this.state.mat.slice();
        const zero = indexOfMatrix(mat, 0);
        const clicked = indexOfMatrix(mat, i);

        if ((clicked[0]-1 === zero[0] && clicked[1] === zero[1]) 
            || (clicked[0]+1 === zero[0] && clicked[1] === zero[1])
            || (clicked[0] === zero[0] && clicked[1]+1 === zero[1]) 
            || (clicked[0] === zero[0] && clicked[1]-1 === zero[1])) {
            mat[clicked[0]][clicked[1]] = 0;
            mat[zero[0]][zero[1]] = i;
            this.setState({
                mat: mat
            });
        }

        this.render();
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

    // Method validate if the puzzle is solvable
    puzzleIsSolvable(pList)
    {
        let inversions = 0;
        // We'll use this var to transform our matriz in a unidimensional vector
        let verifyArr = [];

        for(let i = 0; i < pList.length; i++)
        {
            verifyArr = verifyArr.concat(pList[i]);
        }

        for(let i = 0; i < verifyArr.length; i++) {
            for(let j = i+1; j < verifyArr.length; j++) {
                // find invertions and ignore the 0 (zero) piece)
                if((verifyArr[j] < verifyArr[i]) && verifyArr[i] !== 0 && verifyArr[j] !== 0){
                    inversions++;
                }
            }
        }
        // If the SUM of the inversions is even then the puzzle is solvable
        if(inversions%2 === 1) return false;
        else return true;
    }
    
    render()
    {
        return (
            <div className="game">
                <PuzzleArea 
                    mat={this.state.mat}
                    onClick={i => this.handleClick(i)}
                />
            </div>
        );
    }
}

ReactDOM.render(<Timer />, document.getElementById("timer"));
ReactDOM.render(<Game />, document.getElementById("app"));

const indexOfMatrix = (mat, elem) => {
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {

            if (mat[i][j] === elem) return [i, j];

        }
    }

    return [];
};