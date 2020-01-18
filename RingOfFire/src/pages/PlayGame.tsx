import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, withIonLifeCycle } from '@ionic/react';
import React, { Props } from 'react';
import { informationCircleOutline } from 'ionicons/icons';
import Rules from './Rules';
import Card from '../components/Card';
import { RouteProps, RouteComponentProps } from 'react-router';
interface Card {
	title: string;
	description: string;
}

interface Deck {
	cards: Card[];
	lenght: number;
}

const AMOUNT_OF_CARDS_PER_RULE = 4;

class PlayGame extends React.Component<RouteComponentProps> {
	state = {
		cardShown: null,
		gameFinnished: false
	};

	ionViewWillEnter() {
		console.log('ionViewWillEnter event fired');
		this.setState({ cardShown: <Card title="Click me to start" description="Now just click on the screen to start playing" backgroundColor="#ffffff" fontColor="#000000" /> });
		let deckOfCards: Deck = {
			cards: [],
			lenght: 0
		};
		let listOfCards: Array<Card> = [];
		if (localStorage.getItem('list_of_rules') === null) {
			console.log('No rules where found! Add some rules to play the game');
		} else {
			let stringOfListOfRules: string = localStorage.getItem('list_of_rules')!;
			let listOfRules: Rules = JSON.parse(stringOfListOfRules);

			for (let key in listOfRules) {
				// skip loop if the property is from prototype
				if (!listOfRules.hasOwnProperty(key)) continue;

				let rule = listOfRules[key];

				if (rule.isUsed === true) {
					let addedCards = 0;
					for (addedCards; addedCards < AMOUNT_OF_CARDS_PER_RULE; addedCards++) {
						let card: Card = {
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

			let stringOfDeckOfCards: string = JSON.stringify(deckOfCards);
			localStorage.setItem('deck_of_cards', stringOfDeckOfCards);
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

	shuffleListOfCards = (listOfCards: Array<Card>) => {
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

	updateDeckOfCardsToLocalStorage = (deckOfCards: Deck) => {
		deckOfCards.lenght = deckOfCards.cards.length;
		let stringOfDeckOfCards: string = JSON.stringify(deckOfCards);
		localStorage.setItem('deck_of_cards', stringOfDeckOfCards);
	};

	nextCard = () => {
		if (this.state.gameFinnished === true) {
			this.props.history.push('/home');
		}
		let stringOfDeckOfCards: string = localStorage.getItem('deck_of_cards')!;
		let deckOfCards: Deck = JSON.parse(stringOfDeckOfCards);
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
