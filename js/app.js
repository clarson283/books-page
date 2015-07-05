
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

function getYearDropdown (year) {
    var year = document.getElementById("year");
    var thisYear = new Date().getFullYear();
    var minYear = thisYear - 7;
    
    for(var i = thisYear; i >= minYear; i--) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        year.appendChild(option);
   
    }
}

getYearDropdown(year);



var bestSellers = function (datePicked) {
	$.ajax({
		type: 'GET',
		url: 'http://api.nytimes.com/svc/books/v3/lists/overview/.jsonp?callback=booksList&published_date=' + datePicked + '&api-key=ddaa9f57137bd7d9c261b9c191a22586:8:72425285',
		dataType: 'jsonp', //jsonp works!!
	})
	.done(function(bestSellers) {
		//for (var i = 0; i <= 20; i++) {
			//var results = document.getElementById("bestSellerResults");
			var newDiv = document.createElement("div");
			var publishDate = document.createElement("div")
			$('#bestSellerResults').append(newDiv);//should work by just using 'results'.. work on this
			$('#bestSellerResults').append(publishDate);
			console.log(bestSellers);

			publishDate.innerHTML = bestSellers.results.bestsellers_date;

			for (var i = 0; i <= 14; i++) {
				for (var j = 0; j <= 4; j++) {
					newDiv.innerHTML = bestSellers.results.lists[i].books[j].title;
				}
			}
		//}
	});


}

bestSellers('2010-08-01');



