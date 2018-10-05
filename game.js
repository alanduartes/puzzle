game = () => {
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
    }

    render = () => {
        const elemInteractArea = document.getElementsByClassName('interact-area')[0];
        const elemUl = document.createElement('ul');
        elemUl.className = "container";
        elemInteractArea.className += " container";
    
        for (let i = 0; i < mat.length ;i++) {
            for (let j = 0; j < mat.length; j++) { // Cria element
                const elemLi = document.createElement('li');
                elemLi.className = "container";
                elemLi.className += " piece";
                elemLi.setAttribute("draggable", "true");
    
                const content = mat[i][j].content;
                if ((i+1) == mat.length && (j+1) == mat.length)
                    elemLi.className += " no-piece";
                elemLi.appendChild(document.createTextNode(content));
                elemUl.appendChild(elemLi);
            }
        }
    
        elemInteractArea.appendChild(elemUl);
    
    }

    init(); 
    return this;
}