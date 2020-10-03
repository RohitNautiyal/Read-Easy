(()=>{
    const text = '“Stopping by Woods On a Snowy Evening” by Robert Frost\n\nWhose woods these are I think I know.\nHis house is in the village though.\nHe will not see me stopping here\nTo watch his woods fill up with snow.\nMy little horse must think it queer\nTo stop without a farmhouse near\nBetween the woods and frozen lake\nThe darkest evening of the year.\nHe gives his harness bells a shake\nTo ask if there is some mistake.\nThe only other sound’s the sweep\nOf easy wind and downy flake.\nThe woods are lovely, dark and deep,\nBut I have promises to keep,\nAnd miles to go before I sleep,\nAnd miles to go before I sleep.\n';
    const marks = new Set([',', '.', ':', ';', '"', '\'', '?', '+', '(', ')', '#', '!', '&', '-']);

    const textarea = document.getElementById("textarea");
    const textDiv = document.querySelector(".text-div");
    const textDivContainer = document.querySelector(".text-div-container");
    const editOption = document.querySelector(".edit");
    const doneOption = document.querySelector(".done");
    const loader = document.querySelector(".loader");

    const dictionaryInput = document.querySelector(".dictionary__input");
    const definitions = document.querySelector(".definitions");
    const dictionarySlider = document.querySelector(".dictionary__slider");
    const dictionaryShowIcon = document.querySelector(".icon-show");
    const dictionaryHideIcon = document.querySelector(".icon-hide");
    const dictionaryContainer = document.querySelector(".dictionary-container");
    const alphaList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let dictionaryActive = 0;

    textDiv.textContent = text;
    textarea.value = text;

    function getSelectionText() {
        let text = "";
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
    
    function cleanSelection(str) {
        str = str.trim();
        if(str) {
            if (marks.has(str[0])) {
                str = str.slice(1, );
            }
            let l = str.length - 1;
            if (marks.has(str[l])) {
                str = str.slice(0, l);
            }
        }
        return str;
    }
    
    function processSelection(selection) {
        selection = cleanSelection(selection);
        if(selection && selection.split(' ').length <= 3) {
            if(dictionaryInput.value && selection === dictionaryInput.value) {return;}
            searchWord(selection);
        }
    }
    
    editOption.addEventListener('click', (e) => {
        editOption.classList.toggle("hide");
        doneOption.classList.toggle("hide");
        textarea.value = textDiv.textContent;
        textDivContainer.classList.toggle("hide");
        textDiv.classList.toggle("hide");
        textarea.classList.toggle("hide");
        textarea.select();
    });

    doneOption.addEventListener('click', (e) => {
        textDiv.textContent = textarea.value;
        editOption.classList.toggle("hide");
        doneOption.classList.toggle("hide");
        textDiv.classList.toggle("hide");
        textDivContainer.classList.toggle("hide");
        textarea.classList.toggle("hide");
        textarea.select();
    });
    
    async function searchWord(word) {
        if(!dictionaryActive) {
            document.querySelector(".dictionary__default-text").classList.add("hide");
            dictionaryActive = 1;
        }
    
        if(window.innerWidth <= 800 && !dictionaryContainer.classList.contains('dictionary-show') ) {
            dictionarySlide();
        }
    
        dictionaryInput.value = word;
        // console.log(word);
        loader.classList.remove("hide");
        definitions.classList.add("hide");
        let response;
        try {
            response = await axios(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                    "x-rapidapi-key": API_KEY
                }
            });
            loader.classList.add("hide");
            definitions.classList.remove("hide");
            displayDefinitions(response);
        }catch(err) {
            loader.classList.add("hide");
            definitions.classList.remove("hide");
            displayError();
        }
    }

    function displayError() {
        let html = `<h1>Oops! Something went wrong.</h1>`;
        definitions.innerHTML = "";
        definitions.insertAdjacentHTML("beforeend", html);
    }
    
    function displayDefinitions(data) {
        definitions.innerHTML = "";
        if(data.data.list.length === 0) {
            let html = `<h1>Sorry! Couldn't find anything. Try searching another word.</h2>`;
            definitions.insertAdjacentHTML("beforeend", html);
            return;
        }
        const html = `<div class="definition"><div class="definition__name">%NUMBER%<span>%WORD%</span></div><div class="definition__meaning">%MEANING%</div><div class="definition__example">%EXAMPLE%</div></div>`
        let count = 0;
        data.data.list.forEach(definition => {

            let temp = html.replace('%NUMBER%', alphaList[count]+'.');
            temp = temp.replace('%WORD%', definition.word);
            temp = temp.replace('%MEANING%', definition.definition);
            temp = temp.replace('%EXAMPLE%', definition.example);
            definitions.insertAdjacentHTML("beforeend", temp);
            count++;
        })
    }

    dictionaryInput.addEventListener('keyup', (e) => {
        if(e.code === "Enter") {
            let word = e.target.value;
            e.target.value = '';
            e.target.blur();
            processSelection(word);
        }
    });
    
    dictionarySlider.addEventListener('click', dictionarySlide);
    
    function dictionarySlide() {
        dictionaryShowIcon.classList.toggle('hide');
        dictionaryHideIcon.classList.toggle('hide');
        dictionaryContainer.classList.toggle('dictionary-show');
    }

})();