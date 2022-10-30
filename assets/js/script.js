"use strict";
var ldb = window.localStorage;
var root = document.querySelector(':root').style;
var config = {
  "colorAccent": "#0099ff",
  "defaultMode": "light",
  "support3d": "disable",
  "pages": ["projects", "contact", "home", "skills", "settings"]
};
var go = (path) => {
  history.replaceState('', "Hima-Pro", path);
};

function engine() {
  var mode = ldb.getItem("mode");
  var theme = ldb.getItem("theme");
  var support3d = ldb.getItem("support3d");
  var page = new URL(location.href).searchParams.get("p");
  var timer = setInterval(function() {
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
    document.querySelectorAll("header > nav > a").forEach(tab => {
      tab.classList.remove("active");
      if (config.pages.includes(page)) {
        document.querySelector("header > nav > ." + page).classList.add("active");
      } else if(page==null){
        document.querySelector("header > nav > .home").classList.add("active");
      }
    });
    if (theme != config.colorAccent && !theme) {
      ldb.setItem("theme", config.colorAccent);
    }
    if (!mode) {
      ldb.setItem("mode", config.defaultMode);
    }
    if (!support3d) {
      ldb.setItem("support3d", config.support3d);
    }
    if (mode == "dark") {
      root.setProperty('--bg', '#313131');
      root.setProperty('--theme', theme);
      root.setProperty('--font', '#dddddd');
      root.setProperty('--bg2', '#3f3f3f');
    } else {
      root.setProperty('--bg', '#eeeeee');
      root.setProperty('--theme', theme);
      root.setProperty('--font', '#3f3f3f');
      root.setProperty('--bg2', '#ffffff');
    }
    if (support3d == "disable") {
      root.setProperty('--shadow', "0 0 transparent");
    } else {
      root.setProperty('--shadow', "0 0 5px 1px #00000033 inset, 0 0 5px 1px #00000033;");
    }
    window.modeSetting.value = mode;
    window.mode3DSwitcher.value = support3d;
    clearInterval(timer);
    engine();
  }, 10);
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

function makeOffline() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
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
engine();