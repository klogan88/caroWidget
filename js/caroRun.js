require({
		paths: {
			jquery: "js/jquery",
			caro: "js/caro"
		}
	},
	["jquery", "caro"],
	function($, caro){

	var items1 = [
		"Dempsey",
		"Bradley",
		"Espindola",
		"Johnson",
		"Kitchen",
		"Boswell",
		"Pontius",
		"Howard",
		"Jones",
		"Brooks",
		"Green",
		"Hamid",
		"Silva",
		"Rolfe",
		"DeLeon",
		"Franklin",
		"Korb",
		"Beckerman",
		"Beasley"
	];
	
	var items2 = {
		"Bill",
		"Frank",
		"Bobby",
		"Larry",
		"Cheese",
		"Pizza",
		"Grapes",
		"Beer",
		"Booze"
	}
	
	var props1 = {
		items: items1,
		shownNum: 6
	};
	
	var props2 = {
		items: items2,
		shownNum: 3
	}
	
	var caro1 = new caro(props1, $("#container1"));
	var caro2 = new caro(props2, $("#container2"));
	
});