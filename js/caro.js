define(['jquery'], function($) {
	
	function newCaro (caroProps, element) {
		
		this.setProps(caroProps);
		
		this.anchorNode = element;
		
		//container Node.
		this.domNode = $("<div></div>");
		this.domNode.addClass("container");
		
		//controls node
		this.controlsNode = $("<div></div>");
		this.controlsNode.addClass("controls");
		
		//buttons
		this.populateBtn = $("<button></button>");
		this.populateBtn.addClass("populate");
		this.populateBtn.text("Populate");
		
		this.clearBtn = $("<button></button>");
		this.clearBtn.addClass("clear");
		this.clearBtn.text("Clear");
		
		this.controlsNode.append(this.populateBtn);
		this.controlsNode.append(this.clearBtn);
		
		//carousel node
		this.caroNode = $("<div></div>");
		this.caroNode.addClass("caroNode");
		
		//carousel buttons
		this.backBtn = $("<button></button>");
		this.backBtn.addClass("back");
		this.backBtn.text("Back");
		
		this.nextBtn = $("<button></button>");
		this.nextBtn.addClass("next");
		this.nextBtn.text("Next");
		
		//items containter
		this.itemsContainer = $("<div></div>");
		this.itemsContainer.addClass("itemsContainer inlineShown");
		
		//empty state div
		this.emptyDiv = $("<div></div>");
		this.emptyDiv.text("Currently empty");
		this.emptyDiv.addClass("emptyDiv");
		
		//caro items container
		this.caroItems = $("<div></div>");
		this.caroItems.addClass("caroItems");
		
		//Add the items together
		this.itemsContainer.append(this.emptyDiv);
		this.itemsContainer.append(this.caroItems);
		
		this.caroNode.append(this.backBtn);
		this.caroNode.append(this.itemsContainer);
		this.caroNode.append(this.nextBtn);
		
		this.domNode.append(this.controlsNode);
		this.domNode.append(this.caroNode);
		
		this.populate();
		this.connectBtns();
		
		this.anchorNode.append(this.domNode);
		
		this.setContainerWidth();
	};
	
	newCaro.prototype.setProps = function(props) {
		
		this.itemsHeld = props.items;
		this.shownNum = props.shownNum;
	};
	
	newCaro.prototype.populate = function() {
		var firstReal;
		var firstClone;
		var itemWidth = 0;
		
		this.emptyDiv.addClass("hidden");
		
		for(var i = 0; i < this.itemsHeld.length; i++) {
			var clone;
			var newSquare = $("<div></div>");
			var textNode = this.createNewText(this.itemsHeld[i]);
			newSquare.addClass("caroItem");
			//newSquare.attr("clickedNum", 0);
			newSquare.attr("index", i);
			newSquare.append(textNode);
			
			if(i === 0) {
				firstReal = newSquare;
				firstClone = newSquare.clone();
				this.caroItems.append(firstClone);
				newSquare.addClass("inlineShown real");
				firstClone.addClass("hidden clone");
				itemWidth = newSquare.outerWidth(true);
			} else if(i < this.shownNum) {
				clone = newSquare.clone();
				this.caroItems.append(clone);
				newSquare.addClass("inlineShown real");
				clone.addClass("hidden clone");
				
			} else if(this.itemsHeld.length - i <= this.shownNum) {
				clone = newSquare.clone();
				clone.insertBefore(firstReal);
				newSquare.addClass("hidden real");
				clone.addClass("hidden clone");
			} else {
				newSquare.addClass("hidden real");
			}
			
			newSquare.insertBefore(firstClone);
		}
	};
	
	newCaro.prototype.setContainerWidth = function() {
		var shown = this.caroItems.children(".caroItem.inlineShown").slice(0, 1);
		var sWidth = shown.outerWidth(true);
		var bBtnWidth = this.backBtn.outerWidth(true);
		
		sWidth = sWidth*this.shownNum;
		this.itemsContainer.css("width", sWidth+"px");
		this.itemsContainer.css("left", bBtnWidth+"px");
		
		var nextBtnLeft = sWidth + bBtnWidth;
		this.nextBtn.css("left", nextBtnLeft+"px");
	};
	
	newCaro.prototype.moveNext = function() {
		var showns = this.caroItems.children(".caroItem.inlineShown");
		var nextToShow = showns.slice(showns.length - 1, showns.length).next();
		var nextToHide = showns.slice(0, 1);
		
		nextToShow.removeClass("hidden").addClass("inlineShown");
		var setLeft = nextToShow.outerWidth(true);
		
		showns = this.caroItems.children(".caroItem.inlineShown");
		var nextShown = showns.slice(showns.length-1, showns.length).next();
		var resetShows = this.caroItems.children(".caroItem.real").slice(0, this.shownNum);
		
		this.caroItems.animate({"left": "-"+setLeft+"px"}, "slow", this.animateNext.bind(this, nextToHide, nextShown, showns, resetShows));
	};
	
	newCaro.prototype.moveBack = function() {
		var showns = this.caroItems.children(".caroItem.inlineShown");
		var nextToShow = showns.slice(0, 1).prev();
		var nextToHide = showns.slice(showns.length - 1, showns.length);

		nextToShow.removeClass("hidden").addClass("inlineShown");
		var setLeft = nextToShow.outerWidth(true);
		
		this.caroItems.css("left", "-"+setLeft+"px");
		
		showns = this.caroItems.children(".caroItem.inlineShown");
		var nextShown = showns.slice(0, 1).prev();
		var resetReals = this.caroItems.children(".caroItem.real");
		var resetShows = resetReals.slice(resetReals.length - this.shownNum, resetReals.length);
		
		this.caroItems.animate({"left": "0px"}, "slow", this.animateNext.bind(this, nextToHide, nextShown, showns, resetShows));
	};
	
	newCaro.prototype.animateNext = function(nextToHide, nextShown, showns, resetShows) {
	
		nextToHide.removeClass("inlineShown").addClass("hidden");
		this.caroItems.css("left", "0px");
		
		if(nextShown.length <= 0) {
			showns.removeClass("inlineShown").addClass("hidden");
			resetShows.removeClass("hidden").addClass("inlineShown");
		}
	};
	
	newCaro.prototype.connectBtns = function() {
	
		this.nextBtn.click(this.moveNext.bind(this));
		this.backBtn.click(this.moveBack.bind(this));
	};
	
	newCaro.prototype.createNewText = function(txt) {
		var newText = $("<h4></h4>");
		newText.text(txt);
		newText.addClass("caroText");
		
		return newText;
	};
	
	return newCaro;
});