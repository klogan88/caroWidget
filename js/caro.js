define(['jquery'], function($) {

	var anchorNode = null;
	var controlsNode = null;
	var populateBtn = null;
	var clearBtn = null;
	var caroNode = null;
	var backBtn = null;
	var nextBtn = null;
	var itemsContainer = null;
	var emptyDiv = null;
	var caroItems = null;
	
	function newCaro (caroProps, element) {
	
		anchorNode = element;
		
		//container Node.
		this.domNode = $("<div></div>");
		this.domNode.addClass("container");
		
		//controls node
		controlsNode = $("<div></div>");
		controlsNode.addClass("controls");
		
		//buttons
		populateBtn = $("<button></button>");
		populateBtn.addClass("populate");
		populateBtn.text("Populate");
		
		clearBtn = $("<button></button>");
		clearBtn.addClass("clear");
		clearBtn.text("Clear");
		
		controlsNode.append(populateBtn);
		controlsNode.append(clearBtn);
		
		//carousel node
		caroNode = $("<div></div>");
		caroNode.addClass("caroNode");
		
		//carousel buttons
		backBtn = $("<button></button>");
		backBtn.addClass("back");
		backBtn.text("Back");
		
		nextBtn = $("<button></button>");
		nextBtn.addClass("next");
		nextBtn.text("Next");
		
		//items containter
		itemsContainer = $("<div></div>");
		itemsContainer.addClass("itemsContainer inlineShown");
		
		//empty state div
		emptyDiv = $("<div></div>");
		emptyDiv.text("Currently empty");
		emptyDiv.addClass("emptyDiv");
		
		//caro items container
		caroItems = $("<div></div>");
		caroItems.addClass("caroItems");
		
		//Add the items together
		itemsContainer.append(emptyDiv);
		itemsContainer.append(caroItems);
		
		caroNode.append(backBtn);
		caroNode.append(itemsContainer);
		caroNode.append(nextBtn);
		
		this.domNode.append(controlsNode);
		this.domNode.append(caroNode);
		
		anchorNode.append(this.domNode);
	};
	
	function internal() {
		console.log("Internal only.....");
	};
	
	newCaro.prototype.testFunc = function() {
		console.log("testing.............");
		internal();
	};
	
	return newCaro;
});