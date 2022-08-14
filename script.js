const getByClass = (value) => document.getElementsByClassName(value)[0]
const getById = (value) => document.getElementById(value)

const styleBtn = getByClass("style btn")
const editBtn = getByClass("edit btn")
let textArea = getById ("textarea") 
let previewContainer = getById("preview")
const upperContainer = getById("upperContainer")
const bottomContainer = getById("bottomContainer")
const controlBlock = getById("controlBlock")
const addSaveCC = getById("addSaveControlContainer")
const saveBtn = getById("saveBtn")
const addBtn = getById("addBtn")
const textStyleContainer = getById("styleBlock")
const tableListContainer = getById("createTableListContainer")

const tableBtn = getById("createTableBtn")
const listBtn = getById("createListBtn")
const palette = getByClass("palette")


styleBtn.onclick = function() {
    textStyleContainer.style.display = "block";
    addSaveCC.style.display = "none";
    
}

editBtn.onclick = function() {
    addSaveCC.style.display = "block";
    textStyleContainer.style.display = "none";
    palette.style.display = "none";
    getById("textarea").value = getById("startText").innerHTML;
}

// font properties ----------------------------------------------------------------
const size = document.forms['sizeForm'];
for (i=0; i<size.length; i++) {
    sizeForm.elements[i].addEventListener('click', function() {
        previewContainer.style.fontSize = this.value
    })
}

const font = document.forms['fontForm'];
font.ftype.onchange = function() {
    for (i=0; i<font.ftype.options.length; i++) {
        if (font.ftype.options[i].selected) {
            previewContainer.style.fontFamily = this.value
        }
    }
}

// color ---------------------------------------------------------
const textCol = getById("textColor");
const bgrdCol = getById("bgrdColor");

let whichButtonClicked = "";
textCol.onclick = function() {
    palette.style.display = "block";
    whichButtonClicked = this.id;
}

bgrdCol.onclick = function() {
    palette.style.display = "block";
    whichButtonClicked = this.id;
}

const colBlocks = document.getElementsByName("col");

for (i=0; i<colBlocks.length; i++) {
    colBlocks[i].addEventListener('click', function() {
        if (whichButtonClicked == "bgrdColor") {
            upperContainer.style.backgroundColor = this.style.backgroundColor
        }   
        if (whichButtonClicked == "textColor") {
            upperContainer.style.color = this.style.backgroundColor
        } 
    })
}

// style ----------------------------------------------------------
const form = document.forms['styleForm'];
form.bstyle.addEventListener('click', function () {
    if (this.checked) {
        upperContainer.style.fontWeight = this.value;
    }
    else {
        upperContainer.style.fontWeight = "normal";
    }
})

form.istyle.addEventListener('click', function () {
    if (this.checked) {
        upperContainer.style.fontStyle = this.value;
    }
    else {
        upperContainer.style.fontStyle = "normal";
    }
})

// choose list -------------------------------------------------

addBtn.onclick = function() {
    tableListContainer.style.display = "block";
    upperContainer.style.display = "none";
    bottomContainer.style.display = "none";
    controlBlock.style.display = "none";
    
}

saveBtn.onclick = () => {
    previewContainer.innerHTML = textArea.value;
}
// table/list editor -----------------------------------------------

function change2Table() {
    const table = getById('table');
    if (table.checked) {
        getById("tableCreator").style.display = "block";
    }
    else {
        getById("tableCreator").style.display = "none";
    }

    const list = getById('list');
    if (list.checked) {
        getById("listCreator").style.display = "block";
    }
    else {
        getById("listCreator").style.display = "none";
    }
}


// table maker ----------------------------------------------------
tableBtn.onclick = function() {
    
    tableListContainer.style.display = "none";
    previewContainer.style.display = "block";
    upperContainer.style.display = "block";
    bottomContainer.style.display = "block";
    controlBlock.style.display = "block";

    const numRows = getById("rowsNo").value;
    const numCells = getById("cellsNo").value;
    const widthCells = getById("rowsWidth").value;
    const heightCells = getById("cellsHight").value;
    const borderWidth = getById("tableBorderWidth").value;
    const borderColor = getById("tableBorderColor").value;
    const borderStyle = getById("tableBorderType").value;

    const table = document.createElement("table");
        table.style.borderWidth = `${borderWidth}px`;
        table.style.borderColor = borderColor;
        table.style.borderCollapse = "collapse";
        table.style.borderStyle = borderStyle;


    for (i=0; i<numRows; i++) {
        const tr = table.insertRow();
        tr.style.height = `${heightCells}px`;
        for (j=0; j<numCells; j++) {
            const td = tr.insertCell();
            td.appendChild(document.createTextNode(`TD`));
            td.style.width = `${widthCells}px`;
            td.style.borderWidth = `${borderWidth}px`;
            td.style.borderColor = borderColor;
            td.style.borderStyle = borderStyle;
            td.style.borderCollapse = "collapse";


        }
    }
    textArea.value += table.outerHTML;
}

// list maker ---------------------------------------------------

listBtn.onclick = function() {
    
    tableListContainer.style.display = "none";
    previewContainer.style.display = "block";
    upperContainer.style.display = "block";
    bottomContainer.style.display = "block";
    controlBlock.style.display = "block";

    const liitems = getById("numberOfListItems");
    const ul = document.createElement('ul');
    
    for (i=0; i<liitems.value; i++) {
        const li = document.createElement('li')
        li.innerHTML = "item"
        li.style.listStyleType = getById('marking').value
        ul.appendChild(li)
    }

    textArea.value += ul.outerHTML;
  
}
