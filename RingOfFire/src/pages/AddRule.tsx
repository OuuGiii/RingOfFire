import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonViewDidEnter,
	useIonViewDidLeave,
	useIonViewWillEnter,
	useIonViewWillLeave,
	withIonLifeCycle,
	IonInput,
	IonItem,
	IonLabel,
	IonButton
} from '@ionic/react';
import React, { FormEvent } from 'react';
import { RouteComponentProps } from 'react-router';

const AddRule: React.FC<RouteComponentProps> = props => {
	useIonViewDidEnter(() => {
		console.log('ionViewDidEnter event fired');
	});

	useIonViewDidLeave(() => {
		console.log('ionViewDidLeave event fired');
	});

	useIonViewWillEnter(() => {
		console.log('ionViewWillEnter event fired');
	});

	useIonViewWillLeave(() => {
		console.log('ionViewWillLeave event fired');
	});

	interface Rule {
		title: string;
		description: string;
		isUsed: boolean;
	}

	interface Rules {
		[key: string]: Rule;
	}

	let new_rule_title: string = '';
	let new_rule_description: string = '';

	const updateTitle = (event: CustomEvent) => {
		let target: HTMLInputElement | null = event.target as HTMLInputElement;
		new_rule_title = target?.value;
		console.log(target);
		console.log(new_rule_title);
	};

	const updateDescription = (event: CustomEvent) => {
		let target: HTMLInputElement | null = event.target as HTMLInputElement;
		new_rule_description = target?.value;
		console.log(target);
		console.log(new_rule_description);
	};

	const submitNewRule = (event: FormEvent) => {
		event.preventDefault();
		console.log(event);

		//localStorage.setItem('list_of_rules', '{}');

		if (localStorage.getItem('list_of_rules') === null) {
			let ownRulesObj: Rules = {
				rule1: {
					title: new_rule_title,
					description: new_rule_description,
					isUsed: true
				}
			};
			let ownRules: string = JSON.stringify(ownRulesObj);
			localStorage.setItem('list_of_rules', ownRules);
		} else {
			let ownRules: string = localStorage.getItem('list_of_rules')!;
			let ownRulesObj: Rules = JSON.parse(ownRules);
			const size = Object.keys(ownRulesObj).length + 1;
			ownRulesObj['rule' + size] = {
				title: new_rule_title,
				description: new_rule_description,
				isUsed: true
			};
			ownRules = JSON.stringify(ownRulesObj);
			localStorage.setItem('list_of_rules', ownRules);
		}

		console.log(localStorage);
		props.history.goBack();
		//return false;
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/rules" />
					</IonButtons>
					<IonTitle>Add Rule</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form name="addRuleForm" onSubmit={submitNewRule}>
					<IonItem>
						<IonLabel>Title</IonLabel>
						<IonInput id="new_rule_title" type="text" placeholder="Title" required onIonBlur={updateTitle}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel>Title</IonLabel>
						<IonInput id="new_rule_description" type="text" placeholder="Description" required onIonBlur={updateDescription}></IonInput>
					</IonItem>
					<div className="ion-padding">
						<IonButton type="submit" expand="block">
							Add new rule
						</IonButton>
					</div>
				</form>
			</IonContent>
		</IonPage>
	);
};

export default withIonLifeCycle(AddRule);
