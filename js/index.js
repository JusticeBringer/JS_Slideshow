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
		
	}, 3000);

	
}

function displayPosts(){

}

window.onload = function(){
	getPosts();

	setTimeout(function(){
		displayPosts();
	}, 3010);
}