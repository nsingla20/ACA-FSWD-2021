var txt = "Loading...";
var i = 0;
var load;
var ifload = false;
function loadn() {
    ifload = true;
    load.innerHTML = "Loading...";
}
function unload() {
    load.innerHTML = "";
    ifload = false;
}
var bad;
var main;
var img;
window.onload = function () {
    bad = document.getElementById("backVid");
    load = document.getElementById("loading");
    if (screen.availWidth <= 768) {
        bad.remove();
    } else {
        bad.onprogress = loadn;
        bad.onplaying = unload;
    }
    
};
