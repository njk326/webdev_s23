	const scroll = document.getElementById("image-scroll");

	//get cursor location on mouse click
	const mouseDown = e => {
		scroll.dataset.mouseDown = e.clientX;
	}

	//reset cursor position on mouse release
	const mouseUp = () => {
		scroll.dataset.mouseDown = "0";
		scroll.dataset.prevPercent = scroll.dataset.percent;
	}

	const mouseMove = e => {
		// if mouse is not clicked, ignore mouse movement
		if(scroll.dataset.mouseDown === "0") return;
		
		//get mouse movement as a percent of the total screen width
		const mouseDelta = parseFloat(scroll.dataset.mouseDown) - e.clientX,
			maxDelta = window.innerWidth / 2;

		const percent = (mouseDelta / maxDelta) * -100,
			nextPercentMax = parseFloat(scroll.dataset.prevPercent) + percent, 
			nextPercent = Math.max(Math.min(nextPercentMax, 0), -100);

		//remember scroll position
		scroll.dataset.percent = nextPercent;

		scroll.animate({
			transform: `translate(${nextPercent}%, -50%)`
		}, {duration: 1200, fill: "forwards"});
		
		//parallax effect
		for(const image of scroll.getElementsByClassName("image")) {
			image.animate({
			  objectPosition: `${100 + nextPercent}% center`
			}, { duration: 100, fill: "forwards" });
		}
	}

	//touch events
	window.onmousedown = e => mouseDown(e);
	window.ontouchstart = e => mouseDown(e.touches[0]);
	window.onmouseup = e => mouseUp(e);
	window.ontouchend = e => mouseUp(e.touches[0]);
	window.onmousemove = e => mouseMove(e);
	window.ontouchmove = e => mouseMove(e.touches[0]);