//Pour styliser l'input type range et récupérer sa position afin de coloriser le pourcentage requis.--------------------
const rangeInputs = document.querySelectorAll('input[type="range"]');

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}
rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange);
});


//Password generator !--------------------------------------------------------------------------------------------------
const buttonCopie =document.getElementById('export');
const snackBar =document.getElementById('snackbar');
const characterAmountRange = document.getElementById('input_range_value');
const characterAmountNumber = document.getElementById('rangevalue');

const includeUppercaseElement = document.getElementById('uppercase');
const includeNumbersElement = document.getElementById('numbers');
const includeSymbolsElement = document.getElementById('special_characters');
const includeLowercaseElement =document.getElementById('lowercase');
const form = document.getElementById('form');

//avec pushInArray je selectionne  un index a et b , un debut et une fin.
const passwordDisplay = document.getElementById('display');
const emptyCodes =pushInArray();//je push rien ici
const uppercaseCodes = pushInArray(65, 90);
const lowercaseCodes = pushInArray(97, 122);
const numberCodes = pushInArray(48, 57);
const symbolCodes = pushInArray(33, 47).concat(
    pushInArray(58, 64)
).concat(
    pushInArray(91, 96)
).concat(
    pushInArray(123, 126)
);

//nombre de caractères définis par l'utilisateur via l'input range via ma fonction amountSelector.
characterAmountNumber.addEventListener('input', amountSelector);
characterAmountRange.addEventListener('input', amountSelector);
form.addEventListener('submit', e => {
    e.preventDefault();

    const characterAmount = characterAmountNumber.value;
    //".checked" permet de retrouner si l'élèment est coché ou non.
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const includeLowercase = includeLowercaseElement.checked;

    testValidCheckbox();
    function testValidCheckbox(){
        //je vérifie si au moin une case est cochée.
        let chkd = includeUppercaseElement.checked || includeNumbersElement.checked||includeSymbolsElement.checked|| includeLowercaseElement.checked
        // si c'est ok je lance la fonction generatePassword....
        if (chkd === true){
            const password = generatePassword(includeLowercase,characterAmount, includeUppercase, includeNumbers, includeSymbols);
            //..puis je display le code dans l'output.
            passwordDisplay.innerText = password;
            //Ici je permets à la fonction copieCode de pouvoir s'effectuer, (quand un code est affiché dans l'output en quelque sorte)
            copieCode();

        }else{
            //sinon la gestion de l'erreur
            navigator.clipboard.writeText(passwordDisplay.value);
            snackBar.innerHTML = "No checkbox selected!";
            snackBar.className = "show";
            setTimeout(function () {
                //efface le toast apres un certain temps
                snackBar.className = snackBar.className.replace("show", "");
            }, 3000);
        }
    }
});
function generatePassword(includeLowercase,characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes =emptyCodes ;//Je créé un tableau vide.
    //Si le paramètre de la fonction est accepté, j'inclus le tableau de
    // 1 : majuscules
    // 2: symboles
    // 3: chiffres
    //4: minuscules
    // Puis je fusionne plusieurs tableaux en les concaténant avec "concat".
    if (includeLowercase) charCodes = charCodes.concat(lowercaseCodes );
    if (includeUppercase) charCodes = charCodes.concat(uppercaseCodes);
    if (includeSymbols) charCodes = charCodes.concat(symbolCodes);
    if (includeNumbers) charCodes = charCodes.concat(numberCodes);
    const passwordCharacters = [];//Je créé un tableau vide, il sera bientôt remplis de charactères...
    for (let i = 0; i < characterAmount; i++) {
        //Aléatoirement, les élèments sont tirés du tableau et push dans le tableau passwordCharacters précèdement créé.
        //J'utilise la méthode string.fromCharCode et cela me renvoie une chaîne de caractères créée à partir de points de code UTF-16.
        //Ensuite le tableau charCode va sortir aléatoirement les charactères et les pusher dans la variable
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    //Avec join() je crée et renvoie une nouvelle chaine de caractère en concaténant tous ses éléments
    return passwordCharacters.join('');
}

function pushInArray(low, high) {
    //quand cette fonction est appelée, elle "push" dans le tableau autant d'éléments qu'il est possible dans l'interval de symbole ou nombre ou lettre possibles
    const array = [];//j'ai créé encore un autre tableau vide à remplir bientôt.
    for (let i = low; i <= high; i++) {
        //j'ajoute des elements dans le tableau avec push
        array.push(i);
    }
    return array;
}

function amountSelector(e) {
    //permet de récuperer le nombre de caractères définis par l'utilisateur via l'input range
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}

function copieCode(){
    //Je créer un évènement au click qui copie le résultat dans le presse-papier du système
    buttonCopie.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordDisplay.value);
        snackBar.innerHTML = "Successfully copied !";
        snackBar.className = "show";
        setTimeout(function () {
            //efface le toast apres un certain temps
            snackBar.className = snackBar.className.replace("show", "");
        }, 3000);
    });
}





