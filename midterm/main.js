//detect if device is mobile or not
function isMobile() {
	return window.innerWidth <= 768;
}

//mobile scrolling script
if (isMobile()) {
	const scroll = document.getElementById("image-scroll");
	const background = document.getElementById("background");

	//get touch location
	const pointStart = a => {
		scroll.dataset.pointStart = a.clientX;
	}

	//reset touch position on release
	const pointEnd = () => {
	scroll.dataset.pointStart = "0";
	scroll.dataset.prevPercent = scroll.dataset.percent;
  	}

	//touch tracking
	const pointMove = a => {
	// if cursor is not active ignore movement
	if(scroll.dataset.pointStart === "0") return;
	
	//get cursor movement as a percent of the total screen width
	const pointDelta = parseFloat(scroll.dataset.pointStart) - a.clientX;
	const maxDelta = window.innerWidth / 2;

	const percent = (pointDelta / maxDelta) * -100,
		nextPercentMax = parseFloat(scroll.dataset.prevPercent) + percent, 
		nextPercent = Math.max(Math.min(nextPercentMax, 0), -100);

	scroll.dataset.percent = nextPercent;
	
	//scroll and parallax effect
	scroll.animate({
		transform: `translate(${nextPercent}%, -50%)`
	}, {duration: 1200, fill: "forwards"});
	
	for(const image of scroll.getElementsByClassName("image")) {
		image.animate({
			objectPosition: `${100 + nextPercent}% center`
		}, { duration: 200, fill: "forwards" });
	}
	//cursor event listeners
	document.body.addEventListener("pointerdown", pointStart);
	document.body.addEventListener("pointerup", pointEnd);
	document.body.addEventListener("pointermove", pointMove);
	}
	
//desktop scrolling script
} else {
	const scroll = document.getElementById("image-scroll");
	const background = document.getElementById("background");

	//get cursor location on cursor click
	const pointStart = a => {
		scroll.dataset.pointStart = a.clientX;
	}

	//reset cursor position on cursor release
	const pointEnd = () => {
		scroll.dataset.pointStart = "0";
		scroll.dataset.prevPercent = scroll.dataset.percent;
	}

	//cursor tracking function
	const pointMove = a => {
	// if cursor is not active ignore movement
	if(scroll.dataset.pointStart === "0") return;
	
	//get cursor movement as a percent of the total screen width
	const pointDelta = parseFloat(scroll.dataset.pointStart) - a.clientX;
	const maxDelta = window.innerWidth / 2;

	const percent = (pointDelta / maxDelta) * -100,
		nextPercentMax = parseFloat(scroll.dataset.prevPercent) + percent, 
		nextPercent = Math.max(Math.min(nextPercentMax, 0), -100);

	scroll.dataset.percent = nextPercent;
	
	//scroll and parallax effect
	scroll.animate({
		transform: `translate(${nextPercent}%, -50%)`
	}, {duration: 1200, fill: "forwards"});
	
	for(const image of scroll.getElementsByClassName("image")) {
		image.animate({
			objectPosition: `${100 + nextPercent}% center`
		}, { duration: 200, fill: "forwards" });
	}
	//cursor event listeners
	document.body.addEventListener("pointerdown", pointStart);
	document.body.addEventListener("pointerup", pointEnd);
	document.body.addEventListener("pointermove", pointMove);
	}
}
