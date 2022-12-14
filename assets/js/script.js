"use strict";
var ldb = window.localStorage;
var root = document.querySelector(':root').style;
var config = {
  "defaultMode": "dark",
  "colorAccent": "#0099ff",
  "pages": ["experience", "contact", "home", "posts", "donate", "settings", "postSection"]
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
      } else if(page.length===19){
        makePost(page);
        var postVisibility=document.querySelector("#postSection").style;
        if (postVisibility.display!="block") {
          postVisibility.display="block";
        }

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
      window.themeColor.setAttribute('content', '#ffffff');
    } else{
      window.themeColor.setAttribute('content', '#eeeeee');
    }
  }
  window.modeSetting.value = mode;
  var divs = document.querySelectorAll(".checkMy > *");
  for ( var index = 0; index < divs.length; index++ ) {
    if( checkRtl( divs[index].innerHTML ) ) {
      divs[index].classList.add('rtl');
    } else{
      divs[index].classList.add('ltr');
    }
  }
}
function homeTab(tabName, container, display) {
  document.querySelectorAll(`${container} .tabs > .tab`).forEach(box => {
    box.classList.remove("active");
      document.querySelector(`${container} .tabs > .${tabName}`).classList.add("active");
  });
  document.querySelectorAll(`${container} .tab-contents > .tab-content`).forEach(box => {
    box.style.display="none";
      document.querySelector(`${container} .tab-contents > .${tabName}`).style.display=display||"block";
  });
}
function full() {
  var doc = window.document;
  var docEl = doc.documentElement;
  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
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

var ghRepos=fetch("https://api.github.com/users/Hima-Pro/repos")
.then(repos=>repos.json())
.then(repos=>{
  repos.forEach(repo=>{
    if(!repo.private && !repo.fork){
      document.querySelector(".tab-content.projects").innerHTML+=(`
        <div class="repo checkMy">
          <img src="https://opengraph.githubassets.com/${repo.updated_at}/${repo.owner.login}/${repo.name}">
            <a href="${repo.html_url}" target="_blank">
            <h4><i class="fad fa-link-simple"></i> ${repo.name}</h4>
          </a>
          ${repo.description?"<p>"+repo.description+"</p>":""}
        </div>
      `);
    }
  });
});

var bloggers=fetch("https://tdim-blogger.vercel.app/posts")
.then(res=>res.json())
.then(posts=>{
  posts.entry.forEach(post=>{
    document.querySelector("#posts > .postGrid").innerHTML+=`
    <div class="post checkMy">
      <img width="100%" src="${post.thumbnail}">
      <a href="?p=${post.id}"><h4>${post.title}</h4></a>
      <p class="postFooter">
        <span>${((tags)=>{
          var tagsHTML="";
          if (tags.length>2) {
          tagsHTML=`
            <button>${tags[0]}</button>
            <button>${tags[1]}</button>`;
          } else {
            tags.forEach(tag=>{
              tagsHTML+=`<button>${tag}</button>`;
            });
          }
          return tagsHTML;
        })(post.label)}</span>
        <span>${post.updated}</span>
      </p>
    </div>
    `;
  });
});

function makePost(postId){
  if (!window.postCreated) {
    var postMaker=fetch("https://tdim-blogger.vercel.app/posts/"+postId)
    .then(res=>res.json())
    .then(post=>{
      document.querySelector("#postSection").innerHTML=`
      <div class="postSection checkMy">
        <a onclick="go(\"?p=${post.id}\")"><h4><i class="fad fa-rss"></i> ${post.title}</h4></a><hr><br>
        <div class="postContent">${post.content}</div>
        <span class="tags">${((tags)=>{
          var tagsHTML="";
          tags.forEach(tag=>{
            tagsHTML+=`<button>${tag}</button>`;
          });
          return tagsHTML;
        })(post.label)}</span>
        <hr>
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0" nonce="7Sgrdvk1"></script>
        <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#tdim-blogger-${post.id}" data-width="" data-numposts="10"></div>
      </div>`;
    });
    window.postCreated=true;
  }
}

function checkRtl(character) {
  var arabic = /[\u0600-\u06FF]/;
  return arabic.test(character);
}