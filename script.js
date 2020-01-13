// sets container size, creates divs to fill container, gives divs listener, adds divs
function makeBoard(num) {

    // stops function if user pushes cancel on new input, leaving old grid in place
    if (num == null) {
        return;
    }

    // clears old grid to make room for new grid
    resetGrid();

    let boxSize = (600 / num) + "px";
    let boxTotal = num * num;
    let container = document.getElementById("boardContainer");

    container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${num}, 1fr)`;

    for (i = 0; i < (boxTotal); i++) {
        let div = document.createElement("div");
        div.style.width = boxSize;
        div.style.height = boxSize;
        div.classList.add("boxes");
        div.setAttribute("id", "div" + i);

        container.appendChild(div);
    }
}


function resetGrid() {
    const box = Array.from(document.querySelectorAll('.boxes'));
    box.forEach(boxes => boxes.parentNode.removeChild(boxes));
}

makeBoard(3); 