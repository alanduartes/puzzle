game = () => {
    // TODO (make dynamic)
    const WIDTH = 3;
    const HEIGHT = 3;
    const PIECES = [
        {'content' : '1'}, 
        {'content' : '2'}, 
        {'content' : '3'}, 
        {'content' : '4'}, 
        {'content' : '5'}, 
        {'content' : '6'}, 
        {'content' : '7'}, 
        {'content' : '8'},
        {'content' : ''}
    ];

    let mat = [];

    init = () => {
        let shuffledPieces =  shuffle(PIECES);
        let countIdx = 0;

        for (let i = 0; i < WIDTH; i++) {
            mat[i] = [];
            for (let k = 0; k < HEIGHT; k++) {
                mat[i][k] = shuffledPieces[countIdx++];
            }
        }
        
        // Don't let the system to create a solved puzzle
        isSolved()
            .then((solved) => {
                init();
                render();
            }, 
            () => {});

    }

    /**
     * Randomly shuffle an array
     * https://stackoverflow.com/a/2450976/1293256
     * @param  {Array} array The array to shuffle
     * @return {String}      The first item in the shuffled array
     */
    shuffle = function (array) {

        var currentIndex = array.length;
        var temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;

    };

    render = () => {
        const elemInteractArea = document.getElementsByClassName('interact-area')[0];
        const elemUl = document.createElement('ul');

        elemInteractArea.innerHTML = '';
        elemUl.innerHTML = '';

        elemUl.className = "container";
    
        for (let i = 0; i < mat.length ;i++) {
            for (let j = 0; j < mat.length; j++) { // Cria element
                const elemLi = document.createElement('li');
                elemLi.className = "container";
                elemLi.className += " piece";
	            elemLi.setAttribute("onclick", "g.validateMovement("+i+", "+j+")");
    
                const content = mat[i][j].content;
                if (content == '')
                    elemLi.className += " no-piece";
                elemLi.appendChild(document.createTextNode(content));
                elemUl.appendChild(elemLi);
            }
        }
    
        elemInteractArea.appendChild(elemUl);
    
    }

    isSolved = () => {
       return new Promise((resolve, reject) => {
            let prevNum = 0;
            let solved = true;

            for (let i = 0; i < mat.length; i++) {
                for (let k = 0; k < mat.length; k++) {
                    if ((mat[i][k].content-1) != prevNum && mat[i][k].content != '') {
                        solved = false;
                        break;
                    }
                    prevNum++;
                }

                if (!solved) break;
            }
            
            if (solved)
                resolve(solved);
            else
                reject(solved);
        });
    }

    validateMovement = (row, col) => {
        if (mat[row][col].content != '') {
            if (typeof mat[row][col+1] !== 'undefined') {
                if(mat[row][col+1].content == '') {
                    mat[row][col+1].content = mat[row][col].content;
                    mat[row][col].content = '';
                    console.log('movement available');
                }
            }
            if (typeof mat[row][col-1] !== 'undefined') {
                if (mat[row][col-1].content == '') {
                    mat[row][col-1].content = mat[row][col].content;
                    mat[row][col].content = '';
                    console.log('movement available');
                }
            }
            if (typeof mat[row+1] !== 'undefined') {
                if(mat[row+1][col].content == '') {
                    mat[row+1][col].content = mat[row][col].content;
                    mat[row][col].content = '';
                    console.log('movement available');
                }
            }
            if (typeof mat[row-1] !== 'undefined') {
                if (mat[row-1][col].content == '') {
                    mat[row-1][col].content = mat[row][col].content;
                    mat[row][col].content = '';
                    console.log('movement available');
                }
            }
        } else {
            console.log('Not a piece');
        }

        render();
        isSolved()
            .then((solved) => {
                openModal();
            },
            () => {});
        
    }

    init(); 
    return this;
}
