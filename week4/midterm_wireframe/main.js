const scroll = document.getElementById("image-scroll");

const mouseDown = e => {
	scroll.dataset.mouseDown = e.clientX;
}

const mouseUp = () => {
	scroll.dataset.mouseDown = "0";
	scroll.dataset.prevPercent = scroll.dataset.percentage;
}

const mouseMove = e => {
	if(scroll.dataset.mouseDown === "0") return;

	const mouseDelta = parseFloat(scroll.dataset.mouseDown) - e.clientX,
		maxDelta = window.innerWidth / 2;

	const percent = (mouseDelta / maxDelta) * 100;
	nextPercentMax = parseFloat(scroll.dataset.prevPercent) + percent, 
	nextPercent = Math.max(Math.min(nextPercentMax, 0), -100);

	scroll.dataset.percent = nextPercent;

	scroll.animate({
		transform: 'translate(${nextPercent}%, -50%)'
	}, {duration: 1200, fill: "forwards"});
}

//touch events
window.onmousedown = e => mouseDown(e);
window.ontouchstart = e => mouseDown(e.touches[0]);
window.onmouseup = e => mouseUp(e);
window.ontouchend = e => mouseUp(e.touches[0]);
window.onmousemove = e => mouseMove(e);
window.ontouchmove = e => mouseMove(e.touches[0]);