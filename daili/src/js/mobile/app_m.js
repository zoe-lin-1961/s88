$(document).ready(function () {
    $(".btn-menu").click(()=>{
        $(".section-menu").css("display", "block");
        $("#myBtnMobile").css("display","none");
        $(".icon-tele").css("display","none");
    })
    $(".blur").click(function (){
        if($(this)[0].id !== "box-menu" && $(this).parents("#box-menu").length=== 0 ) {
           $(".section-menu").css("display", "none");
        }
    })
  $(".btn-close").click(()=>{
      $(".icon-tele").css("display","block");$("#myBtnMobile").css("display","none");window.location.hash="";
      reloadAccordingList();
  })
  $(".icon-back").click(function (){ $(".section-menu").css("display", "none")});

  //===========================
  $(document).ready(function ($) {
    var redirect_url = window.location.hash;
    if (redirect_url === "#signup") {
      $("#modalRegistration").modal("show");
      $("#registrationModalLabel").html("THÔNG TIN ĐĂNG KÝ");
    }

    if (redirect_url === "#signin") {
      $("#modalLogin").modal("show");
      $("#modalLoginModalLabel").html("THÔNG TIN ĐĂNG NHẬP");
    }
  });

  const fptPromise = import("https://openfpcdn.io/fingerprintjs/v3").then(
    (FingerprintJS) => FingerprintJS.load()
  );

  async function getFingerPrint() {
    const fp = await fptPromise;
    const result = await fp.get();
    const visitorId = result.visitorId;
    return visitorId;
  }
  getFingerPrint();

    mediaLoaded("ready")

})



document.addEventListener("DOMContentLoaded", ()=>{
    getHome();
    let winH = window.innerHeight
    $("#sa88-box").height(winH + 55)
    $(".sa88-box-pad").height(winH - 55)
});

function reloadAccordingList (){
    $(".section-info").empty()
    $(".section-world-cup").empty()
    if($(".section-info")[0].children.length === 0 && $(".section-world-cup")[0].children.length ===0) {
        getHome();
    }
}

var swiper;
// 左侧抽屉菜单，画面中间的跳转
function getHome(){
    $.ajax({type:"get",url: "./src/jsonData/home.json",dataType:"json",
        success:function(data) {handalLoadDataOnPage(data)}, error:function(XMLHttpRequest, textStatus, errorThrown) { console.log('XMLHttpRequest, textStatus, errorThrown',XMLHttpRequest, textStatus, errorThrown)}
    });
}
const withHashUrl = {"menu-cshh":true,"menu-benefit":true,"menu-ask":true,"menu-rewards":true}
function handalLoadDataOnPage(_jsonData) {
    console.log("handalLoadDataOnPage",_jsonData)
    let bannerImgs = _jsonData[1];
    let boxMenuItems = _jsonData[0]['menu'][1]['phone'];
    if($(".swiper-slide").length < 1) {loadSwiperImgs(bannerImgs['banner'])}
    if($("#box-menu ul li").length < 2){loadBoxMenuItems(boxMenuItems.items,_jsonData[2])}
    var idDom = []
    for (let withHashUrlKey in withHashUrl) {
        let id_dom = document.getElementById(withHashUrlKey)
        if(!!id_dom) {idDom.push(id_dom)}
    }
    if($(".item-info").length <1 || idDom.length>0){loadMainPageItemInfo(_jsonData[4]['itemInfo'],_jsonData[2],[],idDom.length>0)}
    if($(".section-world-cup .container-original").length <1){loadMainPageArticle(_jsonData[5]['dailiArticle'])}
    if($(".intro-sa88").length <1){ loadIntro(_jsonData[6]['introSA88'])}
    if($(".ctact ul li").length <1){ loadContact(_jsonData[7]['connection'])}
}

function loadSwiperImgs(bannerImgs){
    for(let i=0;i<bannerImgs.length;i++){
        var swiperSlide = mkDOM("div",[{class:"swiper-slide"}]),imgNo=i+1,swiperImg =mkDOM("img",[{class:"img-banner"},{src:'./src/images/'+bannerImgs[i]},{alt:'Banner '+imgNo}]);
        swiperSlide.append(swiperImg);
        $(".swiper-wrapper")[0].append(swiperSlide)
    }
    if($(".swiper-slide").length > 0 ){
        swiper = new Swiper(".swiper-container", {loop: true,pagination: {el: ".swiper-pagination"}, navigation: {nextEl: ".swiper-button-next",prevEl: ".swiper-button-prev"}, autoplay: {delay: 5000}});
        if($(".swiper-container")[0].children.length > 0) {
             mediaLoaded("loadSwiperImgs")
        }
    }

}
function loadBoxMenuItems(boxMenuItems,honeMenuArticle) {
    for(var i=0;i<boxMenuItems.length;i++) {
        var _li= makeBoxMenuItems(boxMenuItems[i]);
        if(boxMenuItems[i].href.includes('http') || boxMenuItems[i].href.includes('.com')) {_li= makeBoxMenuUrlItems(_li,boxMenuItems[i])}
        $("#box-menu ul").append(_li)
    }
    $(".box-item-info").click((e)=>{
        let hasUrl = e.currentTarget.classList.length > 1;
        if(!hasUrl) {
            openExampleModal(e.currentTarget,honeMenuArticle);
        }
    });
     mediaLoaded("loadBoxMenuItems")
}
const makeBoxMenuItems = (_obj)=>{
    let _li=mkDOM("li",[{id:_obj.href},{class:"box-item-info"}]),_div=mkDOM("div",[{class:"img-icon"}])
        ,_img=mkDOM("img",[{src:"./src/images/"+_obj.icon}]),_p=mkDOM("p",[{innerHTML:_obj.title}])
    _p.innerHTML=_obj.title;
    _div.append(_img);_li.append(_div,_p);
    return _li
}
const makeBoxMenuUrlItems = (_liObj,_obj)=>{
    let _a=mkDOM("a",[{href:_obj.href}]);_liObj.removeAttribute("id");_liObj.setAttribute("class","box-item-info box-item-info-url");_a.append(_liObj);_a.style.width= "100%";
    return _a;
}
function loadMainPageItemInfo(itemInfo,honeMenuArticle,itemInfoArr=[],isReLoad) {
    let articles = honeMenuArticle["phoneMenuArticle"]
    if($(".list-info").length == 0) {
        let listInfo = mkDOM("div",[{"class":"list-info"}])
        $(".section-login").after(listInfo)
    }
    for (let i=0;i<itemInfo.length;i++) {
        var _item;
        if(itemInfo[i].href.includes("#") && !itemInfo[i].href.includes("http")){
            _item = makeItemInfo(itemInfo[i]);itemInfoArr.push({_item,articles})
        } else {
            _item = makeItemInfoNotId(itemInfo[i])
        }
        if(i==itemInfo.length-1 && i%2==0){
            _item.style="display:inline-block;width:100vw;height:100px"
            _item.children[0].style="width:100vw;border-bottom: 1px solid #154282;border-right: 1px solid #154282;"
        }
      if(!isReLoad){$(".list-info").append(_item)}
    }
    $(".item-info").click((e)=>{
        if(e.currentTarget.hasAttribute("id") && !withHashUrl[e.currentTarget.id]){openExampleModal(e.currentTarget,honeMenuArticle)}
    })
    makePageIdContainer(itemInfoArr)
}
const makeItemInfo = (_obj) =>{
    let _divItemInfo = document.createElement("div"),_div=document.createElement("div"),_img=document.createElement("img"),_p=document.createElement("p")
    _divItemInfo.setAttribute("class","item-info");_divItemInfo.setAttribute("id",_obj.href.split("#")[1]);_div.setAttribute("class","img-icon");
    _img.setAttribute("src","./src/images/"+_obj.icon);_p.innerHTML=_obj.title;
    _div.append(_img);_divItemInfo.append(_div,_p);
    let menuNameMenu = _obj.href.split("#")[1]
    if(menuNameMenu && !!withHashUrl[menuNameMenu]) {
        let menuNameUrl = '#'+menuNameMenu.split("menu-")[1]

        let _a=mkDOM("a",[{"href":menuNameUrl},{"style":"display:inline-block;width:50%;height:100px"}])
        _divItemInfo.style="width:100%";
        _a.append(_divItemInfo)
        return _a;
    }else {
        return _divItemInfo;
    }
}
const makeItemInfoNotId = (_obj) => {
    let yuhuiURL = _obj.href.split("[main]")[1];
    let theURL = window.location.href.split("/daili")[0]+yuhuiURL
    let _divItemInfo = document.createElement("div"),_div=document.createElement("div"),_a=document.createElement("a"),_img=document.createElement("img"),_p=document.createElement("p")
    _divItemInfo.setAttribute("class","item-info");_a.setAttribute("href",theURL);_div.setAttribute("class","img-icon");
    _img.setAttribute("src","./src/images/"+_obj.icon);_p.innerHTML=_obj.title;
    _div.append(_img);_divItemInfo.append(_div,_p);_a.append(_divItemInfo);
    return _a;
}
const openExampleModal = (val,honeMenuArticle)=>{
    let _id = val.id.split("#")[1] || val.attributes.id?.value;
    if(!!val && !!honeMenuArticle ) {
        let modalInnerHtml = honeMenuArticle['phoneMenuArticle'].filter((f)=> f.id == _id )[0]?.article;
        let title = honeMenuArticle['phoneMenuArticle'].filter((f)=> f.id == _id )[0]?.title;
        $(".section-menu").css("display", "none");
        $("#exampleModal").modal("show");
        $("#exampleModalLabel").html(title);
        $("#exampleModal .modal-body").html("");
        $("#exampleModal .modal-body").html(modalInnerHtml);
        $(".accordion").click(function(e){
            e.currentTarget.classList.toggle("active");
            var panel = e.currentTarget.nextElementSibling;
            if (panel.style.display === "block") {panel.style.display = "none"; } else {panel.style.display = "block";}
        })
    }
}
function loadMainPageArticle(articles) {
    for(let i=0;i<articles.length;i++){
        var contaniner = mkArticleContaniner(articles[i])
        $(".section-world-cup").append(contaniner)
    }
}
const makePageIdContainer = (_menuItems,_divArr=[])=>{
    _menuItems.forEach((_menuItem)=>{
        let splitHref = _menuItem["_item"]["href"].split("#")
        let _id = splitHref[splitHref.length-1]
        let item =_menuItem["articles"].filter((it)=>it.id === 'menu-'+_id)[0]
        let _div =  mkDOM("div",[{id:_id},{class:"container"},{innerHTML:item.article}])
        let title = mkDOM("p",[{class:"title-letter"},{innerHTML:item.title}])
        _div.prepend(title)
        _divArr.push(_div)
    })
    _divArr = _divArr.reverse()
    _divArr.forEach((theArrangeDiv)=>{
        $(".section-world-cup").prepend(theArrangeDiv)
    })
    $(".accordion").click(function(e){
        e.currentTarget.classList.toggle("active");
        var panel = e.currentTarget.nextElementSibling;
        if (panel.style.display === "block") {panel.style.display = "none"; } else {panel.style.display = "block";}
    })
    mediaLoaded("makePageIdContainer")
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
    let _mt = mkDOM("table",[{class:"table table-bordered"}]);
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
function loadIntro(str) {
    let initStr = str.substring(0, 269)
    let _sa88Init = mkDOM("p",[{class:"intro-sa88"}])
    var _span=mkDOM("span",[{class:"intro-sa88-text"},{innerHTML:initStr}])
    _sa88Init.append(_span,mkDOM("span",[{class:"see-more"},{innerHTML:"...Xem thêm"}]),mkDOM("span",[{class:"see-less"},{innerHTML:"Rút gọn"}]))

    if($('.intro-sa88').length>0){$('.intro-sa88').remove("")}
    $(".section-intro").append(_sa88Init);
    $(".see-less").hide();

    $(".see-more").click(function(){
        $('.intro-sa88-text').remove()
        _span=mkDOM("span",[{class:"intro-sa88-text"},{innerHTML:str}])
        $(".intro-sa88").prepend(_span);
        $(".see-more").hide();
        $(".see-less").show();
    })
    $(".see-less").click(function(){
        $('.intro-sa88-text').remove()
        _span=mkDOM("span",[{class:"intro-sa88-text"},{innerHTML:initStr}])
        $(".intro-sa88").prepend(_span);
        $(".see-less").hide();
        $(".see-more").show();
    })

}
function loadContact(contacts) {
    let kindsIcons ={"e-mail":"./src/images/icon-mail.png","telegram":"./src/images/icon-tele.png","youtube":"./src/images/icon-yt.png","fb":"./src/images/icon-fb.png","tiktok":"./src/images/icon-tiktok.png"}
    contacts.forEach((_items)=> {
        let _li = mkDOM("li"),_a,_title,_divTitle,_divA,_linksArr=[],_liLinks,_div = mkDOM("div", [{class:"img-icon-contact"}]), _img = mkDOM("img",[{src:kindsIcons[_items.kinds]}])
        if(!_items.links){
            _a=mkDOM("a",[{href:_items.href},{innerHTML:_items.href}])
            _title=mkDOM("a",[{innerHTML:_items.title},{style:"margin:0 5px 0 0;width: auto"}])
            _div.append(_img);
            _li.append(_div,_title,_a);
            $(".ctact ul").append(_li)
        } else {
            _divTitle=mkDOM("a",[{innerHTML:_items.title},{style:"margin:0 5px 0 0;width: auto"}])
            _divA = mkDOM("a",[{innerHTML:_items.href},{href:_items.href}])
            _items.links.forEach((_links)=>{
                _liLinks=mkDOM("li")
                _title=mkDOM("a",[{innerHTML:_links.title},{style:"margin:0 5px 0 0px;width: auto"}])
                _a=mkDOM("a",[{href:_links.href},{innerHTML:_links.href}])
                _liLinks.append(_div,_title,_a)
                _linksArr.push(_liLinks)
            })
            _div.append(_img);
            _li.append(_div,_divTitle,_divA);
            $(".ctact ul").append(_li)
            $(".ctact ul").append(..._linksArr)
        }
    })
}
loadFotterPic ()
function loadFotterPic () {
    let picUrl = "./src/images/sa88fotter.webp"
    $("#sa88-footer-img")[0].setAttribute("src",picUrl)
}

function mediaLoaded(funcName){
    let IMG= $("img");
    let total =[...IMG]
    let loaded =[]
    let realTotal = []
    total.map((item)=>{
        if(total.filter((iy)=>iy.src == item.src).length == 0){
            realTotal.push(item)
        }
    })
    for (const totalKey in total) {
        if(total[totalKey].nodeName=="IMG"){
            if(total[totalKey].complete) {
                loaded.push(total[totalKey])
            }
            total[totalKey].onload = function (){
                if(total[totalKey].complete) {
                    loaded.push(total[totalKey])
                }
                if(loaded.length == total.length){
                    setTimeout(()=>{$("#lodingMask").hide()},500)
                }
            }
            if(loaded.length == total.length){
                setTimeout(()=>{$("#lodingMask").hide()},500)
                console.log("在loaded外")
            }
        }
    }
}
