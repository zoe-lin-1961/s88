console.log("isPreLoad!!!!")
console.log($,"prevObject")

function preload(){
    let preload = document.createElement("div")
    // preload.setAttribute("style","background:pink;z-index:9999!important;position:absolute;top:0;height:100vh;width:100vw")
    // console.log(preload,"preload")
    console.log(HTMLCollection.namedItem("body"),"document.getElementsByTagName(\"body\")")
     document.getElementsByTagName("body")[0].append(preload)
    // preload.setAttribute("id","preload")
    // document.getElementsByTagName("body")[0].before(preload)
    // const xhr = new XMLHttpRequest();
    let thePath = window.location.href.replace(window.location.pathname,"/pages/preLoad/index.html")
    xhr.open("GET", thePath, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            preload.innerHTML = xhr.responseText
            // ispreload=true
        }
    }
}
preload()