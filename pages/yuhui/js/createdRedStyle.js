function reWriteDataSet(father,contectSet){
    let theValue = setContent(father)
    let textColorsSet = textColors(father)
    let JsData = mkJsData(theValue,textColorsSet)
    let rgbLightBlue = textColorsSet.map((b)=>{if(b["_key"]==="isLightBlue"){if(b["theTitle"]){return b["theTitle"]}  }} )
    let rgbRed = textColorsSet.map((r)=>{if(r["_key"]==="isRED"){if(r["theTitle"]){ return r["theTitle"]} }} )
    let rgbCover = textColorsSet.map((r)=>{if(r["_key"]==="isCoverBlock"){if(r["theTitle"]){ return r["theTitle"]} }} )


    rgbLightBlue = rgbLightBlue.filter((v)=>v!==void(0))
    rgbRed= rgbRed.filter((v)=>v!==void(0))
    rgbCover= rgbCover.filter((v)=>v!==void(0))
    let nearByText = textColorsSet.map((r)=>{if(r["nearByText"]!==''){ return r["nearByText"]}})
    nearByText =nearByText.filter((v)=>v!==void(0))
    let ColorText = handelRgbCover(rgbCover,rgbRed,rgbLightBlue,JsData,nearByText)

    replaceContectSet(contectSet,JsData)

    return {JsData,ColorText}
}
function replaceContectSet(contectSet,JsData){
    let contectSetSa88 = [contectSet["connect"]["official"],contectSet["connect"]["vip"],contectSet["connect"]["facebook"]]
    JsData.Sa88Links.map((titleLinks,idx)=>{
        titleLinks["link"] =`<a href="${contectSetSa88[idx]}" class='text-red'><span style="text-decoration: underline;">${contectSetSa88[idx]}</span></a>`
    })

    let contectSetLinks = [contectSet["connect"]["official"],contectSet["connect"]["vip"],contectSet["connect"]["facebook"],contectSet["connect"]["SA88COM"],contectSet["connect"]["yuhui"]]
    JsData.links.map((links,idx)=>{
        if(links.a.includes("Quy tắc và Điều khoản ưu đãi")){
            links.a=`<a href="${contectSetLinks[4]}" class='text-red'><span style="text-decoration: underline;">Quy tắc và Điều khoản ưu đãi</span></a>`
        }
        if(links.a.includes("@sa88cskh")){
            links.a=`<a href="${contectSetLinks[3]}" class='text-red'><span style="text-decoration: underline;">${contectSetLinks[3]}</span></a>`
        }
        if(links.a.includes("facebook")){
            links.a=`<a href="${contectSetLinks[2]}" class='text-red'><span style="text-decoration: underline;">${contectSetLinks[2]}</span></a>`
        }
        if(links.a.includes("sa88a")){
            links.a=`<a href="${contectSetLinks[0]}" class='text-red'><span style="text-decoration: underline;">${contectSetLinks[0]}</span></a>`
        }
        if(links.a.includes("Sa88VIP")){
            links.a=`<a href="${contectSetLinks[1]}" class='text-red'><span style="text-decoration: underline;">${contectSetLinks[1]}</span></a>`
        }
    })
    // console.log(JsData,'JsData!!!')
    JsData.blocks.map((b)=>{
        let dataString = b["stringArr"]
        if(dataString && dataString.includes("<a hr") && dataString.includes("#00ccff")){
            b["stringArr"] = `${dataString.split('với"')[0].trim()} với <span class="link-span">"</span><a href="${contectSet.connect.yuhui}"  style="color: #00ccff;">Quy tắc và Điều khoản ưu đãi</a><span class="link-span">"</span> .${dataString.split('".')[1].trim()}`
        }
        if(dataString && dataString.includes("<a hr") && dataString.includes("#0000ff")){
            b["stringArr"] = `${dataString.split("<a")[0].trim()}<a href="${contectSet.connect.SA88COM}"  style="color: #0000ff;padding:0 5px">@SA88COM</a>${dataString.split("</a>")[1].trim()}`
        }
    })
}
function setContent (Obj,jsonArr=[]) {
    for (var i=0;i<Obj.childNodes.length;i++){
        var child =Obj.childNodes[i],_text
        if(child.nodeType===3){_text=child.wholeText.trim()}else{_text=child.outerText}
        if(_text.length==0 && child.nodeName!=="BR" && child.nodeName!=="IMG"){Obj.removeChild(child)}
    }
    let children =Obj.childNodes
    for (var j=0;j<children.length;j++) {

        var theText = children[j].outerText ;
        if(children[j].nodeType===1) { theText = "["+children[j].nodeName+"]"+theText}
        if(children[j].nodeType===3) {
            theText = "["+children[j].nodeName+"]"+children[j].wholeText
        }
        if(children[j].nodeName=="TD" && children[j].parentNode.nodeName=="TR"){
            if(children[j].attributes?.rowspan) {
                const rowSpan = children[j].getAttribute("rowspan")
                theText =theText.replace("[TD]","[TD-ROWSPAN: "+rowSpan+"]")
            }
            if(children[j].attributes?.colspan) {
                const colSpan = children[j].getAttribute("colspan")
                theText =theText.replace("[TD]","[TD-COLSPAN: "+colSpan+"]")
            }
        }
        if(children[j].nodeName=="A"){
            theText= children[0].outerHTML||children[j].outerHTML;
        }
        if(children[j].nodeName=="IMG"){
            theText= "[IMG]"+children[j].outerHTML
        }
        if(children[j].nodeName=="H6" && children[j].parentNode.nodeName=="TD"){
            continue;
        }
        if(children[j].nodeName=="SPAN"){
            if(children[j].parentNode.nodeName=="P"  && j==0){
                theText = "[BR]"+theText
            }
        }
        jsonArr.push(theText)
        if(children[j].childNodes.length>0){
            setContent(children[j],jsonArr)
        }
    }
    return jsonArr
}
function mkJsData(_array,textColorsSet){
    let mainTitle=[]
    let subTitle = ''
    let textArr = []
    let linkArr =[]
    let Sa88LInks = []
    let blocks =[]
    let blockTypes =["[#text]","[TABLE]","[TR","[TD","[BR]","[IMG]"]
    let blockStartIndex = 0
    _array.forEach((item,idx)=>{
        if(item.includes("[#text]")){textArr.push(item)}

        if(!item.includes("[")){linkArr.push({a:item,idx:idx});blocks.push(item)}
        blockTypes.forEach((kinds)=>{
            if(item.includes(kinds)){
                blocks.push(item)
            }
        })

    })
    if(!textArr[2].includes("https")){
        subTitle = removeTag(textArr[2],"text")
    }
    mainTitle = [removeTag(textArr[0],"text"),removeTag(textArr[1],"text")]
    var ln = 0;
    if(linkArr.length > 0){
        while(ln<3){
            let tIdx = linkArr[ln].idx,_obj={}
            let mtitle=removeTag(_array[tIdx - 2],"text")
            if(!mtitle.includes("👉")){
                mtitle=removeTag(_array[tIdx - 3],"text")
            }
            const mlink =linkArr[ln].a.replace(/style=\"color: #00ccff;\"/,"class='text-red'")
            const mtext =_array[tIdx+1]
            _obj.title = mtitle,_obj.link = mlink,_obj.text=removeTag(mtext,"text")||removeTag(mtext,"span")
            Sa88LInks.push(_obj)
            ln++
        }
    }
    if(subTitle===Sa88LInks[0].title) {subTitle = ""}
    blocks.forEach((el,ixs)=>{ if(el.includes(Sa88LInks[Sa88LInks.length-1]["text"])){ blockStartIndex=ixs }})
    if(blocks[blockStartIndex+1]!=="[BR]"){blocks.splice(blockStartIndex+1,0,"[BR]")}
    let isNotSpan =["[TABLE]","[TR","[TD","[BR]"]
    var notSpanIndex = []
    let isTable =["[TABLE]","[TR","[TD"]
    var tableIndex =[]
    for(var b=blockStartIndex;b<blocks.length;b++){
        isNotSpan.forEach((notspan)=>{if(blocks[b].includes(notspan)){notSpanIndex.push(b)}})
        isTable.forEach((table)=>{if(blocks[b].includes(table)){tableIndex.push(b)}})
    }
    notSpanIndex.unshift(Number(blockStartIndex-1))
    notSpanIndex.push(Number(blocks.length))
    var spanArray =[]
    for(var v=0;v<notSpanIndex.length-1;v++){
        var nospanIdx = notSpanIndex[v],nextIdx = notSpanIndex[v + 1]
        if(nextIdx - nospanIdx >1) {var marr=[];for(var i=nospanIdx+1;i<nextIdx; i++){marr.push(blocks[i])};spanArray.push({startIdx: nospanIdx+1,endIdx:nextIdx-1,arr:marr})}}
    var initArr=[],tableArr =[]
    for(var t=0;t<tableIndex.length;t++){
        var tableIdx = tableIndex[t],nextIdx= tableIndex[t+1];
        if(t==0){initArr.push(tableIdx)};
        if(nextIdx - tableIdx >1 && t!==0) {initArr.push(nextIdx)}
        //判断是否为BR
        if(tableIndex[t+1] == tableIndex[t]+1 && tableIndex[t+2] == tableIndex[t]+3){
            const theOtherTagIndex = tableIndex[t+2] - 1
            blocks.map((b,thebIdx)=>
            { if(blocks[theOtherTagIndex] === "[BR]" && theOtherTagIndex==thebIdx){
                delete blocks[thebIdx]
            }})
             // console.error(blocks[theOtherTagIndex],"看你不爽，消失吧",blocks,tableIndex[t],tableIndex)
        }
    }

    for(var a=0;a<initArr.length;a++){
        if(initArr.length>1){
            var init=initArr[a],tail
            if(a+1 == initArr.length) {tail=tableIndex[tableIndex.length-1]}else{var nextInitIdx = tableIndex.findIndex((el) => { return el == initArr[a+1]});tail=tableIndex[nextInitIdx-1]}
            var tables =[]
            for(var u=init;u<tail+1;u++){
                tables.push(blocks[u])
            }
            tableArr.push({"startIdx":init,"endIdx":tail,"arr":tables })
        }else{
            var total =[]
            tableIndex.forEach((f)=>{total.push(blocks[f])})
            tableArr.push({"startIdx":tableIndex[0],"endIdx":tableIndex[tableIndex.length-1],"arr":total })
        }
    }


    if(tableArr.length>1){
        let theArrageTableArr = []
        tableArr.forEach((tab)=>{
            if(tab.arr[0].startsWith('[TABLE')){
                theArrageTableArr.push(tab)
            }else{
               let theArrTab =  theArrageTableArr[theArrageTableArr.length-1]
                theArrTab["endIdx"] = tab["endIdx"]
                theArrTab["arr"] = [...theArrTab["arr"],...tab["arr"]]
                //console.log(theArrTab,"tab.arr!!!",tab)
            }
        })
        tableArr = theArrageTableArr
    }
    let _blocks = [...spanJOSN(spanArray),...tableJSON(tableArr)].sort(sortArr)
    let facebookIdx =_blocks.findIndex((el) => { return el.stringArr.includes("facebook")})
    _blocks = _blocks.filter((f)=>f.startIdx > _blocks[facebookIdx].startIdx)
    return {"mainTitle":mainTitle,"subTitle":subTitle,"Sa88Links":Sa88LInks,"blocks":_blocks,"links":linkArr}
}
const sortArr = (a1,a2) => a1.startIdx> a2.startIdx ? 1 : -1;
function spanJOSN(arr){
    let _spanArr=[]
    arr.forEach((_domArr)=>{
        var _strAll =''
        _domArr.arr.forEach((_dom,idx)=>{
            if(!!_domArr.arr[idx+1] && !!_domArr.arr[idx] && _domArr.arr[idx+1].startsWith("[#text]")){
                let next = removeTag(_domArr.arr[idx+1],"text")
                let thenode = document.createElement("div")
                thenode.innerHTML = _domArr.arr[idx]
                if(thenode.innerText === next) {
                    _domArr.arr[idx+1]=""
                }
            }
            _strAll += removeTag(_dom,"text")
        })
        _strAll = removeTag(_strAll,"img")
        _spanArr.push({"startIdx":_domArr["startIdx"],"endIdx":_domArr["endIdx"],"stringArr":_strAll.trim()})
    })
    return _spanArr
}
function tableJSON(arr){
    let _tableArr =[]
    arr.forEach((_domArr)=>{
        var _strAll =''
        _domArr.arr.forEach((_dom)=>{
            if(_dom.startsWith("[TABLE]")){_dom="table"}
            _strAll += _dom
        })
        var tdArr = _strAll.split("[TR]").filter((c)=>c!=="table")
        let _head=[]
        let htd = tdArr[0].split("[TD]")
        if(htd.length >1) {htd.shift()}
        for(var t=0; t<htd.length; t++){
            let td = htd[t].split("TD")
            let tdDataArr =ColSpanAndRowSpan(td)
            if(tdDataArr.length===1) {
                tdDataArr=tdDataArr[0]
                _head.push(tdDataArr)
            }else{
                _head.push(tdDataArr[1])
            }
        }
        var _body =[]
        for(var tr=0; tr<tdArr.length; tr++){
            let td = tdArr[tr].split("TD")
            td.shift()
            let tdDataArr =ColSpanAndRowSpan(td)
            _body.push(tdDataArr)
        }
        _body.shift()
        _tableArr.push({"startIdx":_domArr["startIdx"],"endIdx":_domArr["endIdx"],"table":[{"head":_head,"body":_body}]})
    })
    return _tableArr
}
function ColSpanAndRowSpan(td) {
    let tdDataArr=[]
    var _td =[]
    td.map((st)=>{_td.push(st.replace(/\n+/g,''))})
    td.length=0
    td=_td
    for (var myvalue=0; myvalue<td.length; myvalue++) {
        let _myvalue=td[myvalue]
        if(td[myvalue].indexOf("-ROWSPAN:") >-1 || td[myvalue].indexOf("-COLSPAN:") >-1 ) {
            var tranSpan
            if(td[myvalue].indexOf("-ROWSPAN:") >-1){
                tranSpan = Number(td[myvalue].split("-ROWSPAN:")[1].split("]")[0])
            }
            let value = removeTag(td[myvalue].split("]")[1])
            _myvalue = {"rowspan":tranSpan,value}
            if(td[myvalue].indexOf("-COLSPAN:") >-1){
                tranSpan = Number(td[myvalue].split("-COLSPAN:")[1].split("]")[0])
                _myvalue = {"colspan":tranSpan,value}
            }
        }
        if(typeof (_myvalue) === "string") {
            _myvalue = removeTag(_myvalue)
        }
        tdDataArr.push(_myvalue)
    }
    return tdDataArr
}
function removeTag(_string,type='') {
    if(type=="text"){
        return _string.replace("[#text]",'')
    } else if(type=="img"){
        return _string.replace("[IMG]",'')
    }else if(type=="span"){
        return _string.replace("[SPAN]",'')
    }else{
        var _a = _string.replace("[",'')
        _a =_a.replace("]",'')
        return _a
    }
}
function textColors (Obj,colorArr=[]){
    for (var i=0;i<Obj.childNodes.length;i++){
        let _styles = window.getComputedStyle(Obj, null)
        let _stylesColor =_styles.color
        let colors={"rgb(255, 0, 0)":"isRED","rgb(0, 204, 255)":"isLightBlue","rgb(51, 51, 51)":"isCoverBlock","rgb(0, 0, 0)":"isCoverBlock"}
        let notToTransColor = ["SA88","CƯỢC GIẢI TRÍ, KIẾM TIỀN TỶ","https://www.Sa88.com/","https://t.me/Sa88VIP","https://www.facebook.com/Sa88pro/","Quy tắc và Điều khoản ưu đãi"]
        let nearByText=''
        if(colors[_stylesColor]){
            let theText = Obj.outerText || Obj.wholeText
            if(colors[_stylesColor] =="isRED" || colors[_stylesColor] =="isLightBlue" ){
                let preText = Obj.parentNode.parentNode.innerText.split(theText)[0]
                if(preText.length === 0){preText =Obj.parentNode.parentNode.innerText.split(theText)[1]}

                nearByText = preText.substring(preText.length-5,preText.length)
                if(preText.includes("Mã Khuyến Mãi")){nearByText="Mã Khuyến Mãi"}
                if(theText.includes("Lưu ý")){nearByText="Lưu ý"}
                if(theText.includes("Nhật ký nhiệm vụ tiếp theoclick vào Mỗi kỳ")){nearByText="Nhật ký nhiệm vụ tiếp theoclick vào Mỗi kỳ"}
                if(theText.includes("Nhận Thưởng Ngay")){nearByText="Nhận Thưởng Ngay"}
                if(theText.includes("Thư ngỏ:")){nearByText="Thư ngỏ:"}
                nearByText = nearByText.trim()
                nearByText = nearByText.replace(/\n/,"")
            }
            theText = theText.trim()
            theText = theText.replace(/\"/,"")
            theText = theText.replace(/\n/,"")
            colorArr.map((c,idx)=>{
                if(c.theTitle === theText){ colorArr.splice(idx,1) }
            })
            let yext = "["+Obj.nodeName+"]"+theText
            let shouldToColor = notToTransColor.filter((notColer)=>{if(notColer===theText){return theText}}).length === 0
            if(shouldToColor) {
                colorArr.push({ _key:colors[_stylesColor],"text": yext, "nodeName": Obj.nodeName, "theTitle": theText, "nearByText":nearByText})
            }

        }
        var child =Obj.childNodes[i],_text
        if(child.nodeType===3){_text=child.wholeText.trim()}else{_text=child.outerText}
        if(_text.length==0 && child.nodeName!=="BR" && child.nodeName!=="IMG"){Obj.removeChild(child)}
    }
    let children =Obj.childNodes
    for (var j=0;j<children.length;j++) {
        if(children[j].nodeName=="A" || children[j].nodeName=="BR"){
            continue;
        }
        if(children[j].childNodes.length>0){
            textColors(children[j],colorArr)
        }
    }
    return colorArr



}
function handelRgbCover(cover,blue,red,data,nearByText){
    let subTitle = data.subTitle
    let arr=[]
    cover.forEach((c=>{blue.forEach((n)=>{if(n.includes(c)){arr.push(c)}})}))
    cover.forEach((c=>{red.forEach((n)=>{if(n.includes(c) && n!==subTitle){arr.push(c)}})}))
    const filterCover=(barr,arr)=>{
        barr.forEach((b,index)=>{
            var theb = b;
            var uu,thebb,removeIDX;
            arr.forEach((c)=>{
                if(b.includes(c)){removeIDX=index;thebb = theb.split(arr[0])[0];uu = theb.split(arr[0])[1];if(uu.includes(c)){uu = uu.replace(c,"")}}
            })
            if(thebb!==void(0) && uu!==void(0) && removeIDX!==void(0) ){
                uu=uu.trim();thebb=thebb.trim()
                barr.splice(removeIDX,1);barr.unshift(uu);barr.unshift(thebb)
            }
        })
        return barr
    }
    blue = filterCover(blue,arr)
    red = filterCover(red,arr)
    return {"rgbLightBlue":blue,"rgbRed":red,"colorNearBy":nearByText}
}