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

myBlurFunctionTwo = function(state) {
	/* state can be 1 or 0 */
	var containerElement = document.getElementById('allContent');
	var overlayEle = document.getElementById('overlayTwo');

	if (state) {
		overlayEle.style.display = 'block';
		containerElement.setAttribute('class', 'blur');
	} else {
		overlayEle.style.display = 'none';
		containerElement.setAttribute('class', null);
	}
};

function clearContent(){
	var pTitle = document.getElementById("post-title");
	var pImage = document.getElementById("post-image");
	var pContent = document.getElementById("post-content");
	var pDate = document.getElementById("post-date");
	var readMore = document.getElementById("read-more");
	

	pTitle.innerText = pImage.src = pContent.innerHTML = pContent.innerText = pDate.innerText = readMore.innerText = "";
}

async function getPosts(myUrl="https://wptavern.com/wp-json/wp/v2/posts"){
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
	
	xhr.open('GET', myUrl, true);
	xhr.send(data);
}

var DATAPOSTS = [];

function compare(a, b){
 // Use toUpperCase() to ignore character casing
  const bandA = a.date.toUpperCase();
  const bandB = b.date.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  //invert return value by multiplying by -1
  return comparison * -1;
}

function sortDescending(){
	DATAPOSTS = DATAPOSTS.sort(compare);
}

async function extractPost(data){
	var posts = data;
	DATAPOSTS = [];

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
			obj.link = posts[i].link;
			obj.imageLink = posts[i].jetpack_featured_media_url;

			DATAPOSTS.push(obj);			
		}
		
		console.log("Now");
		console.log(DATAPOSTS);

		sortDescending();

		elem = document.getElementById("thePost");
		elem.style.marginBottom = "7vw";
		
	}, 1000);
}

var currentSlide = 0;
var timerSlide = 5000;
var autoSlide = setInterval(frameInterval, timerSlide, currentSlide);
function frameInterval(){
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

function prevSlide(){
	if((currentSlide - 1) < 0){
		currentSlide = DATAPOSTS.length - 1;
	}
	else{
		currentSlide -= 1;
	}

	timerSlide += 5000;

	if(timerSlide > 19000)
		timerSlide = 5000;

	displayPosts();
}

function nextSlide(){
	if((currentSlide + 1) === DATAPOSTS.length){
		currentSlide = 0;
	}
	else{
		currentSlide += 1;
	}

	timerSlide += 5000;

	if(timerSlide > 19000)
		timerSlide = 5000;

	displayPosts();
}

function move() {
	var elem = document.getElementById("myBar");
	var wrapper = document.getElementById("hide-content");
	wrapper.style.display = "block";
	
	var width = 0;
	var id = setInterval(frameLoad, 30);
	function frameLoad() {
	  if (width == 100) {
		clearInterval(id);
		wrapper.style.display = "none";
	  } else {
		width++; 
		elem.style.width = width + '%'; 
	  }
	}
}

document.onkeydown = checkKey;

function checkKey(e) {

	e = e || window.event;

    if (e.keyCode == '37') {
	   // left arrow
	   prevSlide();
    }
    else if (e.keyCode == '39') {
	   // right arrow
	   nextSlide();
    }
}

function refreshContent(){
	clearContent();
	move();

	currentSlide = 0;
	timerSlide = 5000;
	clearInterval(autoSlide);
	autoSlide = setInterval(frameInterval, timerSlide, currentSlide);

	var inpLink = document.getElementById("postSiteLink").value;
	getPosts(inpLink);
}

window.onload = function(){
	move();
	getPosts();

	document.addEventListener('touchstart', handleTouchStart, false);        
	document.addEventListener('touchmove', handleTouchMove, false);

	var xDown = null;                                                        
	var yDown = null;

	function getTouches(evt) {
		return evt.touches ||             // browser API
			evt.originalEvent.touches; // jQuery
	}                                                     

	function handleTouchStart(evt) {
		const firstTouch = getTouches(evt)[0];                                      
		xDown = firstTouch.clientX;                                      
		yDown = firstTouch.clientY;                                      
	};                                                

	function handleTouchMove(evt) {
		if ( ! xDown || ! yDown ) {
			return;
		}

		var xUp = evt.touches[0].clientX;                                    
		var yUp = evt.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 0 ) {
				prevSlide();
			} else {
				nextSlide();
			}                       
		} else {
			if ( yDiff > 0 ) {
				/* up swipe */ 
			} else { 
				/* down swipe */
			}                                                                 
		}
		/* reset values */
		xDown = null;
		yDown = null;                                             
	};
}