"use strict";
var ldb = window.localStorage;
var root = document.querySelector(':root').style;
var config = {
  "defaultMode": "dark",
  "colorAccent": "#FFCA00",
  "pages": ["projects", "contact", "home", "posts", "donate"]
};
var go = (path) => {
  history.replaceState('', "Hima-Pro", path);
};

setInterval(engine, 10);
function engine() {
  var page = new URL(location.href).searchParams.get("p");
  document.querySelectorAll(".main").forEach(box => {
    box.style.display = "none";
    if (config.pages.includes(page)) {
      document.querySelector("#" + page).style.display = "block";
    } else {
      if (page==null) {
      document.querySelector("#home").style.display = "block";
      } else {
      document.querySelector("#p404").style.display = "block";
      }
    }
  });
  document.querySelectorAll("header > nav > span").forEach(tab => {
    tab.classList.remove("active");
    if (config.pages.includes(page)) {
      document.querySelector("header > nav > ." + page).classList.add("active");
    } else if(page==null){
      document.querySelector("header > nav > .home").classList.add("active");
    }
  });
  var mode = ldb.getItem("mode");
  var theme = ldb.getItem("theme");
  if (theme != config.colorAccent && !theme) {
    ldb.setItem("theme", config.colorAccent);
  }
  if (!mode) {
    ldb.setItem("mode", config.defaultMode);
  }
  if (mode == "dark") {
    root.setProperty('--primary', '#313131');
    root.setProperty('--theme', theme);
    root.setProperty('--font', '#dddddd');
    root.setProperty('--secondary', '#3f3f3f');
    if(document.body.offsetWidth<=800){
      window.themeColor.setAttribute('content', '#3f3f3f');
    } else{
      window.themeColor.setAttribute('content', '#313131');
    }
  } else {
    root.setProperty('--primary', '#eeeeee');
    root.setProperty('--theme', theme);
    root.setProperty('--font', '#3f3f3f');
    root.setProperty('--secondary', '#ffffff');
    if(document.body.offsetWidth<=800){
      window.themeColor.setAttribute('content', '#efffff');
    } else{
      window.themeColor.setAttribute('content', '#eeeeee');
    }
  }
  window.modeSetting.value = mode;
}
function homeTab(tabName) {
  document.querySelectorAll(".home-tabs > .tab").forEach(box => {
    box.classList.remove("active");
      document.querySelector(".home-tabs > ." + tabName).classList.add("active");
  });
  document.querySelectorAll(".tab-contents > .tab-content").forEach(box => {
    box.style.display="none";
      document.querySelector(".tab-contents > ." + tabName).style.display="block";
  });
}
function full() {
  var doc = window.document;
  var docEl = doc.documentElement;
  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || pdoc.msExitFullscreen;
  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}
function mode() {
  var mode = ldb.getItem("mode");
  if (mode == "dark") {
    ldb.setItem("mode", "light");
  } else {
    ldb.setItem("mode", "dark");
  }
}

const inputElement = document.querySelector('.pickr');
const pickr = new Pickr({
  el: inputElement,
  useAsButton: false,
  default: ldb.getItem("theme") || '#0099FF',
  theme: 'monolith',
  swatches: ['#0099FF', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#00FFFF', '#FF5500', "#FFFF00"],
  position: 'top-middle',
  showAlways: false,
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      hsva: true,
      input: true,
      save: true
    }
  },
  i18n: {
    'btn:save': 'Apply'
  }
});
pickr.on('save', (color, pickr) => {
  var res = pickr.getRoot().interaction.result;
  config.colorAccent = res.value;
  ldb.setItem("theme", res.value);
});
pickr.getRoot().preview.lastColor.style.display = "none";
pickr.getRoot().preview.currentColor.style.width = "100%";