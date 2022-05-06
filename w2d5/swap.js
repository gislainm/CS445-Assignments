"use strict";
/*eslint-disable */
window.onload = function () {
    let swap = document.getElementById("swapbtn");
    swap.onclick = swapImage;
}
let counter = 0
function swapImage() {
    let imgRight = document.getElementById("img1");
    let imgLeft = document.getElementById("img2");
    if (counter === 0) {
        imgRight.src = "../left-image.jpg";
        imgLeft.src = "../right-image.jpg"
        counter += 1;
    } else {
        imgRight.src = "../right-image.jpg";
        imgLeft.src = "../left-image.jpg";
        counter = 0;
    }

}