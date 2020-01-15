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
	rule1: {
		title: 'Rule1',
		description: 'Description1',
		isUsed: true
	},
	rule2: {
		title: 'Rule2',
		description: 'Description2',
		isUsed: true
	},
	rule3: {
		title: 'Rule3',
		description: 'Description3',
		isUsed: true
	},
	rule4: {
		title: 'Rule4',
		description: 'Description4',
		isUsed: true
	},
	rule5: {
		title: 'Rule5',
		description: 'Description5',
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
				listOfRules['rule' + i] = default_rules['rule' + i];
				i++;
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
			const rule_element = <Rule title={rule.title} description={rule.description} isUsed={rule.isUsed} />;
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
