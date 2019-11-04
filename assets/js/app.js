init = () => {
    console.log('Initializing app..');
    this.initFirebase();

    console.log('Generating 8x8 grid..');
    this.generateGrid(8);
}

generateGrid = (count) => {
    const grid = document.querySelector('.grid');

    for(let rows = 0; rows < count; rows++) {
        for(let columns = 0; columns < count; columns++) {
            const cell = document.createElement('div');
            cell.className = "cell";
            grid.appendChild(cell);
        }
    }
}

window.addEventListener('load', init);
