$(document).ready(function () {
    var mybutton = document.getElementById("myBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document

    mediaLoaded("ready")

})
function mediaLoaded(funcName){
    let IMG= $("img"),VIDEO=$("video");
    let total =[]
    let loaded =[]
    let hasUnLoad = []
    for (const imgKey in IMG) {
        if(typeof (IMG[imgKey]) == "object" && IMG[imgKey].nodeName=="IMG"){
            total.push(IMG[imgKey])
        }
    }
    for (const videoKey in VIDEO) {
        if(typeof (VIDEO[videoKey]) == "object" && VIDEO[videoKey].nodeName=="VIDEO"){
            total.push(VIDEO[videoKey])
        }
    }
    for (const totalKey in total) {
        if(total[totalKey].nodeName=="IMG") {
            if(total[totalKey].complete) {
                loaded.push(total[totalKey])
            }else{
                hasUnLoad.push(total[totalKey])
            }
        }
        if(total[totalKey].nodeName=="VIDEO"){
            if(total[totalKey].readyState === 4) {
                loaded.push(total[totalKey])
            }
        }
    }
    console.log(total,"total",hasUnLoad,funcName)
    if(hasUnLoad.length>0){
        hasUnLoad.map((unloadImg,index) =>{
            unloadImg.onload = function (){
                loaded.push(unloadImg);
                console.log(unloadImg)
                hasUnLoad = hasUnLoad.filter((v)=>v.currentSrc!==unloadImg.currentSrc)
                if(hasUnLoad.length == 0){
                    console.log("加载完成")
                    $("#lodingMask").hide()
                }
            }
        })
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    // 左侧抽屉菜单，画面中间的跳转
    function getHome(){
        $.ajax({type:"get",url: "src/jsonData/home.json",dataType:"json",
            success:function(data) {handalLoadDataOnPage(data)}, error:function(XMLHttpRequest, textStatus, errorThrown) { console.log('XMLHttpRequest, textStatus, errorThrown',XMLHttpRequest, textStatus, errorThrown)}
        });
    }
    getHome();
    function handalLoadDataOnPage(_jsonData) {
        let boxMenuItems = _jsonData[0]['menu'][0]['pc'];
        let layer2MenuItems = _jsonData[0]['menu'][0]['layer2'];
        // console.log(_jsonData,"_jsonData")
        if($(".section-header>.container>.box-header>.menu >li").length == 0){ loadBoxMenuItems(boxMenuItems["items"])}
        if($(".section-header-layer2>.container>.box-header>.menu >li").length == 0){ loadBoxMenuLyer2(layer2MenuItems,boxMenuItems["items"],_jsonData[3]["pcMenuArticle"])}
        if($(".swiper-wrapper>.swiper-slide").length == 0) {loadSwiper(_jsonData[1]["banner"])}
        loadArticals(_jsonData[3]["pcMenuArticle"],boxMenuItems["items"])
        if($("#section-sa88")[0].innerText.length == 0) { loadSection(_jsonData[6]["introSA88"])}
        if($(".section-world-cup .container-original").length <1){loadMainPageArticle(_jsonData[5]['dailiArticle'])}
        if($(".box-link-contact>ul>li").length == 0) {
            loadContact(_jsonData[7]['connection'])
        }
        loadFotterPic()
    }
    function loadBoxMenuItems (menuItems){
        menuItems.forEach((item)=>{
            var _a = mkDOM("a",[{"href":item.href},{"class":"menu-link"}])

            if(item.href.includes(".com")){
                _a = mkDOM("a",[{"href":item.href},{"class":"menu-link"},{"target":"_blank"}])
            }

            if(item.href.includes("[main]")){
                let yuhuiURL = item.href.split("[main]")[1];
                console.log(window.location.href,"window.location.href")
                let theURL = window.location.href.replace("/daili/","/yuhui/")
                _a = mkDOM("a",[{"href":theURL},{"class":"menu-link"}])
            }
            var _span =mkDOM ("span",[{"innerHTML":item.title}])
            var _img =mkDOM ("img",[{"src":item.icon}])
            var hoverImg = item.icon.replace("-white","-hover")
            var _imgHover =mkDOM ("img",[{"src":hoverImg},{"class":"hoverIcon"}])
            _a.append(_img,_imgHover,_span)
            var _li = mkDOM("li",[{"class":"menu-item"}])
            _li.append(_a)
            $(".menu")[0].append(_li)
        })
    }
    function loadBoxMenuLyer2 (menuItems,boxMenuItems,pcMenuArticals){
        let layer2 =menuItems.filter((m)=>{return !boxMenuItems.some((u)=>u.href === m.href)})
        layer2.forEach((item)=>{
            var _a = mkDOM("a",[{"href":item.href},{"class":"menu-link"},{"innerHTML":item.title}])
            if(item.href.includes(".com")){
                _a = mkDOM("a",[{"href":item.href},{"class":"menu-link"},{"innerHTML":item.title},{"target":"_blank"}])
            }
            var _li = mkDOM("li",[{"class":"menu-item"}])
            _li.append(_a)
            $(".menu")[1].append(_li)
        })
        $(".section-header-layer2 .menu-link").click(function (e) {
            //e.preventDefault()
            let id = e.currentTarget.hash.split("#")[1]
            var mask = $('.shadow-box')[0];
            var modal = $('.modal')[0];
            if(id && !!id){
                mask.classList.remove('hide-shadow-box');
                modal.classList.remove('hide-modal');
                let pcMenuArtical = pcMenuArticals.filter((p)=>p.id===id)[0]
                $("#main-container").empty()
                let article = mkDOM("div",[{"innerHTML":pcMenuArtical["article"]},{"class":"box-world-cup"}])
                let title = mkDOM("div",[{"innerHTML":pcMenuArtical["title"]},{"class":"title-model"}])
                $("#main-container").append(title,article)
            }
            mask.addEventListener('click',function(e){
                if(e.target.className=='shadow-box' || e.target.className=='close-model') {
                    mask.classList.add('hide-shadow-box');
                    modal.classList.add('hide-modal');
                    window.location.hash=""
                }
            })
        })
    }
    function loadSwiper (bannerItems) {
        bannerItems.forEach((item)=>{
            let _img = mkDOM("img",[{"src":"src/images/"+item}])
            let _div = mkDOM("div",[{"class":"swiper-slide"}])
            _div.append(_img)
            $(".swiper-wrapper")[0].append(_div)
        })
        if($(".swiper-wrapper")[0].children.length > 0) {
            mediaLoaded("loadSwiperImgs")
        }
        if($(".swiper-wrapper>.swiper-slide").length > 0){
            playSwiper()
        }
    }
    const playSwiper = () =>{
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 6000,
            },

        });
        swiper.updateSize()
    }
    function loadSection(sectionString){
        $("#section-sa88")[0].innerText=sectionString
    }
    function loadArticals(articalItems,mainItems){
        let articalArray=[]
        articalItems =  articalItems.filter((a)=>{ if(mainItems.some((m)=> m.href.split("#")[1] == a.id)){return a}})
        articalItems.forEach((item)=>{
            articalArray.push(mkArtical(item.style,item))
        })
        articalArray = articalArray.reverse()
        if(articalArray.length>0){
            articalArray.forEach((articalItem)=>{
                $(".section-video").after(articalItem)
            })
            $(".accordion").click((e)=>{
                e.currentTarget.classList.toggle("active");
                var panel = e.currentTarget.nextElementSibling;
                if (panel.style.display === "block") {panel.style.display = "none"; } else {panel.style.display = "block";}
            })
        }
        mediaLoaded("loadArticals")
    }
    function mkArtical(styleType,articalItem){
        if(styleType==="section-benefit"){
            return mkBenefit(articalItem)
        }
        if(styleType==="section-earn-bilions"){
            return mkEarnBilions(articalItem)
        }
        if(styleType==="section-world-cup"){
            return mkWorldCup(articalItem)
        }
    }
    const mkBenefit = (articalItem) => {
        let detailartical = articalItem["detailartical"]
        let thebox = mkDOM("div",[{"class":"section-benefit"},{"id":articalItem["id"]}])
        let outbox = mkDOM("div",[{"class":"container"}])
        let _title = mkDOM("h3",[{"class":"title-benefit"},{"innerHTML":articalItem["title"]}])
        let boxBenefit = mkDOM("div",[{"class":"box-benefit"}])
        detailartical.forEach((item)=>{
            let _itemBenefit = mkDOM("div",[{"class":"item-benefit"}]),_headTitle = mkDOM("div",[{"class":"head-title"}])
            let img=mkDOM("div",[{"class":"img-icon "+item.iconDIv}]), _headIcon = mkDOM("i",[{"class":"bi "+item.icon}])
            let _headtitle = mkDOM("span",[{"innerHTML":item.title}])
            img.append(_headIcon)
            _headTitle.append(img,_headtitle)
            let _content = mkDOM("content",[{"class":"content"}]),p = mkDOM("p",[{"innerHTML":item.content}])
            _content.append(p)
            _itemBenefit.append(_headTitle,_content)
            boxBenefit.append(_itemBenefit)
        })
        outbox.append(_title,boxBenefit)
        thebox.append(outbox)
        return thebox
    }
    const mkEarnBilions = (articalItem) => {
        var dom = mkDOM("div",[{"innerHTML":articalItem["article"]}])
        var nodeP =dom.getElementsByTagName("p")
        var itemArray =[]
        for (var i=0;i<nodeP.length;i++){
            if(nodeP[i].className){var title=nodeP[i].innerText,arr=[];itemArray.push({title,arr})}
            if(!nodeP[i].className){itemArray[itemArray.length-1]["arr"].push(nodeP[i].outerHTML)}
        }
        let thebox = mkDOM("div",[{"class":"section-earn-bilions"},{"id":articalItem["id"]}])
        let contenier = mkDOM("div",[{"class":"container"}])
        let title1 = mkDOM("h3",[{"class":"title-earn-bilions"},{"innerHTML":articalItem["title"]}])
        let accodingBox = mkDOM("div",[{"class":"box-earn-bilions"}])
        itemArray.forEach((item)=>{
            let accoding = mkDOM("button",[{"class":"accordion"}])
            let accodingTitle = mkDOM("p",[{"class":"title"},{"innerHTML":item.title}])
            let arrow = mkDOM("div",[{"class":"img-icon icon-arrow"}]),arrow_img = mkDOM("img",[{"src":"src/images/icon-arrow.png"}])
            arrow.append(arrow_img);accoding.append(accodingTitle,arrow)
            let panel = mkDOM("div",[{"class":"panel"}])
            var pannelInnerHTML =''
            item.arr.forEach((thep)=> {
                pannelInnerHTML += thep
            })
            panel.innerHTML = pannelInnerHTML
            accodingBox.append(accoding,panel)
        })
        contenier.append(title1,accodingBox)
        thebox.append(contenier)
        return thebox
    }
    const mkWorldCup = (articalItem) => {
        let sectioonWorldCup = mkDOM('div',[{"class":"section-world-cup"},{"id":articalItem["id"]}])
        let container = mkDOM('div',[{"class":"container"}])
        let boxWorldCup = mkDOM('div',[{"class":"box-world-cup"}])
        let title = mkDOM('p',[{"class":"title-letter"},{"innerHTML":articalItem["title"]}])
        let br1 = mkDOM('br')
        let article = articalItem["article"]
        article = article.replace("table-bordered",'')
        let divContent = mkDOM('div',[{"innerHTML":article}])
        boxWorldCup.append(title,br1,divContent)
        container.append(boxWorldCup)
        sectioonWorldCup.append(container)
        return sectioonWorldCup
    }
    function loadMainPageArticle(articles) {
        for(let i=0;i<articles.length;i++){
            var contaniner = mkArticleContaniner(articles[i])
            let div = mkDOM("div",[{"class":"section-world-cup"}])
            div.append(contaniner)
            $(".section-contact")[0].before(div)
        }
        mediaLoaded("loadMainPageArticle")
    }
    const mkArticleContaniner = (_datas)=>{
        let _con = mkDOM("div",[{class:"container container-original"}]);
        let _div = mkDOM("div",[{class:"box-world-cup"}]);
        let _topic = mkDOM("p",[{class:"title-letter"},{innerHTML:_datas["topic"]}]);
        _topic.innerHTML=_datas["topic"]
        _div.append(_topic)
        _datas["description"].forEach((_s,index)=>{
            var _description = mkDOM("p",[{innerHtml:_s}]);
            _div.append(_description)
        })
        _datas["parts"].forEach((parts)=>{
            let title =mkTitle(parts.title);
            let descript=parts.description?mkDescript(parts["description"]):[];
            let table=parts.table?mkTable(parts["table"]):[];
            let notice=parts.notice?mkDescript(parts["notice"]):[];
            let partsArr=[title,...descript,table,...notice];
            _div.append(...partsArr);
        })
        _con.append(_div)
        return _con
    }
    const mkTable = (_table)=>{
        let _mt = mkDOM("table",[{class:"table"}]);
        let _tb = mkDOM("tbody");
        let _tr0 = mkDOM("tr")
        _table["head"].forEach((_str)=>{
            let _th = mkDOM("th",[{innerHTML:_str}])
            _tr0.append(_th)
        })
        _tb.append(_tr0);
        _table["body"].forEach((_strARR)=>{
            let tr = mkDOM("tr");
            _strARR.forEach((_str)=>{
                var td=mkDOM("td",[{innerHTML:_str}])
                if(typeof _str!=='string'){
                    let _srowspan = _str['rowspan'],_scolspan =_str['colspan'];
                    if(_srowspan) {td = mkDOM("td",[{rowspan:_str['rowspan']},{innerHTML:_str['value']}])}
                    if(_scolspan){td = mkDOM("td",[{colspan:_str['colspan']},{innerHTML:_str['value']}])}
                }
                tr.append(td)
            })
            _tb.append(tr)
        })
        _mt.append(_tb)
        return _mt;
    }
    const mkDescript =(_descript,arr=[])=>{
        _descript.forEach((_str)=>{
            var _p =mkDOM("p",[{innerHTML:_str}])
            arr.push(_p)
        })
        return arr
    }
    const mkTitle =(_title)=>{
        return mkDOM("p",[{class:"title-head"},{innerHTML:_title}])
    }
    function loadContact (contacts){
        let kindsIcons ={"e-mail":"src/images/icon-mail.png","telegram":"src/images/icon-tele.png","youtube":"src/images/icon-yt.png","fb":"src/images/icon-fb.png","tiktok":"src/images/icon-tiktok.png"}
        contacts.forEach((_items)=> {
            let _li = mkDOM("li"),_a,_title,_divTitle,_divA,_linksArr=[],_liLinks,_div = mkDOM("div", [{class:"img-icon-contact"}]), _img = mkDOM("img",[{src:kindsIcons[_items.kinds]}])
            if(!_items.links){
                _a=mkDOM("a",[{href:_items.href},{innerHTML:_items.href}])
                _title=mkDOM("a",[{innerHTML:_items.title},{style:"margin:0 5px 0 0;width: auto"}])
                _div.append(_img);
                _li.append(_div,_title,_a);
                $(".box-link-contact ul").append(_li)
            } else {
                _divTitle=mkDOM("a",[{innerHTML:_items.title},{style:"margin:0 5px 0 0;width: auto"}])
                _divA = mkDOM("a",[{innerHTML:_items.href},{href:_items.href}])
                _items.links.forEach((_links)=>{
                    _liLinks=mkDOM("li")
                    _title=mkDOM("a",[{innerHTML:_links.title},{style:"margin:0 5px 0 30px;width: auto"}])
                    _a=mkDOM("a",[{href:_links.href},{innerHTML:_links.href}])
                    _liLinks.append(_div,_title,_a)
                    _linksArr.push(_liLinks)
                })
                _div.append(_img);
                _li.append(_div,_divTitle,_divA);
                $(".box-link-contact ul").append(_li)
                $(".box-link-contact ul").append(..._linksArr)
            }
        })
    }
    function loadFotterPic () {
        let picUrl = "src/images/sa88fotter.webp"
        $("#sa88-footer-img")[0].setAttribute("src",picUrl)
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
})