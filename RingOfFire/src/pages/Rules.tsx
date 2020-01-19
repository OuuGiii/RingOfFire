import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonIcon,
	useIonViewDidEnter,
	useIonViewDidLeave,
	useIonViewWillEnter,
	useIonViewWillLeave,
	IonList
} from '@ionic/react';
import React from 'react';
import { addCircle } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import Rule from './../components/Rule';

interface Rule {
	title: string;
	description: string;
	isUsed: boolean;
}

interface Rules {
	[key: string]: Rule;
}

const default_rules: Rules = {
	Rule1: {
		title: 'Waterfall💧',
		description: 'Everyone needs to start chugging their drink and can stop when the person on their left stops chugging.',
		isUsed: true
	},
	Rule2: {
		title: '🐥🐥🐥',
		description: 'Girls (chicks) drinks.',
		isUsed: true
	},
	Rule3: {
		title: '🍆🍆🍆',
		description: 'Boys (dicks) drinks.',
		isUsed: true
	},
	Rule4: {
		title: '🐍👀',
		description: "One person gets the 'snake eyes' and if another persons looks into them then that person has to drink.",
		isUsed: true
	},
	Rule5: {
		title: '❓👑',
		description: "One person gets to be the 'The Question master' and if another person answers his questions, then that person has to drink.",
		isUsed: true
	},
	Rule6: {
		title: '7️⃣',
		description: 'You count together one by one untill somebody fails. If the number:\n- contains a 7\n- can be divided by 7\n- contains double numbers\nThen the player can say anything else but 7.',
		isUsed: true
	},
	Rule7: {
		title: '🧝‍♀️🧛🏻‍♂️🧙🏼‍♂️🦖🐲',
		description: 'You tell a story together by repeating what has been said and adding one word to the story.',
		isUsed: true
	},
	Rule8: {
		title: '🙎🏻‍♂🍻🙎🏽‍♂',
		description: 'You can choose someone to be your drinking mate. This person must always drink when you are drinking',
		isUsed: true
	},
	Rule9: {
		title: 'Never have I ever',
		description:
			'Everyone puts 3 fingers up and one by one you say one statement. If one statement is correct, you must put one finger down. The game ends when one person don’t have any fingers up anymore.',
		isUsed: true
	}
};

const Rules: React.FC<RouteComponentProps> = props => {
	useIonViewDidEnter(() => {
		console.log('ionViewDidEnter HALLOJ');
	});

	useIonViewDidLeave(() => {
		console.log('ionViewDidLeave event fired');
	});

	useIonViewWillEnter(() => {
		console.log('ionViewWillEnter event fired');

		if (localStorage.getItem('list_of_rules') === null) {
			let listOfRules: Rules = {};

			let i = 1;
			for (let rule in default_rules) {
				listOfRules['Rule' + i] = default_rules['Rule' + i];
				i++;
				console.log(rule);
				console.log(listOfRules['Rule' + i]);
			}

			let stringOfListOfRules: string = JSON.stringify(listOfRules);
			localStorage.setItem('list_of_rules', stringOfListOfRules);
		}
	});

	useIonViewWillLeave(() => {
		console.log('ionViewWillLeave event fired');
	});

	let rules_list: Array<JSX.Element> = [];

	const list_of_rules = () => {
		let stringOfListOfRules: string = localStorage.getItem('list_of_rules')!;
		let listOfRules: Rules = JSON.parse(stringOfListOfRules);
		for (let key in listOfRules) {
			// skip loop if the property is from prototype
			if (!listOfRules.hasOwnProperty(key)) continue;

			let rule = listOfRules[key];
			const rule_element: JSX.Element = <Rule name={key} title={rule.title} description={rule.description} isUsed={rule.isUsed} />;
			rules_list.push(rule_element);
		}

		return rules_list;
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/home" />
					</IonButtons>
					<IonTitle>Rules</IonTitle>
					<IonButtons slot="end" onClick={() => props.history.push('/rules/add_rule')}>
						<IonIcon icon={addCircle} />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{/*-- List of Input Items --*/}
				<IonList>{list_of_rules()}</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Rules;
