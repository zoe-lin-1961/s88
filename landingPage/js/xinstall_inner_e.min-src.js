var localIp = "";
var repeatTimes = 5;
var data1;
var myCallback;
var fontsSha1;
var resolution;
var langsDetected;
var hasBack = false;
var channel = "";
var mUrl = "https://aaebwm.com/";
var XinstallJS = {
    isCompleted: false
};

Object.defineProperty(XinstallJS, "isCompleted", {
    get: function () {
        return isCompleted;
    },
    set: function (value) {
        isCompleted = value;
        if (value) XInstall.toggleLoading("hide");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    getE();
    (function(root, ns, factory) {
        "use strict";
        "undefined" != typeof module && module.exports ? module.exports = factory(ns, root) : "function" == typeof define && define.amd ? define("detect-zoom", function() {
            return factory(ns, root)
        }) : root[ns] = factory(ns, root)
    })(window, "detectZoom", function() {
        var devicePixelRatio = function() {
                return window.devicePixelRatio || 1
            },
            fallback = function() {
                return {
                    zoom: 1,
                    devicePxPerCssPx: 1
                }
            },
            ie8 = function() {
                var zoom = Math.round(100 * (screen.deviceXDPI / screen.logicalXDPI)) / 100;
                return {
                    zoom: zoom,
                    devicePxPerCssPx: zoom * devicePixelRatio()
                }
            },
            ie10 = function() {
                var zoom = Math.round(100 * (document.documentElement.offsetHeight / window.innerHeight)) / 100;
                return {
                    zoom: zoom,
                    devicePxPerCssPx: zoom * devicePixelRatio()
                }
            },
            webkitMobile = function() {
                var deviceWidth = 90 == Math.abs(window.orientation) ? screen.height : screen.width,
                    zoom = deviceWidth / window.innerWidth;
                return {
                    zoom: zoom,
                    devicePxPerCssPx: zoom * devicePixelRatio()
                }
            },
            webkit = function() {
                var important = function(str) {
                        return str.replace(/;/g, " !important;")
                    },
                    div = document.createElement("div");
                div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0", div.setAttribute("style", important("font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;"));
                var container = document.createElement("div");
                container.setAttribute("style", important("width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;")), container.appendChild(div), document.body.appendChild(container);
                var zoom = 1e3 / div.clientHeight;
                return zoom = Math.round(100 * zoom) / 100, document.body.removeChild(container), {
                    zoom: zoom,
                    devicePxPerCssPx: zoom * devicePixelRatio()
                }
            },
            firefox4 = function() {
                var zoom = mediaQueryBinarySearch("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4);
                return zoom = Math.round(100 * zoom) / 100, {
                    zoom: zoom,
                    devicePxPerCssPx: zoom
                }
            },
            firefox18 = function() {
                return {
                    zoom: firefox4().zoom,
                    devicePxPerCssPx: devicePixelRatio()
                }
            },
            opera11 = function() {
                var zoom = window.top.outerWidth / window.top.innerWidth;
                return zoom = Math.round(100 * zoom) / 100, {
                    zoom: zoom,
                    devicePxPerCssPx: zoom * devicePixelRatio()
                }
            },
            mediaQueryBinarySearch = function(property, unit, a, b, maxIter, epsilon) {
                function binarySearch(a, b, maxIter) {
                    var mid = (a + b) / 2;
                    if (0 >= maxIter || epsilon > b - a) return mid;
                    var query = "(" + property + ":" + mid + unit + ")";
                    return matchMedia(query).matches ? binarySearch(mid, b, maxIter - 1) : binarySearch(a, mid, maxIter - 1)
                }
                var matchMedia, head, style, div;
                window.matchMedia ? matchMedia = window.matchMedia : (head = document.getElementsByTagName("head")[0], style = document.createElement("style"), head.appendChild(style), div = document.createElement("div"), div.className = "mediaQueryBinarySearch", div.style.display = "none", document.body.appendChild(div), matchMedia = function(query) {
                    style.sheet.insertRule("@media " + query + "{.mediaQueryBinarySearch " + "{text-decoration: underline} }", 0);
                    var matched = "underline" == getComputedStyle(div, null).textDecoration;
                    return style.sheet.deleteRule(0), {
                        matches: matched
                    }
                });
                var ratio = binarySearch(a, b, maxIter);
                return div && (head.removeChild(style), document.body.removeChild(div)), ratio
            },
            detectFunction = function() {
                var func = fallback;
                return isNaN(screen.logicalXDPI) || isNaN(screen.systemXDPI) ? window.navigator.msMaxTouchPoints ? func = ie10 : "orientation" in window && "string" == typeof document.body.style.webkitMarquee ? func = webkitMobile : "string" == typeof document.body.style.webkitMarquee ? func = webkit : navigator.userAgent.indexOf("Opera") >= 0 ? func = opera11 : window.devicePixelRatio ? func = firefox18 : firefox4().zoom > .001 && (func = firefox4) : func = ie8, func
            }();
        return {
            zoom: function() {
                return detectFunction().zoom
            },
            device: function() {
                return detectFunction().devicePxPerCssPx
            }
        }
    });
    fontsSha1 = getFounts();
    langsDetected = get_writing_scripts();
    resolution = getResolution()
});
var XInstall = {
    "getInstall": function(appid, data, callback, ua = "") {
        if (localStorage != null) {}
        if (!ua) {
            ua = navigator.userAgent
        }
        var md = new MobileDetect(ua);
        var os = md.os();
        hasBack = false;
        var model = "";
        var version = "";
        var type = 0;
        if (os == "iOS") {
            model = md.mobile();
            var phone = ua.split("iPhone OS");
            phone = phone[1];
            phone = phone.split("like");
            phone = phone[0];
            version = phone.trim();
            version = version.replace(/\_/g, ".");
            type = 2
        } else if (os == "AndroidOS") {
            var sssArr = ua.split(";");
            for (var k = 0; k < sssArr.length; k++) {
                var item2 = sssArr[k];
                if (item2.indexOf("Android") != -1) {
                    var versionArr = item2.split("Android");
                    version = versionArr[1].trim();
                    break
                }
            }
            if (!version) {
                version = md.version()
            }
            var buildIndex = -1;
            for (var i = 0; i < sssArr.length; i++) {
                var item = sssArr[i];
                if (item.indexOf("Build") != -1) {
                    buildIndex = i;
                    break
                }
            }
            if (buildIndex != -1) {
                var sss = sssArr[buildIndex];
                var index = sss.indexOf("Build/");
                if (index > -1) {
                    model = sss.substring(0, index - 1)
                }
            }
            type = 1;
            if (!model) {
                var uaArr = ua.split("AppleWebKit");
                var uaArr1Str = uaArr[0];
                uaArr1Str = uaArr1Str.trim();
                uaArr1Str = uaArr1Str.substr(0, uaArr1Str.length - 1);
                var uaArr1Arr = uaArr1Str.split(";");
                for (var j = uaArr1Arr.length - 1; j >= 0; j--) {
                    var item1 = uaArr1Arr[j];
                    if (item1.indexOf("HMSCore") != -1) {
                        uaArr1Arr.splice(j, 1)
                    } else if (item1.indexOf("GMSCore") != -1) {
                        uaArr1Arr.splice(j, 1)
                    } else if (item1.trim() == "wv") {
                        uaArr1Arr.splice(j, 1)
                    }
                }
                var uaArrLast = uaArr1Arr[uaArr1Arr.length - 1];
                var modelStr = uaArrLast.trim();
                if (modelStr.endsWith(")")) {
                    modelStr = modelStr.substring(0, modelStr.length - 1)
                }
                model = modelStr
            }
        }
        var print = getUUID("http://tinstall.xyz/example.html?id=12345678");
        var audioPrint = audioFingerPrinting();
        var canvas = document.createElement('canvas'),
            gl = canvas.getContext('experimental-webgl'),
            debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        var gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        var timestamp = new Date().getTime();
        timestamp = parseInt((timestamp / 1000));
        var random = Math.round(Math.random() * 1000000);
        var timeRandom = timestamp + "" + random;
        copyToClip(timeRandom);
        var channel_code = "";
        if (data.hasOwnProperty("channel_code")) {
            channel_code = data["channel_code"]
        }
        if (!fontsSha1) {
            fontsSha1 = getFounts()
        }
        if (!resolution) {
            resolution = getResolution()
        }
        if (!langsDetected) {
            langsDetected = get_writing_scripts()
        }
        data1 = {
            version: version,
            brand: md.mobile(),
            model: model,
            width: (screen.availWidth * window.devicePixelRatio),
            height: (screen.availHeight * window.devicePixelRatio),
            os: os,
            ua: ua,
            params: JSON.stringify(data),
            appid: appid,
            gpu: gpu,
            localIp: localIp,
            timeRandom: timeRandom,
            channel_code: channel_code,
            print: print,
            audioPrint: audioPrint,
            fontsSha1: fontsSha1,
            resolution: resolution,
            langsDetected: langsDetected,
            channel: channel
        };
        myCallback = callback;
        sendStoreData();
        ajax({
            url: mUrl + "/index.php/api/chart/record",
            type: 'post',
            data: {
                app_key: appid,
                app_type: type,
                record_type: 1,
                channel_code: channel_code,
                model: model,
                channel: channel
            },
            dataType: "json",
            crossDomain: true,
            success: function(data) {
                var result = JSON.stringify(data);
                console.log(result)
            },
            error: function(data) {
                console.log(data)
            }
        });
        setTimeout("processBack()", 2000)
    },
    "parseUrlParams": function getParams() {
        var query = location.search.substr(1);
        query = query.split('&');
        var params = {};
        for (let i = 0; i < query.length; i++) {
            let q = query[i].split('=');
            if (q.length === 2) {
                params[q[0]] = q[1]
            }
        }
        return params
    },
    "setChannel": function(mChannel) {
        channel = mChannel
    },
    "setHost": function(url) {
        mUrl = url
    },
    "toggleLoading": function(display) { // display =  show' / 'hide'
        let isLoading = document.querySelector('#download').classList.value.indexOf('hideLoading') === -1;
        document.querySelectorAll('#download').forEach(function (ele) {
            if (display === 'hide' && isLoading) { ele.classList.add('hideLoading'); }
            if (display === 'show' && !isLoading) { ele.classList.remove('hideLoading'); }
        });
    }
};

function ajax(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", data.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var res = JSON.parse(xhr.responseText);
                data.success(res)
            } else {
                data.error(xhr.responseText)
            }
        }
    };
    xhr.onerror = function(e) {
        data.error(xhr.responseText)
    };
    xhr.send(JSON.stringify(data.data))
}

function processBack() {
    if (hasBack) {
        return
    }
    hasBack = true;
    console.log("processBack");
    myCallback({})
}

function sendStoreData() {
    if (!data1 || !myCallback) {
        return
    }
    ajax({
        url: mUrl + "/index.php/api/index/storeData",
        type: 'post',
        data: data1,
        dataType: "json",
        crossDomain: true,
        success: function(data) {
            var result = JSON.stringify(data);
            if (hasBack) {
                return
            }
            hasBack = true;
            myCallback(result);
            var timestamp = Date.parse(new Date()) / 1000;
            localStorage.setItem("upload_time", timestamp)
        },
        error: function(data) {
            if (repeatTimes <= 0) {
                if (hasBack) {
                    return
                }
                hasBack = true;
                myCallback("");
                if (data != undefined && data.responseJSON != undefined && data.responseJSON.msg != undefined) {
                    console.log(data)
                }
                return
            }
            console.log("error occur");
            console.log("error occur");
            repeatTimes--;
            setTimeout("sendStoreData()", 500)
        }
    })
}

function getUserIP(onNewIP) {
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    if (myPeerConnection == undefined) {
        return
    }
    var pc = new myPeerConnection({
            iceServers: []
        }),
        noop = function() {},
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true
    }
    pc.createDataChannel("");
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP)
        });
        pc.setLocalDescription(sdp, noop, noop)
    }).catch(function(reason) {
        onNewIP(reason)
    });
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
    }
}
getUserIP(function(ip) {
    localIp = ip
});

function copyToClip(content) {
    var transfor = parseInt(content).toString(2);
    var numStr = transfor + "";
    var numRes = numStr.replace(/0/g, " ");
    numRes = numRes.replace(/1/g, "\t");
    var aux = document.createElement("input");
    aux.setAttribute("value", numRes);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux)
}

function bin2hex(s) {
    var i, l, o = '',
        n;
    s += '';
    for ( let i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i).toString(16);
        o += n.length < 2 ? '0' + n : n
    }
    return o
}

function getUUID(domain) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    var txt = domain;
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "tencent";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    var b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
    var bin = atob(b64);
    var crc = bin2hex(bin.slice(-16, -12));
    return crc
}

function audioFingerPrinting() {
    var finished = false;
    try {
        var audioCtx = new(window.AudioContext || window.webkitAudioContext),
            oscillator = audioCtx.createOscillator(),
            analyser = audioCtx.createAnalyser(),
            gainNode = audioCtx.createGain(),
            scriptProcessor = audioCtx.createScriptProcessor(4096, 1, 1);
        var destination = audioCtx.destination;
        return (audioCtx.sampleRate).toString() + '_' + destination.maxChannelCount + "_" + destination.numberOfInputs + '_' + destination.numberOfOutputs + '_' + destination.channelCount
    } catch (e) {
        return ""
    }
}

function getFounts() {
    var fontsData = "";
    var fonts = ['Segoe WP', 'FreeMono', 'Heiti TC Light', 'VNI-Kun', 'Liberation Serif', 'Dotum', 'ML-TTVeenaHeavy', 'Brandon Grotesque Light', 'Adobe Hebrew Italic', 'MMa Etc Bold', 'Toledo', 'Ubuntu Mono derivative Powerline', 'Hannotate TC Regular', 'Droid Sans Thai', 'Cambria Italic', 'Abadi MT Condensed Extra Bold', 'Barrio', 'ML-TTVishu', 'MMa VariableB S', 'BurigangaSushreeOMJ', 'Pegypta', 'Avenir Next Condensed', 'TitilliumText22L-Bold', 'Corbel Bold Italic', '.VnCourier New', 'Trajan Pro 3 Bold', 'Futura LT Condensed Light', 'FML-TTAmbili', 'dbldwrsw', 'PingFang HK Light', 'Soho Gothic Pro Italic', 'Tele-Marines', 'Cronos Pro', 'Noto Sans Brahmi', 'HANA', 'VNI Times', 'Rakesly El', 'WP MultinationalA Roman', 'HGSHeiseiKakugothictaiW5', 'Avenir Next W1G Medium', 'Segoe UI Semibold', 'Cambria Bold Italic', 'Futura Std Book', 'New Renex Terminal', 'HGSHeiseiKakugothictaiW9', 'KufiStandardGK Regular', 'VNI-Bodon-Poster', 'eurb9', 'MrsEavesRoman', 'WP Greek Century', 'STIXNonUnicode', 'Songti SC Bold', 'Kaushan Script', 'OpenSymbol', 'FML-TTJyotsna', 'EngraverTime', 'Charter Black Italic', 'Arno Pro', 'Tahoma Negreta', 'Century Schoolbook L', 'Circular Std Book Italic', 'Tall Boy 3D', 'Egyptian710 BT', 'ML-NILA03', 'ML-NILA02', 'ML-NILA01', 'Petrucci', 'Waseem Regular', 'ML-NILA06', 'ML-NILA05', 'NORMAL', 'eusm8', 'Z@R120A.tmp', 'Gulim', 'cmtcsc10', 'Merriweather Italic', '.VnSouthernH', 'Lantinghei TC Heavy', 'Bangla Sangam MN', 'C-Medium', 'Nightclub BTN UltraCn', 'GoraiOMJ', 'Avenir Next Ultra Light', 'Myanmar Sangam MN', 'Matisse ITC', 'Droid Sans Mono Dotted for Powerline', 'Optima Italic', 'TitilliumText22L-Regular', 'Sketch Rockwell', 'MelodBold', 'cmsl10', 'Zapfino', 'cmsl12', 'Linux Libertine Display O', 'Manorama', 'DecoType Naskh Special', 'Caviar Dreams Bold Italic', 'Sauce Code Powerline', 'Courier New CE', 'BurigangaSushreeMJ', 'Aileron', 'Hiragino Sans', 'Smooth', 'MMCenturyOldGreek', 'Microsoft NeoGothic', 'Atzur', 'GLYPHICONS Halflings', 'Trattatello', 'LT-TM-Lakshman', 'Playbill', 'TeX Gyre Chorus', 'Myriad Pro SemiCondensed', 'Marlett', 'Open Sans Extrabold', 'Chaparral Pro Bold', 'GrilledCheese BTN Cn', 'Bitstream Charter', 'Noto Sans Tai Viet', 'Georgia Pro SemiBold', 'Rotis Sans Serif Std 56 Italic', 'ITF Devanagari Marathi Demi', 'Avenir Next W1G Thin', 'Priori Serif OT', 'Times Bold Italic', 'BurigangaKamalaOMJ', 'Literation Mono Powerline Italic', 'Quickpen', 'AR BONNIE', 'Caviar Dreams', 'Avenir Roman', 'Pujeeta', 'Deepak', 'cmmi12', 'FML-TTSankara', 'Bookman Old Style Italic', '.VnArial', 'Antonio', 'Linowrite', 'GFS Gazis', 'FordLineDraw', 'ConcursoItalian BTN Wide', 'MMa CenturySS', 'Laksaman', 'Segoe Marker', 'Monotype Sorts', 'Bienhoa', 'Noto Sans Syriac Eastern', 'Caviar Dreams Bold', 'MMa Arrow Bold Italic', 'Diavlo Black', 'Garamond', 'Proxima Nova', 'BhairabOMJ', 'WP Phonetic', 'Myriad Pro', 'VNI-Fato', 'Myriad Pro Bold', 'MMVariableF Bold', 'Julius Sans One', 'EuroRoman', 'cmcsc9', 'cmcsc8', 'LaurenScript', 'VNI-Commerce', 'Freebooter Script', 'Math5', 'Party LET', '.VnHelvetIns', 'American Typewriter', 'Roboto Mono Bold Italic for Powerline', 'Vineta BT', 'ML-TTPooram', 'MMa Extra Bold', 'Quangngai', 'MT Extra', 'TAM', 'Terminal Greek 737 (437G)', 'TITUS Cyberbit Basic', 'Kalakaumudi', 'Adobe Gurmukhi', 'HanziPen SC', 'cmff10', 'Praxis', 'FML-TTVishu', 'Microsoft MHei', 'VNI Greece', 'Sukhumvit Set Semi Bold', 'Swiss 721 Roman', 'Soho Gothic Pro Ultra Italic', 'STLiti', 'Marquisette BTN Light', 'Arimo Bold Italic for Powerline', 'ML-TTJaya', 'eusm9', 'Simplified Arabic', 'Kohinoor Devanagari Light', 'MS PMincho', 'Century Gothic Italic', 'HariSree', 'MyriadPro-Semibold', 'IPAexGothic', 'MS Reference Serif', 'eusm7', 'HelveticaNeueLT Pro 97 BlkCn', 'Quicksand Bold', 'Yu Mincho', 'VNI-Murray', 'ChandrabatiMJ', 'Sitka Banner', 'MMCenturyOldGreek Italic', '.VnCommercial ScriptH', 'Interstate-Regular', 'Arimo Bold Italic', 'Latienne Pro', 'TAC-Valluvar', 'FML-Nanditha', 'MMa VariableF Bold', 'Tekton Pro Bold', 'Noto Serif', 'AmdtSymbols', 'Euclid Symbol', 'Songti SC Regular', 'Cambria Bold', 'Leelawadee', 'Meslo LG S DZ Regular for Powerline', 'Nexa Light', 'Party LET Plain:1.0', 'Minion Pro SmBd', 'AV-Font-Kan1', 'Clarendon Cn BT', 'Yu Mincho Demibold', 'Hypatia Sans Pro Semibold', 'Consolas', 'Seravek Bold Italic', 'Nightclub BTN Cn', 'Myriad Arabic Italic', 'Charter Roman', 'spinwerad', 'Gill Sans Nova Cond Ultra Bold', 'KG Corner of the Sky', 'DecoType Naskh Extensions', 'MLB-TTAmbili', 'YuMincho ', 'Futura LT Light', 'Latin Modern Roman', 'Gotham Narrow Black Italic', 'DIN-Light', 'VNI-Top', 'DotumChe', 'Giolinh', 'Muna Black', 'Apple Boy BTN', 'Clarendon BT', 'DINPro-Light', 'Playfair Display SC Black', 'Quixley LET', 'MMa Pascal Bold', 'Interstate-Light', 'American Typewriter Condensed Bold', 'Skia Condensed', 'Latienne Pro Bold', 'lcircle10', 'ML-IndulekhaHeavy', 'Source Serif Pro Semibold', 'Tamburo', 'Halong', 'Normande Italic', 'VNI-Book', 'MMa Extra Italic', 'Heavy', 'MMBinary', 'PondAllRounder', 'Euphemia UCAS Bold', 'Avenir Book Oblique', 'HP Simplified Light', 'HGSHeiseiKakugothictaiW3', 'Gill Sans Light', 'VNI-Garam', 'AlekyaMedium', 'Hebar', 'Stone Sans Sem ITC TT', 'DV1-TTYogesh', 'Adobe Arabic', 'Rosewood Std Regular', 'Marquisette BTN Lined', 'Gotham Book', 'Sukhumvit Set Medium', '.VnTeknicalH', 'Z@R1762.tmp', 'MMa Gauss Bold', 'Avenir Next Condensed Demi Bold', 'Trebuchet MS Bold Italic', 'TlwgMono', 'Avenir Next W1G Bold', 'Flubber', 'Opus Figured Bass', 'Futura LT Heavy Oblique', 'Hiragino Mincho ProN', 'Nova Oval', 'Bangla MN', 'Opus Function Symbols', 'Microsoft JhengHei Light', 'STIXSizeOneSym', 'Magic School Two', 'Type Embellishments One LET Embellishments One LET Plain:1.0', 'Avenir Next Heavy', 'Sylfaen', 'Palatino Bold', 'Rockwell Extra Bold', 'Candara Italic', 'Gujarati MT Bold', 'Vinhan', '.VnBahamasBH', 'SaiVrishin', 'AR ESSENCE', 'Frankfurter Venetian TT', 'Gillius ADF Cd', 'Mishafi Gold', 'System Font Medium', 'Roboto Mono Medium for Powerline', 'SF Distant Galaxy', 'Monotype.com', 'MMTextBook Bold', 'Gill Sans MT Italic', 'Tlwg Typewriter', 'Soho Gothic Pro ExtraBold', 'Gill Sans Ultra Bold', 'STIXSizeTwoSym-Bold', 'BaluBrush', 'System Font Bold', 'Roboto Light Italic', 'Times New Roman (Arabic)', 'Maestro Wide', 'Bickham Script Pro 3 Semibold', 'STXingkai', 'Annie BTN', 'AtraiOMJ', 'Aileron SemiBold', 'cmsy7', 'Bookshelf Symbol 3', 'Orator Std', 'Swis721 BdCnOul BT', 'Proxima Nova Bold', 'Shree Devanagari 714 Bold Italic', 'WP MultinationalA Helve', 'Noto Sans', 'Lucida Sans Italic', 'Phosphate Solid', 'Damascus', 'DengXian Light', 'Notram', 'Bordeaux Roman Bold LET Plain', 'Lantinghei SC Heavy', 'MMa CenturyS Italic', 'Noto Sans Phoenician', 'System Font', 'ADMUI3Sm', 'Shree Devanagari 714 Italic', 'kroeger 06', 'Belfast Light SF', 'KacstBook', 'PingFang SC Thin', 'Humanst521 BT', 'Futura Condensed Medium', 'WP Japanese', 'Hiragino Kaku Gothic Std W8', 'GaneshBold', 'Open Sans Italic', 'Aileron Bold', 'Euphemia UCAS', '.VnFreeH', 'Swis721 BlkOul BT', '.VnRevueH', 'Freehand521 BT', 'MMa Arrow Italic', 'Opus Chords Sans Condensed', 'OR-TTSarala', 'Montserrat Black', 'VNI-Avo', 'System Font Medium P4', 'VNI-GlabXb', 'HarvestItal', 'MMa VariableA S', 'Segoe WP Black', 'Courier10 BT', '.VnLincolnH', 'eusb5', 'Marker Felt Thin', 'KacstTitleL', 'HelveticaNeueLT Pro 107 XBlkCn', 'IBM3270', 'MLB-TTIndulekha', 'PujeetaItalic', 'Bookman Old Style Bold', 'Latin Modern Sans', 'ELEGANCE', 'GhorautraMJ', 'MMExtra Bold', 'Rockwell Nova Cond', 'Minion Pro Cond', 'Brandon Grotesque Medium', 'HGHeiseiKakugothictaiW9', 'Euphemia UCAS Italic', '.VnUniverseH', 'Avenir Book', 'ZapfHumnst Ult BT', 'Diwani Simple Striped', 'Myriad Pro Bold SemiCondensed', 'Raleway SemiBold Italic', 'Z@R1751.tmp', 'Hypatia Sans Pro Black', 'linew10', '.VnCooperH', 'Adobe Ming Std', 'BlairMdITC TT Medium', 'Levenim MT', 'Ravie', 'FML-TTIndulekhaHeavy', 'Ruach LET', 'ML-TTJyothy', 'Brush Script MT', 'Latin Modern Mono Prop', 'ML-NILA04', 'TeX Gyre Pagella', 'Roboto Slab', 'eurb7', 'PFFuelPro-Regular', 'eurb5', 'MMGreek Bold', 'Oswald Stencil Bold', 'Georgia Bold', 'Noto Serif Thai', 'Selena', 'Perpetua Titling MT Bold', 'ColdSpaghetti BTN', 'Courier Oblique', 'Dosis Medium', 'Canter Bold Shadow', 'St Marie Thin', 'FML-TTGopika', 'STIXIntegralsSm-Bold', 'MMEtc Italic', 'CHANL', 'Yu Gothic UI', 'KacstNaskh', 'VNI-Palatin', 'GFS Porson', 'ML-TTAswathi', 'Myriad Pro Condensed Italic', 'Avenir Next Italic', 'WP ArabicScript Sihafa', 'Euclid Symbol Bold', 'Myriad Pro Semibold Condensed', 'PT Bold Broken', 'Goudy Old Style Bold', 'Racing Sans One', 'Bentham', 'Gotham Book Italic', 'Asimov', 'Avenir Next W1G Light', 'Ashwariya', 'Berlin Sans FB Demi', 'Myriad Pro Light Italic', 'VNI Helve Condense', 'Songti TC Regular', 'Verdana Italic', 'Nexa XBold Italic', 'Source Sans Pro', 'Dingbats', 'Synchro LET', 'OCR-A II', 'Deneane', 'MMExtra Bold Italic', 'Wellfleet', 'Jazz LET Plain:1.0', 'STIXIntegralsSm-Regular', 'MMa CenturyK', 'Javanese Text', 'Nova Script', 'Arial Hebrew Bold', 'PCMyungjo Regular', 'Bhuma', 'MMa CenturyS', 'Quicksand Dash', 'Gloucester MT Extra Condensed', 'Montserrat Bold', 'Jokerman Alts LET', 'Floraless', 'SF Compact Rounded Semibold', 'URW Gothic L', 'BadaBoom BB', 'Microsoft YaHei', 'Cantarell Oblique', 'Brush Script MT Italic', 'Raanana Bold', '.VnArialH', 'IPAPGothic', 'BN-TTDurga', 'Times New Roman'];
    for ( let i = 0, len = fonts.length; i < len; ++i) {
        if (detect(fonts[i])) fontsData += '1';
        else fontsData += '0'
    }
    return sha1(fontsData)
}
var baseFonts, testString, testSize, h, s, defaultWidth, defaultHeight;

function getE() {
    baseFonts = ['monospace', 'sans-serif', 'serif'];
    testString = "mmmmmmmmmmlli";
    testSize = '72px';
    h = document.getElementsByTagName("body")[0];
    s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    defaultWidth = {};
    defaultHeight = {};
    for (var index in baseFonts) {
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth;
        defaultHeight[baseFonts[index]] = s.offsetHeight;
        h.removeChild(s)
    }
}

function detect(font) {
    var detected = false;
    for (var index in baseFonts) {
        s.style.fontFamily = font + ',' + baseFonts[index];
        h.appendChild(s);
        var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
        h.removeChild(s);
        detected = detected || matched
    }
    return detected
}

function encodeUTF8(s) {
    var i, r = [],
        c, x;
    for ( let i = 0; i < s.length; i++)
        if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
        else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
        if ((x = c ^ 0xD800) >> 10 == 0) c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000, r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
        else r.push(0xE0 + (c >> 12 & 0xF));
        r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F))
    }
    return r
}

function sha1(s) {
    var data = new Uint8Array(encodeUTF8(s));
    var i, j, t;
    var l = ((data.length + 8) >>> 6 << 4) + 16,
        s = new Uint8Array(l << 2);
    s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
    for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
    s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
    s[l - 1] = data.length << 3;
    var w = [],
        f = [
            function() {
                return m[1] & m[2] | ~m[1] & m[3]
            },
            function() {
                return m[1] ^ m[2] ^ m[3]
            },
            function() {
                return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]
            },
            function() {
                return m[1] ^ m[2] ^ m[3]
            }
        ],
        rol = function(n, c) {
            return n << c | n >>> (32 - c)
        },
        k = [1518500249, 1859775393, -1894007588, -899497514],
        m = [1732584193, -271733879, null, null, -1009589776];
    m[2] = ~m[0], m[3] = ~m[1];
    for ( let i = 0; i < s.length; i += 16) {
        var o = m.slice(0);
        for ( let j = 0; j < 80; j++) w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1), t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0, m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
        for ( let j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0
    };
    t = new DataView(new Uint32Array(m).buffer);
    for ( let i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);
    var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function(e) {
        return (e < 16 ? "0" : "") + e.toString(16)
    }).join("");
    return hex
}

function getResolution() {
    var zoom_level = detectZoom.device();
    var fixed_width = window.screen.width * zoom_level;
    var fixed_height = window.screen.height * zoom_level;
    var res = Math.round(fixed_width) + '_' + Math.round(fixed_height) + '_' + zoom_level + '_' + window.screen.width + "_" + window.screen.height + "_" + window.screen.colorDepth + "_" + window.screen.availWidth + "_" + window.screen.availHeight + "_" + window.screen.left + '_' + window.screen.top + '_' + window.screen.availLeft + "_" + window.screen.availTop + "_" + window.innerWidth + "_" + window.outerWidth + "_" + detectZoom.zoom();
    return sha1(res)
}

function get_writing_scripts() {
    try {
        return sha1(JSON.stringify(LanguageDetector.begin()));
        return ""
    } catch (e) {
        return ""
    }
}

function safeParseJSON() {
    try {
        return JSON.parse(s)
    } catch (error) {
        return false
    }
}(function() {
    try {
        var LanguageDetector, root, safeParseJSON;
        root = typeof exports !== "undefined" && exports !== null ? exports : this;
        safeParseJSON = function(s) {
            try {
                return JSON.parse(s)
            } catch (error) {
                return false
            }
        };
        LanguageDetector = (function() {
            function LanguageDetector() {
                this.names = safeParseJSON('[ "Latin", "Chinese", "Arabic", "Devanagari", "Cyrillic", "Bengali/Assamese", "Kana", "Gurmukhi", "Javanese", "Hangul", "Telugu", "Tamil", "Malayalam", "Burmese", "Thai", "Sundanese", "Kannada", "Gujarati", "Lao", "Odia", "Ge-ez", "Sinhala", "Armenian", "Khmer", "Greek", "Lontara", "Hebrew", "Tibetan", "Georgian", "Modern Yi", "Mongolian", "Tifinagh", "Syriac", "Thaana", "Inuktitut", "Cherokee" ]');
                this.codes = safeParseJSON("[[76,97,116,105,110], [27721,23383], [1575,1604,1593,1585,1576,1610,1577], [2342,2375,2357,2344,2366,2327,2352,2368], [1050,1080,1088,1080,1083,1080,1094,1072], [2476,2494,2434,2482,2494,32,47,32,2437,2488,2478,2496,2479,2492,2494], [20206,21517], [2583,2625,2608,2606,2625,2582,2624], [43415,43438], [54620,44544], [3108,3142,3122,3137,3095,3137], [2980,2990,3007,2996,3021], [3374,3378,3375,3390,3379,3330], [4121,4156,4116,4154,4121,4140], [3652,3607,3618], [7070,7077,7060,7082,7059], [3221,3240,3277,3240,3233], [2711,2753,2716,2736,2750,2724,2752], [3749,3762,3751], [2825,2852,2893,2837,2867], [4877,4821,4829], [3523,3538,3458,3524,3517], [1344,1377,1397,1400,1409], [6017,6098,6040,6082,6042], [917,955,955,951,957,953,954,972], [6674,6682,6664,6673], [1488,1500,1508,1489,1497,1514], [3926,3964,3921,3851], [4325,4304,4320,4311,4323,4314,4312], [41352,41760], [6190,6179,6185,6189,6179,6191], [11612,11593,11580,11593,11599,11568,11606], [1808,1834,1825,1821,1808], [1931,1960,1928,1964,1920,1960], [5123,5316,5251,5198,5200,5222], [5091,5043,5033], [55295, 7077]]");
                this.fontSize = 9;
                this.fontFace = "Verdana";
                this.extraHeigth = 15;
                this.results = []
            }
            LanguageDetector.prototype.begin = function() {
                var c, code, h, height, i, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, m, n, o, p, ref, ref1, ref2, ref3, round, s, w, width;
                round = 0;
                this.widths = [];
                this.heights = [];
                this.support = [];
                this.test_div = document.createElement("div");
                document.body.appendChild(this.test_div);
                this.test_div.id = "WritingTest";
                ref = this.codes;
                for ( let i = 0, len = ref.length; i < len; i++) {
                    code = ref[i];
                    this.height = [];
                    this.width = [];
                    this.div = document.createElement("div");
                    this.test_div.appendChild(this.div);
                    round += 1;
                    this.div.id = round;
                    this.div.style.display = "inline-block";
                    for ( let j = 0, len1 = code.length; j < len1; j++) {
                        c = code[j];
                        this.div.innerHTML = ("<font face = '" + this.fontFace + "' size = ") + this.fontSize + ">&#" + c + "</font>";
                        this.height.push(document.getElementById(round).clientHeight);
                        this.width.push(document.getElementById(round).clientWidth)
                    }
                    this.div.innerHTML = "";
                    for ( let k = 0, len2 = code.length; k < len2; k++) {
                        c = code[k];
                        this.div.innerHTML += ("<font face = '" + this.fontFace + "' size = ") + this.fontSize + ">&#" + c + "</font>"
                    }
                    this.test_div.innerHTML += this.height + ";" + this.width + "<br>";
                    this.heights.push(this.height);
                    this.widths.push(this.width)
                }
                this.tw = this.widths.pop();
                this.sw1 = this.tw[0];
                this.sw2 = this.tw[1];
                this.sh = this.heights.pop()[0];
                ref1 = this.heights;
                for ( let l = 0, len3 = ref1.length; l < len3; l++) {
                    height = ref1[l];
                    this.passed = 0;
                    for ( let m = 0, len4 = height.length; m < len4; m++) {
                        h = height[m];
                        if (h !== this.sh) {
                            this.support.push(true);
                            this.passed = 1;
                            break
                        }
                    }
                    if (this.passed === 0) {
                        this.support.push(false)
                    }
                }
                this.writing_scripts_index = 0;
                ref2 = this.widths;
                for ( let n = 0, len5 = ref2.length; n < len5; n++) {
                    width = ref2[n];
                    for ( let o = 0, len6 = width.length; o < len6; o++) {
                        w = width[o];
                        if (this.support[this.writing_scripts_index] === false) {
                            if (w !== this.sw1 && w !== this.sw2) {
                                this.support[this.writing_scripts_index] = true
                            }
                        }
                    }
                    this.writing_scripts_index += 1
                }
                this.res = [];
                this.writing_scripts_index = 0;
                ref3 = this.support;
                for ( let p = 0, len7 = ref3.length; p < len7; p++) {
                    s = ref3[p];
                    this.test_div.innerHTML += this.names[this.writing_scripts_index] + ": " + s + " <br>";
                    if (s === true) {
                        this.res.push(this.names[this.writing_scripts_index])
                    }
                    this.writing_scripts_index += 1
                }
                this.test_div.remove();
                return this.res
            };
            return LanguageDetector
        })();
        root.get_writing_scripts = function() {
            var detector;
            detector = new LanguageDetector;
            return sha1(JSON.stringify(this.res = detector.begin()))
        }
    } catch (e) {}
}).call(this);

