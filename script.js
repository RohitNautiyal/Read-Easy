const text = '“Stopping by Woods On a Snowy Evening” by Robert Frost\n\nWhose woods these are I think I know.\nHis house is in the village though.\nHe will not see me stopping here\nTo watch his woods fill up with snow.\nMy little horse must think it queer\nTo stop without a farmhouse near\nBetween the woods and frozen lake\nThe darkest evening of the year.\nHe gives his harness bells a shake\nTo ask if there is some mistake.\nThe only other sound’s the sweep\nOf easy wind and downy flake.\nThe woods are lovely, dark and deep,\nBut I have promises to keep,\nAnd miles to go before I sleep,\nAnd miles to go before I sleep.\n';
const marks = new Set([' ', ',', '.', ':', ';', '"', '\'', '?', '+', '(', ')', '#', '!', '&', '-']);
let editState = 0;
const input = document.getElementById("inp");
const textDiv = document.querySelector(".text-div");
const textDivContainer = document.querySelector(".text-div-container");
const editOption = document.querySelector(".edit");
const doneOption = document.querySelector(".done");

// textDiv.textContent = text;
// input.value = text;
// input.style.minHeight = `${input.scrollHeight}px`;
// input.value = text + text + text;

////////////////////////////////////////////

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

document.onmouseup = document.onkeyup = function () {
    let text = getSelectionText();
    if(text){
        processSelection(text);
    }
};
////////////////////////////////////////////

function cleanSelection(str) {
    if (marks.has(str[0])) {
        str = str.slice(1, );
    }
    let l = str.length - 1;
    if (marks.has(str[l])) {
        str = str.slice(0, l);
    }
    return str;
}

function processSelection(selection) {
    selection = cleanSelection(selection);
    if (selection.length > 0 && selection.split(' ').length === 1) {
        searchWord(selection);
    }
}
/////////////////////////////////////////////

// input.addEventListener('select', (e) => {
//     if (state) {
//         let selection = cleanSelection(e.target.value.substring(e.target.selectionStart, e.target.selectionEnd));

//         if (selection.length > 0 && selection.split(' ').length === 1) {
//             searchWord(selection);
//         }
//     }
// });

editOption.addEventListener('click', (e) => {
    if(!editState){
        input.value = textDiv.textContent;
        textDivContainer.classList.toggle("hide");
        textDiv.classList.toggle("hide");
        input.classList.toggle("hide");
        input.select();
        editOption.classList.toggle("hide");
        doneOption.classList.toggle("hide");
        editState = 1;
    }
    // input.setAttribute("readonly", "readonly");
});
doneOption.addEventListener('click', (e) => {
    if(editState){
        textDiv.classList.toggle("hide");
        textDivContainer.classList.toggle("hide");
        textDiv.textContent = input.value;
        input.classList.toggle("hide");
        input.select();
        editOption.classList.toggle("hide");
        doneOption.classList.toggle("hide");
        editState = 0;
    }
});

async function searchWord(word) {
    // console.clear();
    console.log(word);
    let url = "Some api url";
    console.log(response);
}

// input.addEventListener('change', (e)=>{
//     console.log('change');
//     if (!e.target.value.startsWith('\n')){
//         e.target.value = '\n' + e.target.value;
//     }
//     if(!e.target.value.endsWith('\n')){
//         e.target.value = e.target.value + '\n';
//     }  
// });
