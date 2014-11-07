function mousePosition(ev){
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.body.scrollTop  - document.body.clientTop
    };
}

document.onmousemove = mouseMove;
 
function mouseMove(ev){
	ev = ev || window.event;
	var mousePos = mousePosition(ev);
}
