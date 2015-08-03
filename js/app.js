
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
		var titleHead = document.createElement("div");
			titleHead.id = "allTitles";
		var newDiv = document.createElement("div");
			newDiv.id = "allBooks";
		var publishDate = document.createElement("div");
		$('#bestSellerResults').append(titleHead);
		//document.getElementById('bestSellerResults').appendChild(newDiv);
		//$('#bestSellerResults').append(newDiv);
		$('#bestSellerResults').append(publishDate);
		console.log(bestSellers);

		publishDate.innerHTML = bestSellers.results.bestsellers_date;

		titleHead.innerHTML += "<ul>";
		for (var i = 0; i < bestSellers.results.lists.length; i++) {
			titleHead.innerHTML += "<li><a href='#' data-index='" + i + "'>" + bestSellers.results.lists[i].display_name + "</a></li>";
		};
		$("#bestSellerResults li").addClass("col-md-3");
		titleHead.innerHTML += "</ul>";//this one closes right after first ul tag-- issue!!


		$("#allTitles a").click(function (event) {
			var beachBall = event.target.getAttribute("data-index");
			console.log($(event.target.parentElement).children().length);
			if ($("#allBooks").length === 0) {
				event.preventDefault();
				console.log(event.target);
				event.target.parentElement.appendChild(newDiv);	
				for (var j = 0; j < bestSellers.results.lists[beachBall].books.length; j++) {	
					newDiv.innerHTML += bestSellers.results.lists[beachBall].books[j].title + "<br>";
				}
			} else if ($(event.target.parentElement).children().length > 1) {
				//alert("same");
				event.preventDefault();
				newDiv.innerHTML = "";
				$(newDiv).toggle();
			} else {
				//alert("else");
				event.preventDefault();
				newDiv.innerHTML = "";
				$("#allBooks").remove();
				console.log(event.target);
				$(newDiv).toggle();	
				event.target.parentElement.appendChild(newDiv);	
				for (var j = 0; j < bestSellers.results.lists[beachBall].books.length; j++) {	
					newDiv.innerHTML += bestSellers.results.lists[beachBall].books[j].title + "<br>";
				}
			}

		})
	});


}

/*
var gUrl = function () {
	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/books/v1/volumes?q=galaxy+inauthor:adams&key=AIzaSyA_G9RIwihluQqZzkKoBgDd9oOoa_urP64',
		dataType: 'jsonp',
	})
	.done(console.log())
}*/


function submitDropdown() {
	var monthSection = $("#monthSection option:selected").val();
	var daySection = $("#daySection option:selected").val();
	var yearSection = $("#yearSection option:selected").val();
	
	if (monthSection >= 1) {
		bestSellers(yearSection + "-" + monthSection + "-" + daySection);
	} else {
		alert("Null")
	}

}


var gRapi = function (title) {
	$.ajax({
		type: 'GET',
		url: 'https://goodreads.com/book/title.jsonp?Jane+Austen&key=7zvk1HpU3FrIyFNTzkEzHw&title=' + title,
		dataType: 'jsonp'
	})
	.done(function(response) {
		alert("hi");
		//$("#goodReads").append(results.book.title);
		//resp = response.GoodreadsResponse.title;
		console.log(response);
		$("#goodReads").html(response.reviews_widget);
	});
}

gRapi('Emma');





