var products = document.getElementById("bookmarks");
var bookmarks =[];
var errBox = document.getElementById("checkbox");
var UrlRegEx = /^((https)|(http)):\/\/(www.)?[\S]+$/;


if(window.localStorage.getItem("bookmarks")){

    bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
    displayingBookmarks();
};

var currentName = document.getElementById("bookmarkName");
var currentURL = document.getElementById("siteUrl");

function chk(){
    if(currentName.value.length < 3){
        currentName.classList.add("is-invalid");
        currentName.classList.remove("is-valid");
        document.getElementById("tooltip").style.display = "flex";
    }else{
        currentName.classList.remove("is-invalid");
        currentName.classList.add("is-valid");
        document.getElementById("tooltip").style.display = "none";
    }
};

function chkURL(){
    var URL = document.getElementById("siteUrl").value
    if(UrlRegEx.test(URL)){
        currentURL.classList.remove("is-invalid")
        currentURL.classList.add("is-valid")
        document.getElementById("tooltipUrl").style.display = "none";
    }else{
        currentURL.classList.add("is-invalid")
        currentName.classList.remove("is-valid")
        document.getElementById("tooltipUrl").style.display = "flex";
    }
}

function submission(){
    var bookMarkInput = document.getElementById("bookmarkName");
    var URLinput = document.getElementById("siteUrl");
    var bookmarkNa = bookMarkInput.value;
    var bookmarkUR = URLinput.value;

    if(bookmarkNa.length < 3){
        errBox.style.opacity = 1;
        errBox.style.visibility = "visible";
        errBox.style.display = "flex";

    } else if(!UrlRegEx.test(bookmarkUR)){
        errBox.style.opacity = 1;
        errBox.style.visibility = "visible";
        errBox.style.display = "flex";
    } else{
        if(bookmarks.length == 0){
            bookmarks.push({
                bookMarkName: bookmarkNa,
                bookMarkURL: bookmarkUR,
            });
        } else{
            var testing = 0;
            for(var i=0; i < bookmarks.length;i++){
                if(bookmarkNa.toLowerCase() == bookmarks[i].bookMarkName.toLowerCase()){
                   testing++;
               }
            }
            if(testing == 0){
                bookmarks.push({
                    bookMarkName: bookmarkNa,
                    bookMarkURL: bookmarkUR,
                });
            } else{
                errBox.style.opacity = 1;
                errBox.style.visibility = "visible";
                errBox.style.display = "flex";
            }
        }
        
    };



    displayingBookmarks();

    window.localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

    clear();
}


function displayingBookmarks(){
    var bkMarks = ``;

    for(var i=0;i<bookmarks.length;i++){
        bkMarks += `
        <tr>
            <td>${i+1}</td>
            <td>${bookmarks[i].bookMarkName}</td>
            <td><a href="${bookmarks[i].bookMarkURL}" class="text-decoration-none text-white" target="_blank"><button class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i> Visit</button></a></td>
            <td><button onclick="deletion(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `;
    }

    products.innerHTML = bkMarks;
};

// window.localStorage.clear()

function clear(){
    document.getElementById("bookmarkName").value = "";
    document.getElementById("siteUrl").value = "";
    currentName.classList.remove("is-invalid");
    currentName.classList.remove("is-valid")
    currentURL.classList.remove("is-invalid");
    currentURL.classList.remove("is-valid")
};

function deletion(index){
    bookmarks.splice(index,1);
    displayingBookmarks();
    window.localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
};

function closeBtn(){
    errBox.style.opacity = 0;
    errBox.style.visibility = "hidden";
    errBox.style.display = "none";
};