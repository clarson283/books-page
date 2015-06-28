

var i = 0;

var slides = new Array();

slides[0] = "images/books-one.jpg";
slides[1] = "images/books-two.jpg";
slides[2] = "images/books-three.jpg";

var slide_Length = slides.length - 1;

function slideshow() {
	document.image.src = slides[i];
	if  (i < slide_Length) {
		i++
	} else {
		i = 0;
	};
	setTimeout("slideshow()", 20000);
}

window.onload = slideshow;



