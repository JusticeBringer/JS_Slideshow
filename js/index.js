myBlurFunction = function(state) {
    /* state can be 1 or 0 */
    var containerElement = document.getElementById('allContent');
    var overlayEle = document.getElementById('overlay');

    if (state) {
        overlayEle.style.display = 'block';
        containerElement.setAttribute('class', 'blur');
    } else {
        overlayEle.style.display = 'none';
        containerElement.setAttribute('class', null);
    }
};

function openMail(){
	window.location.href = "mailto:gabriel.univ208@gmail.com";
}

async function getPosts(){
	var xhr = new XMLHttpRequest();
	// we defined the xhr
	var data;

	xhr.onreadystatechange = function () {
		if (this.readyState != 4) return;
	
		if (this.status == 200) {
			data = JSON.parse(this.responseText);
			
			extractPost(data);
		}
	};

	var myUrl = "https://wptavern.com/wp-json/wp/v2/posts";
	
	xhr.open('GET', myUrl, true);
	xhr.send(data);
}

var DATAPOSTS = []

async function extractPost(data){
	var posts = data;

	setTimeout(function(){
		console.log(posts);

		for(let i = 0; i < posts.length; i++){
			console.log(posts[i]);

			let obj = {
				"id" : 1,
				"title": "first",
				"content": "content here",
				"date": "20-08-09",
				"link": "https",
				"imageLink": ""
			}

			obj.id = posts[i].id;
			obj.title = posts[i].title.rendered;
			obj.content = posts[i].content.rendered;
			obj.date = posts[i].date;
			obj.link = posts[i]._links.self[0].href;
			obj.imageLink = posts[i].jetpack_featured_media_url;

			DATAPOSTS.push(obj);			
		}
		
		console.log("Now");
		console.log(DATAPOSTS);

		var elem = document.getElementById("hide-content");
		elem.style.display = "none";
		
	}, 3000);

	
}

var currentSlide = 0;
var autoSlide = setInterval(frame, 5000, currentSlide);
function frame(){
	if((currentSlide + 1) === DATAPOSTS.length){
		currentSlide = 0;
	}
	else{
		currentSlide += 1;
	}

	displayPosts();
}

function trimContent(content){
	var newText = "";
	for(let i = 0; i < content.length && i < 300; i++){
		newText += content[i];
	}

	newText += "... ";

	return newText;
}

function displayPosts(){
	var pTitle = document.getElementById("post-title");
	var pImage = document.getElementById("post-image");
	var pImageOriginalLink = document.getElementById("post-image-link-original");
	var pContent = document.getElementById("post-content");
	var pDate = document.getElementById("post-date");
	var readMore = document.getElementById("read-more");
	

	pTitle.innerText = DATAPOSTS[currentSlide].title;
	pImage.src = DATAPOSTS[currentSlide].imageLink;
	pContent.innerHTML = DATAPOSTS[currentSlide].content;
	pContent.innerText = trimContent(pContent.innerText);
	pDate.innerText = "Article written on " + DATAPOSTS[currentSlide].date;

	pTitle.setAttribute("href", DATAPOSTS[currentSlide].link);
	pImageOriginalLink.setAttribute("href", DATAPOSTS[currentSlide].link);

	pImage.classList.add("post-image");

	readMore.setAttribute("href", DATAPOSTS[currentSlide].link);
	readMore.innerText = "Read more";
}

function move() {
	var elem = document.getElementById("myBar");   
	var width = 0;
	var id = setInterval(frame, 40);
	function frame() {
	  if (width == 100) {
		clearInterval(id);
	  } else {
		width++; 
		elem.style.width = width + '%'; 
	  }
	}
  }

window.onload = function(){
	move();
	getPosts();

	setTimeout(function(){
	}, 4010);
}