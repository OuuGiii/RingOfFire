import { IRules, IDeck } from './../constants/interfaces';

const LOCAL_STORAGE_HELPER = {
	listOfRulesExist: function() {
		if (localStorage.getItem('list_of_rules') === null) return false;
		else return true;
	},

	setListOfRules: function(listOfRules: IRules) {
		let stringOfListOfRules: string = JSON.stringify(listOfRules);
		localStorage.setItem('list_of_rules', stringOfListOfRules);
	},

	getListOfRules: function() {
		let stringOfListOfRules: string = localStorage.getItem('list_of_rules')!;
		return JSON.parse(stringOfListOfRules);
	},

	setDeckOfCards: function(deckOfCards: IDeck) {
		let stringOfDeckOfCards: string = JSON.stringify(deckOfCards);
		localStorage.setItem('deck_of_cards', stringOfDeckOfCards);
	},

	getDeckOfCards: function() {
		let stringOfDeckOfCards: string = localStorage.getItem('deck_of_cards')!;
		return JSON.parse(stringOfDeckOfCards);
	}
};

export default LOCAL_STORAGE_HELPER;
