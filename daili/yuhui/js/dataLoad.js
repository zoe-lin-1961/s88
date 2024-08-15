function getAjexJsonData(type="get",url="",) {
    return new Promise((resolve,reject) =>{
        $.ajax({
            type,url,dataType:"json",
            success:function(data) {resolve(data)},
            error:function(XMLHttpRequest, textStatus, errorThrown) {reject({"XMLHttpRequest":XMLHttpRequest,"textStatus":textStatus,"errorThrown":errorThrown})}
        });
    })
}

function loadreWriteDataFromWeb(JsData,textColorsSet,id) {
    $("#main-containerReloadCreated").empty()

    let title = mkDOM("p",[{"class":"text-center text-red"}]),titleSpan= mkDOM("span"),strontitle=mkDOM("strong",[{"innerHTML":JsData.mainTitle[0]}]),titleSpan1= mkDOM("span"),strontitle1=mkDOM("strong",[{"innerHTML":JsData.mainTitle[1]}]),BR=mkDOM("br"),subTitle = mkDOM("h5",[{"class":"text-center text-red"}]),subtitleSpan=mkDOM("span",[{"innerHTML":JsData.subTitle}])
    titleSpan.append(strontitle);title.append(titleSpan);title.append(BR);titleSpan1.append(strontitle1);title.append(titleSpan1)
    subTitle.append(subtitleSpan)
    let link = mkDOM("h5"),link1 = mkDOM("span",[{"innerHTML":JsData.Sa88Links[0].title + JsData.Sa88Links[0].link},{"class":"inline-full"}]),link2 = mkDOM("span",[{"innerHTML":JsData.Sa88Links[1].title + JsData.Sa88Links[1].link},{"class":"inline-full"}]),link3 = mkDOM("span",[{"innerHTML":JsData.Sa88Links[2].title + JsData.Sa88Links[2].link},{"class":"inline-full"}])
    link.append(link1,link2,link3)
    $("#main-containerReloadCreated").append(title,subTitle,link)

    let linksName = []
    let LINKS = JsData.links
    LINKS.forEach((linn)=>{
        var LI =mkDOM("div",[{"innerHTML":linn.a}])
        if(linksName.filter((lid)=>lid===LI.innerText.trim()).length==0){linksName.push(LI.innerText.trim())}
    })
    let blueTextArr =textColorsSet.rgbLightBlue,redTextArr =textColorsSet.rgbRed,cover = textColorsSet.colorCover
    let BLOCKS = JsData.blocks
    let colorNearBy = textColorsSet.colorNearBy

    BLOCKS.forEach((block,sr)=>{
        let blockArea = mkDOM("div",[{"class":"block-area"}])
        if(!block.table){
            var string,STRING=block.stringArr
            let hasRgbLightBlue =blueTextArr.filter((isblue)=> STRING.includes(isblue)).length || blueTextArr.length
            let hasRgbRed = redTextArr.filter((isred)=> STRING.includes(isred)).length || redTextArr.length
            let isDetailText = STRING.substring(0,1)==='-' || STRING.substring(0,1)==='+' || STRING.substring(0,1)==='*'
            let isHanaStyle = STRING.substring(0,1)==='※'
            let numberReg = new RegExp("^[0-9 | a-z]*$")
            let isNumberList = numberReg.test(STRING.substring(0,1))
            let detailTextClass = isDetailText?" detail-text ":""
            let hanaStyleClass = isHanaStyle?" hana-style ":""
            let numberListClass = isNumberList?" number-bolck-style ":""
            if(isDetailText || isHanaStyle){
                let initMark = STRING.substring(0,1)
                STRING = initMark+' '+STRING.split(initMark)[1].trim()
            }
            string = mkDOM('span',[{"class":"inline-full"+detailTextClass+hanaStyleClass+numberListClass},{"innerHTML":STRING}])
            let HasNearByText = colorNearBy.filter((c)=>STRING.includes(c)).length
            if(!!hasRgbRed) {
                let titleContents=["👉","KHUYẾN MÃI IV:","KHUYẾN MÃI III:","KHUYẾN MÃI II:","KHUYẾN MÃI I:"]
                let isTitle = titleContents.filter((c)=>STRING.indexOf(c) > -1).length
                redTextArr.forEach((r)=>{
                    var colorClass = "text-red";
                    if(STRING.indexOf(r) > -1 && r!==STRING && !!HasNearByText){
                        let carr =redTextArr.filter((b)=>{if(STRING.indexOf(b)>-1){ return b }})
                        string = mkDOM('span',[{"class":"inline-full"+detailTextClass+hanaStyleClass+numberListClass}])
                        if(!!isTitle) {
                            string = mkDOM('span',[{"class":"inline-full block-title"}])
                        }
                        let replaceString =[]
                        carr.forEach((c,idx)=>{
                            if(idx===0){replaceString = STRING.split(c)}
                            if(idx>0){
                                let preReplaceStringIndex = replaceString.length
                                replaceString.forEach((repa)=>{ replaceString.push(repa.split(c)[0],repa.split(c)[1])})
                                replaceString.splice(0,preReplaceStringIndex)
                            }
                        })
                        replaceString = replaceString.filter((re)=>re!==void(0))
                        replaceString.forEach((replaceStr,idx)=>{
                            var stringA = mkDOM('span',[{"innerHTML":replaceStr}])
                            if(idx<replaceString.length){
                                var cdom = mkDOM("span",[{"innerHTML":carr[idx]},{"class":colorClass}])
                            }
                            string.append(stringA,cdom)
                        })
                    }
                    if(r===STRING) {
                        string = mkDOM("span",[{"class":"inline-full text-red"+detailTextClass+hanaStyleClass+numberListClass},{"innerHTML":r}])
                        if(!!isTitle) {
                            string = mkDOM("span",[{"class":"text-red block-title"},{"innerHTML":r}])
                        }
                    }
                })
            }
            if(!!hasRgbLightBlue){
                let titleContents=["👉","KHUYẾN MÃI IV:","KHUYẾN MÃI III:","KHUYẾN MÃI II:","KHUYẾN MÃI I:"]
                let isTitle = titleContents.filter((c)=>STRING.indexOf(c) > -1).length
                blueTextArr.forEach((c)=>{
                     if(STRING.indexOf(c) > -1  && STRING.indexOf(c+"</a>") < 0 ){
                         let carr =blueTextArr.filter((b)=>{if(STRING.indexOf(b)>-1){ return b }})
                         let colorClass = "text-red"
                         var allowMkColorDom = false
                         if(!isTitle){colorClass= "text-red";allowMkColorDom=true}
                         if(!!isTitle && !!HasNearByText) {allowMkColorDom=true}
                         if(!!allowMkColorDom){
                             string = mkDOM('span',[{"class":"inline-full"+detailTextClass+hanaStyleClass+numberListClass}])
                             if(!!isTitle) {
                                 string = mkDOM('span',[{"class":"inline-full block-title"}])
                             }
                             let replaceString =[]
                             carr.forEach((c,idx)=>{
                                 if(idx===0){replaceString = STRING.split(c)}
                                 if(idx>0){
                                     let preReplaceStringIndex = replaceString.length
                                     replaceString.forEach((repa)=>{ replaceString.push(repa.split(c)[0],repa.split(c)[1])})
                                     replaceString.splice(0,preReplaceStringIndex)
                                 }
                             })
                             replaceString = replaceString.filter((re)=>re!==void(0))
                             replaceString.forEach((replaceStr,idx)=>{
                                 var stringA = mkDOM('span',[{"innerHTML":replaceStr}])
                                 if(idx<replaceString.length){
                                     var cdom = mkDOM("span",[{"innerHTML":carr[idx]},{"class":colorClass}])
                                 }
                                 string.append(stringA,cdom)
                             })
                         }
                    }
                    if(c===STRING) {
                        string = mkDOM("span",[{"class":"inline-full text-red"+detailTextClass+hanaStyleClass+numberListClass},{"innerHTML":c}])
                        if(!!isTitle) {
                            string = mkDOM("span",[{"class":"text-red block-title"},{"innerHTML":c}])
                        }
                    }

                })
            }
            blockArea.append(string)
        }else{
            var tbody = mkDOM("tbody"),table = mkDOM('table',[{"style":"width:100%"}])
            let head =block.table[0].head,body=block.table[0].body
            let totalTable = [head,...body]
            let toGetMaxCountOfTd =totalTable.map((u)=>u.length)
            let hendLength = Math.max(...toGetMaxCountOfTd)
            totalTable.forEach((btr)=>{
                var tbTr=mkDOM("tr")
                btr.forEach((btd)=>{
                    let btdHtmlc = typeof (btd)=="string"?btd:btd.value
                    let tbTd=mkDOM("td",[{"innerHTML": btdHtmlc},{"style":"width:calc((1 / "+hendLength+" )*100%)"}])
                    if(btd.rowspan || btd.colspan){
                        var tranSpan ={"rowspan":btd.rowspan}
                        if(btd.colspan){
                            tranSpan ={"colspan":btd.colspan}
                        }
                        tbTd=mkDOM("td",[{"innerHTML": btdHtmlc},tranSpan,{"style":"width:calc((1 / "+hendLength+" )*100%)"}])
                    }
                    tbTr.append(tbTd)
                })
                tbody.append(tbTr)
            })

            table.append(tbody)
            blockArea.append(table)

        }
        $("#main-containerReloadCreated").append(blockArea)
        let _reload = document.getElementById("main-containerReloadCreated")
        resetTableColor(_reload)
    })
    return {id:id,innerHTML:$("#main-containerReloadCreated")[0].innerHTML}
}

const mkDOM = (__DOM,__ATTRIBUTE)=>{
    let theDOM = document.createElement(__DOM);
    if(__ATTRIBUTE && !!__ATTRIBUTE) {
        __ATTRIBUTE.forEach((att)=>{
            if(Object.keys(att)[0]=='innerHtml' || Object.keys(att)[0]=='innerHTML') {
                theDOM.innerHTML = Object.values(att)
            }else{
                theDOM.setAttribute(Object.keys(att)[0],Object.values(att))
            }
        })
    }
    return theDOM;
}

const getCOOKIE = (name)=>{
    let allCOOKIE = document.cookie.split("; ")
    let cookieItem  =allCOOKIE.filter((item)=> name===item.split("=")[0])[0]
    //return decodeURIComponent(cookieItem.split("=")[1])
    if(cookieItem.split("=")[1] === 'false'){
        return false
    }
    if(cookieItem.split("=")[1] === 'true'){
        return true
    }else {
        return cookieItem.split("=")[1]
    }

}

const addCOOKIE = (name,value,expires)=>{
    document.cookie = name+"="+value
   if(expires){
       document.cookie = name+"="+value+";expires="+expires
   }
}
const setCOOKIE = (name,value)=>{
    document.cookie = name+"="+value
}
const clearCOOKIE = (name)=>{
    document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function resetWidth(){
    if(document.getElementsByTagName('body')[0].clientWidth < 779.9999){
        let ct =document.getElementsByClassName('category-item')
        let toW = 0
        for(let el in ct){var w =ct[el].offsetWidth || 0;toW += w}
        toW = toW+15
        $(".cateBox").find("ul").width(toW)
    }else{
        $(".cateBox").find("ul").width("")
    }

}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function resetTableColor(dom){
    let tables = dom.getElementsByTagName("table")
    for (let idx in tables){
        let table = tables[idx]
        if(typeof (table) === 'object'){
            let tds = table.getElementsByTagName("td")
            var bluetd=[]
            for (let idex in tds){
                if(typeof (tds[idex]) === 'object'){
                    if(tds[idex].innerText === 'Chuẩn bị phát'){
                        tds[idex].classList.add('blue-td')
                        bluetd.push(tds[idex])
                    }
                }
            }
            if(bluetd.length>0){
                let trs = table.getElementsByTagName("tr")
                let firstTds = trs[0].getElementsByTagName("td")
                for(let iddx in firstTds){
                    if(typeof (firstTds[iddx]) === 'object'){
                        firstTds[iddx].classList.add('blue-td')
                    }
                }
                for(let idxx in trs){
                    if(typeof(trs[idxx]) === 'object'){
                        let trtds = trs[idxx].getElementsByTagName("td")
                        let blue_trtds=[]
                        for(let jdx in  trtds){
                            if(trtds[jdx].classList!==void(0)){
                                if(trtds[jdx].classList.value.includes("blue-td")){
                                    blue_trtds.push(trtds[jdx])
                                }
                            }
                        }
                        if(blue_trtds.length === trtds.length-1) {
                            trtds[0].classList.add('blue-td')
                        }
                    }
                }
            }
        }
    }
}

// 关闭视窗就清掉"UsePreLoadPromo" cookie
window.onbeforeunload = function (e) {
    clearCOOKIE("UsePreLoadPromo")
};
