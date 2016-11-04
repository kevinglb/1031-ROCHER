(function(doc, win) {
    var docEl = doc.documentElement,
        resizee = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
    		docEl.style.fontSize = 12*(clientWidth / 375) + 'px';
   		};
    if (!doc.addEventListener) return;
    win.addEventListener(resizee, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

if( self == top ){document.documentElement.style.display = 'block';} else {document.documentElement.style.display="none";top.location = self.location;}

function detectSwipe(ele,dis,func){
	if(!ele){ele = document;}
	ele.addEventListener('touchstart', handleTouchStart, false); 
	ele.addEventListener('touchmove', handleTouchMove, false);
	ele.addEventListener('touchend', handleTouchEnd, false);

	var xStart = null, 	
		yStart = null,
		xEnd = null,
    	yEnd = null,
	    xDiff = 0,
	    yDiff = 0;

	var dir = "";
	var touchMoved = false;
	var diff = dis || 60;

	function handleTouchStart(e){                                         
		xStart = e.touches[0].clientX;                                      
		yStart = e.touches[0].clientY;                                      
	};                                                
	function handleTouchMove(e){
		e.preventDefault();
		xEnd = e.touches[0].clientX,                                  
		yEnd = e.touches[0].clientY;
		//the click event will be called with touchstart and touchend, we need to detect whether the touch has moved
		touchMoved = true;
	}

	function handleTouchEnd(e){
		if(touchMoved == false){
			return;
		}
		xDiff = xStart - xEnd,
		yDiff = yStart - yEnd;

		if (Math.abs(xDiff) > Math.abs(yDiff) ) {/*most significant*/
			if(xDiff > 0 && xDiff > diff) {
   				dir = "left";
			}else if(xDiff < 0 && Math.abs(xDiff) > diff){
    			dir = "right";
			}else{
				return;
			}                       
		}else{
			if(yDiff > 0 && yDiff > diff) {
    			dir = "up";
			}else if(yDiff < 0 && Math.abs(yDiff) > diff){ 
  	  			dir = "down";
        	}else{
        		return;
        	}
		}

		if(dir !== ""){
			if(typeof func === 'function'){
				func(dir);
			}
		}
		xStart = null;
		yStart = null;
		xEnd = null;
		yEnd = null;  
		touchMoved = false;                                           
	};
}
			