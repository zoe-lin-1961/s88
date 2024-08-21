let _jqueryM,_swiperBundleM,_bootstrapBundleM,_ionicons_ESM,_ionicons_NM,_popperM,_bootstrapM,_momentWithLocalesM
let makeJSCdn_LOCAL,makeJSCdn_CROS,makeJSCdn_ISMODULE,makeJSCdn_NOMODULE
// <script src="./js/mobile/jquery.min.js"></script>
// <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
//
// <!-- ionicon -->
// <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
//
// <script noModule="" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
//
// <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" crossOrigin="anonymous"></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" crossOrigin="anonymous"></script>
//
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.3/moment-with-locales.min.js" crossOrigin="anonymous" referrerpolicy="no-referrer"></script>

_jqueryM ="./js/jquery.min.js"
_swiperBundleM= "https://unpkg.com/swiper@11.1.5/swiper-bundle.min.js"
_bootstrapBundleM= "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
_ionicons_ESM= "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
_ionicons_NM= "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
_popperM= "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
_bootstrapM= "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
_momentWithLocalesM= "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.3/moment-with-locales.min.js"


_swiperBundleM= "./js/mobile/swiper-bundle.min.js"
_bootstrapBundleM= "./js/mobile/bootstrap.bundle.min.js"
_popperM="./js/mobile/popper.min.js"
_bootstrapM="./js/mobile/bootstrap.min.js"
_momentWithLocalesM="./js/mobile/moment-with-locales.min.js"
// _ionicons_ESM ="./js/mobile/ionicons.esm.js"
// _ionicons_NM="./js/mobile/ionicons.js"

makeJSCdn_LOCAL=[_jqueryM,_swiperBundleM,_bootstrapBundleM,_popperM,_bootstrapM,_momentWithLocalesM]


function lodCdn(){
    makeJSCdn_LOCAL.forEach((cdn)=>{
        if(!!cdn){
           document.write("<script src="+cdn+"></script>")
        }

    })
}

lodCdn();

// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossOrigin="anonymous" referrerpolicy="no-referrer"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js" integrity="sha512-37T7leoNS06R80c8Ulq7cdCDU5MNQBwlYoy1TX/WUsLFC2eYNqtKlV0QjH7r8JpG/S0GUMZwebnVFLPd6SU5yg==" crossOrigin="anonymous" referrerpolicy="no-referrer"></script>
// <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossOrigin="anonymous"></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossOrigin="anonymous"></script>
// <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
// <script src="./js/mobile/crypto.js"></script>


// <script src="js/jquery-1.11.3.min.js"></script>