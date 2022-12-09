const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");
const amountUsed = document.getElementById("amount-used");
const amountLeft = document.getElementById("amount-left");
const loadingBar = document.getElementById("loading-shape-color");

const regexPattern = /([a-zA-Z0-9\s_\\.\-\(\):])+(png|jpg|jpeg|gif)$/i;
const conversion = 1024*1024;

let usedSpace = 0;
let fileCount = 0;

// updating the loading bar and the amount
const storageUpdate= ()=>{
    const width = (JSON.parse(localStorage.getItem("space")) / 10) * 583;
    loadingBar.style.width = width + "px";
    const usedSpaceString = localStorage.getItem("space").slice(0,4); // sliced only to 2 numbers after the dot
    amountUsed.innerHTML = usedSpaceString + " MB";
    amountLeft.innerHTML = (10 - usedSpaceString).toString().slice(0,4); // sliced only to 2 numbers after the dot
}

// if the page has been refreshed then keep the amount
if(JSON.parse(localStorage.getItem("space")) > 0)
{
    storageUpdate();
}

// open the file explorer when the custom button is clicked
customBtn.addEventListener("click", ()=>{
    realFileBtn.click();
})

// change the custom text 
realFileBtn.addEventListener("change", ()=>{
    if(realFileBtn.value){

        if(!(realFileBtn.value.match(regexPattern))) // checking file format
        {
            customTxt.innerHTML = "File format isn't supported"
        }

        else{
            const currentFileCount = realFileBtn.files.length;
            let fileSize = 0;

            for (let i = 0; i < currentFileCount; i++) {
                fileSize += (realFileBtn.files[i].size) / conversion // 1 mb = 1024*1024 bytes
            }
            
            if(JSON.parse(localStorage.getItem("space")) + fileSize > 10)
            {
                customTxt.innerHTML = "Upload Image";
                setTimeout(()=>alert("There is not enough space on the disk"), 1);
                return;
            }

            usedSpace += JSON.parse(localStorage.getItem("space")) + fileSize;
            localStorage.setItem("space", usedSpace);

            storageUpdate();

            if(currentFileCount > 1)
            {
                return customTxt.innerHTML = "Upload completed";
            }

            customTxt.innerHTML =  realFileBtn.value.slice(12, 29);  // remove fakepath
        }
    }

    // if there was no photo uploaded then keep the custom text the same
    else{
        customTxt.innerHTML = "Upload Image";
    }
})



