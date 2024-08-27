console.log("isPreLoad!!!!")
function preload(){
    let preload = document.createElement("div")
    preload.setAttribute("id","preload")
    document.getElementsByTagName("header")[0].after(preload)
    const xhr = new XMLHttpRequest();
    let thePath = window.location.href.replace(window.location.pathname,"/pages/preLoad/index.html")
    xhr.open("GET", thePath, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            preload.innerHTML = xhr.responseText
            ispreload=true
        }
    }
}