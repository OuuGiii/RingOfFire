import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, withIonLifeCycle } from '@ionic/react';
import React from 'react';
import { informationCircleOutline } from 'ionicons/icons';

import Card from '../components/Card';
import { RouteComponentProps } from 'react-router';
import { IRules, ICard, IDeck } from './../constants/interfaces';
import LOCAL_STORAGE_HELPER from '../helper/localStorage';

const AMOUNT_OF_CARDS_PER_RULE = 4;

class PlayGame extends React.Component<RouteComponentProps> {
	state = {
		cardShown: null,
		gameFinnished: false
	};

	ionViewWillEnter() {
		console.log('ionViewWillEnter event fired');
		this.setState({ cardShown: <Card title="Click me to start" description="Now just click on the screen to start playing" backgroundColor="#ffffff" fontColor="#000000" /> });
		let deckOfCards: IDeck = {
			cards: [],
			lenght: 0
		};
		let listOfCards: Array<ICard> = [];
		if (!LOCAL_STORAGE_HELPER.listOfRulesExist()) {
			console.log('No rules where found! Add some rules to play the game');
		} else {
			let listOfRules: IRules = LOCAL_STORAGE_HELPER.getListOfRules();

			for (let key in listOfRules) {
				// skip loop if the property is from prototype
				if (!listOfRules.hasOwnProperty(key)) continue;

				let rule = listOfRules[key];

				if (rule.isUsed === true) {
					let addedCards = 0;
					for (addedCards; addedCards < AMOUNT_OF_CARDS_PER_RULE; addedCards++) {
						let card: ICard = {
							title: rule.title,
							description: rule.description
						};
						listOfCards.push(card);
					}
				}
			}

			this.shuffleListOfCards(listOfCards);

			deckOfCards.cards = listOfCards;
			deckOfCards.lenght = listOfCards.length;

			LOCAL_STORAGE_HELPER.setDeckOfCards(deckOfCards);
		}

		console.log(localStorage);
	}

	ionViewWillLeave() {
		console.log('ionViewWillLeave event fired');
	}

	ionViewDidEnter() {
		console.log('ionViewDidEnter event fired');
	}

	ionViewDidLeave() {
		console.log('ionViewDidLeave event fired');
		this.setState({ gameFinnished: false });
	}

	shuffleListOfCards = (listOfCards: Array<ICard>) => {
		for (let i = listOfCards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[listOfCards[i], listOfCards[j]] = [listOfCards[j], listOfCards[i]];
		}
	};

	flipCard = () => {
		let titleContent: HTMLElement = document.getElementById('title')!;
		let descriptionContent: HTMLElement = document.getElementById('description')!;

		titleContent.hidden = !titleContent.hidden;
		descriptionContent.hidden = !descriptionContent.hidden;
	};

	// Change this to LOCAL_STORAGE_HELPER
	//  THIS CAN BE DELETED
	updateDeckOfCardsToLocalStorage = (deckOfCards: IDeck) => {
		deckOfCards.lenght = deckOfCards.cards.length;
		let stringOfDeckOfCards: string = JSON.stringify(deckOfCards);
		localStorage.setItem('deck_of_cards', stringOfDeckOfCards);
	};

	nextCard = () => {
		if (this.state.gameFinnished === true) {
			this.props.history.push('/home');
		}
		let stringOfDeckOfCards: string = localStorage.getItem('deck_of_cards')!;
		let deckOfCards: IDeck = JSON.parse(stringOfDeckOfCards);
		console.log(deckOfCards);

		if (deckOfCards.lenght !== 0) {
			let card = deckOfCards.cards.pop()!;
			console.log(card);
			console.log(deckOfCards);

			this.setState({ cardShown: <Card title={card.title} description={card.description} backgroundColor="" fontColor="" /> });
			console.log(this.state.cardShown);
			console.log(localStorage);

			this.updateDeckOfCardsToLocalStorage(deckOfCards);
			console.log(deckOfCards);

			let titleElement: HTMLElement = document.getElementById('title')!;
			if (titleElement.hidden === true) {
				this.flipCard();
			}
		} else {
			this.setState({ cardShown: this.lastCard });
			this.setState({ gameFinnished: true });
		}
	};

	lastCard: JSX.Element = (
		<Card title="Congratulations! You have finnished the game :)" description="Now just click on the screen to jump back to menu" backgroundColor="#ffffff" fontColor="#000000" />
	);

	render() {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start" id="goHome">
							<IonBackButton defaultHref="/home" />
						</IonButtons>

						<IonTitle>Game</IonTitle>
						<IonButtons slot="end" onClick={this.flipCard}>
							<IonIcon icon={informationCircleOutline} />
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent onClick={this.nextCard}>{this.state.cardShown}</IonContent>
			</IonPage>
		);
	}
}

export default withIonLifeCycle(PlayGame);
