const magnify = '.mfp-bg{background:#0b0b0b;filter:alpha(opacity=80);opacity:.8;overflow:hidden;z-index:502}.mfp-bg,.mfp-wrap{height:100%;left:0;position:fixed;top:0;width:100%}.mfp-wrap{-webkit-backface-visibility:hidden;outline:none!important;z-index:503}.mfp-container{box-sizing:border-box;height:100%;left:0;padding:0 8px;position:absolute;text-align:center;top:0;width:100%}.mfp-container:before{content:"";display:inline-block;height:100%;vertical-align:middle}.mfp-align-top .mfp-container:before{display:none}.mfp-content{display:inline-block;margin:0 auto;position:relative;text-align:left;vertical-align:middle;z-index:505}.mfp-ajax-holder .mfp-content,.mfp-inline-holder .mfp-content{cursor:auto;width:100%}.mfp-ajax-cur{cursor:progress}.mfp-zoom-out-cur,.mfp-zoom-out-cur .mfp-image-holder .mfp-close{cursor:zoom-out}.mfp-zoom{cursor:pointer;cursor:zoom-in}.mfp-auto-cursor .mfp-content{cursor:auto}.mfp-arrow,.mfp-close,.mfp-counter,.mfp-preloader{-webkit-user-select:none;-moz-user-select:none;user-select:none}.mfp-loading.mfp-figure{display:none}.mfp-hide{display:none!important}.mfp-preloader{color:#ccc;left:8px;margin-top:-.8em;position:absolute;right:8px;text-align:center;top:50%;width:auto;z-index:504}.mfp-preloader a{color:#ccc}.mfp-preloader a:hover{color:#fff}.mfp-s-error .mfp-content,.mfp-s-ready .mfp-preloader{display:none}button.mfp-arrow,button.mfp-close{-webkit-appearance:none;background:transparent;border:0;cursor:pointer;display:block;overflow:visible;padding:0;z-index:506}button::-moz-focus-inner{border:0;padding:0}.mfp-close{color:#fff;font-family:Arial,Baskerville,monospace;font-size:28px;font-style:normal;height:44px;line-height:44px;opacity:.65;padding:0 0 18px 10px;position:absolute;right:0;text-align:center;text-decoration:none;top:0;width:44px}.mfp-close:focus,.mfp-close:hover{opacity:1}.mfp-close:active{top:1px}.mfp-close-btn-in .mfp-close{color:#333}.mfp-iframe-holder .mfp-close,.mfp-image-holder .mfp-close{color:#fff;padding-right:6px;right:-6px;text-align:right;width:100%}.mfp-counter{color:#ccc;font-size:12px;line-height:18px;position:absolute;right:0;top:0}.mfp-arrow{-webkit-tap-highlight-color:rgba(0,0,0,0);height:110px;margin:-55px 0 0;opacity:.65;padding:0;position:absolute;top:0;top:50%;width:90px}.mfp-arrow:active{margin-top:-54px}.mfp-arrow:focus,.mfp-arrow:hover{opacity:1}.mfp-arrow .mfp-a,.mfp-arrow .mfp-b,.mfp-arrow:after,.mfp-arrow:before{border:solid transparent;content:"";display:block;height:0;left:0;margin-left:35px;margin-top:35px;position:absolute;top:0;width:0}.mfp-arrow .mfp-a,.mfp-arrow:after{border-bottom-width:12px;border-top-width:12px;opacity:.8;top:8px}.mfp-arrow .mfp-b,.mfp-arrow:before{border-bottom-width:20px;border-top-width:20px}.mfp-arrow-left{left:0}.mfp-arrow-left .mfp-a,.mfp-arrow-left:after{border-right:12px solid #000;left:5px}.mfp-arrow-left .mfp-b,.mfp-arrow-left:before{border-right:20px solid #fff}.mfp-arrow-right{right:0}.mfp-arrow-right .mfp-a,.mfp-arrow-right:after{border-left:12px solid #000;left:3px}.mfp-arrow-right .mfp-b,.mfp-arrow-right:before{border-left:20px solid #fff}.mfp-iframe-holder{padding-bottom:40px;padding-top:40px}.mfp-iframe-holder .mfp-content{line-height:0;max-width:900px;width:100%}.mfp-iframe-scaler{height:0;overflow:hidden;padding-top:56.25%;width:100%}.mfp-iframe-scaler iframe{background:#000;box-shadow:0 0 8px rgba(0,0,0,.6);height:100%;left:0;position:absolute;top:-3px;width:100%}.mfp-iframe-holder .mfp-close{top:-43px}img.mfp-img{box-sizing:border-box;line-height:0;margin:0 auto;max-width:100%;padding:40px 0}.mfp-figure:after,img.mfp-img{display:block;height:auto;width:auto}.mfp-figure:after{bottom:40px;box-shadow:0 0 8px rgba(0,0,0,.6);content:"";left:0;position:absolute;right:0;top:40px;z-index:-1}.mfp-figure{line-height:0}.mfp-bottom-bar{cursor:auto;left:0;margin-top:-36px;position:absolute;top:100%;width:100%}.mfp-title{color:#f3f3f3;line-height:18px;padding-right:36px;text-align:left;word-break:break-word}.mfp-figure small{color:#bdbdbd;display:block;font-size:12px;line-height:14px}.mfp-image-holder .mfp-content{max-width:100%}.mfp-gallery .mfp-image-holder .mfp-figure{cursor:pointer}@media screen and (max-height:300px),screen and (max-width:800px) and (orientation:landscape){.mfp-img-mobile .mfp-image-holder{padding-left:0;padding-right:0}.mfp-img-mobile img.mfp-img{padding:0}.mfp-img-mobile .mfp-figure:after{bottom:0;top:0}.mfp-img-mobile .mfp-bottom-bar{background:rgba(0,0,0,.6);bottom:0;box-sizing:border-box;margin:0;padding:3px 5px;position:fixed;top:auto}.mfp-img-mobile .mfp-bottom-bar:empty{padding:0}.mfp-img-mobile .mfp-counter{right:5px;top:3px}.mfp-img-mobile .mfp-close{background:rgba(0,0,0,.6);height:35px;line-height:35px;padding:0;position:fixed;right:0;text-align:center;top:0;width:35px}.mfp-img-mobile .mfp-figure small{display:inline;margin-left:5px}}@media (max-width:800px){.mfp-arrow{transform:scale(.75)}.mfp-arrow-left{transform-origin:0}.mfp-arrow-right{transform-origin:100%}.mfp-container{padding-left:6px;padding-right:6px}}.mfp-ie7 .mfp-img{padding:0}.mfp-ie7 .mfp-bottom-bar{left:50%;margin-left:-300px;margin-top:5px;padding-bottom:5px;width:600px}.mfp-ie7 .mfp-container{padding:0}.mfp-ie7 .mfp-content{padding-top:44px}.mfp-ie7 .mfp-close{padding-top:0;right:0;top:0}';
export {
  magnify as default
};
//# sourceMappingURL=entry-styles-10.mjs-0abee7f4.js.map