game = () => {
    let solved = false;
    let mat = [];    
    const pieces = [
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

    init = () => {
        mat[0] = [];
        mat[0][0] = pieces[0];
        mat[0][1] = pieces[1];
        mat[0][2] = pieces[2];
        mat[1] = [];
        mat[1][0] = pieces[3];
        mat[1][1] = pieces[4];
        mat[1][2] = pieces[5];
        mat[2] = [];
        mat[2][0] = pieces[6];
        mat[2][1] = pieces[7];
        mat[2][2] = pieces[8];

        // mat = shuffle(mat);
        // while (isSolved()) {
        //     mat = shuffle(mat);
        // }
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

        return new Promise((resolve, reject) => 
        {
            resolve(solved);
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
        pSolved = isSolved();
        pSolved.then((solved) => {
            if (solved) alert('Resolvido');
        });
        
    }

    getMat = () => {
	    return mat;
    }

    init(); 
    return this;
}
