import { IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import React from 'react';
import Rules from '../pages/Rules';

const Rule = (props: { name: string; title: string; description: string; isUsed: boolean }) => {
	let updateCheckBoxValueInLocalStorage = () => {
		let stringOfListOfRules: string = localStorage.getItem('list_of_rules')!;
		let listOfRules: Rules = JSON.parse(stringOfListOfRules);
		listOfRules[props.name].isUsed = !listOfRules[props.name].isUsed;
		stringOfListOfRules = JSON.stringify(listOfRules);
		localStorage.setItem('list_of_rules', stringOfListOfRules);
	};

	return (
		<IonItem detail={true}>
			<IonCheckbox slot="start" checked={props.isUsed} onIonChange={updateCheckBoxValueInLocalStorage} />
			<IonLabel>{props.title}</IonLabel>
		</IonItem>
	);
};
export default Rule;
