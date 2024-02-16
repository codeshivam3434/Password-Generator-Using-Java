const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg= document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn= document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox");

let password="";
let passwordLength=6;
let checkCount=0;
let symbols='!@#$%^&*()_+*-?><:|~';
handleSlider();
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}
//my approach
// function setIndicator(passwordLength){
//     switch (passwordLength) {
//         case 1:
//             if (passwordLength.length>=7) {
//                 indicator.style.backgroundColor='red';
//             }
//             break;
    
//         default:
//             break;
//     }
// }
// setIndicator();
function setIndicator(color){
    indicator.style.backgroundColor=color;
}

//my approach

// function getRndInteger(min=1,max=20){
//     //or let min=1,max=20
//        Math.random(min,max) 
// }

function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
//my approach
// let symbols=['!','@','$','%','^','&','&','(','*',')','-','_','/','?','[',']','{','}']

// function generateSymbol(){
//     return symbols[getRndInteger(0,17)];
// }

function generateSymbol(){
    const randNum= getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if (uppercaseCheck.checked) hasUpper=true;
    if (lowercaseCheck.checked) hasLower=true;
    if (numbersCheck.checked)   hasNum=true;
    if (symbolsCheck.checked)   hasSym=true;

    if(hasLower&&hasUpper&&(hasNum||hasSym)&&passwordLength>=8){
        setIndicator("#0f0");
    }else if ((hasLower||hasUpper) &&(hasNum&&hasSym)&&(passwordLength>=6)){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}

//how to copy clipboard

function shufflePassword(array){
    //Fisher Yates Method to shuffle the elements in array
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((e)=>(str+=e));
    return str;
}

async function copycontent(){
    try{

        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied"
    }
    catch(e){
        copyMsg.innerText="Failed"

    }
    //to make copy waala span visible
    copyMsg.classList.add("active");


    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);

}
//function to count the checkbox checked or not
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        checkCount++;
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}


allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copycontent();
    }
})

//generate password
generateBtn.addEventListener('click',()=>{
    if(checkCount<=0)
      return ;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    password="";
    // if(uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password+=generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    let funcArr=[];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    //jinko tick kiya hai unko include krna hi hai then uske baad remaining length password randomly fill karo
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex=getRndInteger(0,funcArr.length);
        password+=funcArr[randIndex]();
    }
//shuffle password
password=shufflePassword(Array.from(password));

//show in Ui
passwordDisplay.value=password;
calcStrength();



})


