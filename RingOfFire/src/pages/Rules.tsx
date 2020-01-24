import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonList, withIonLifeCycle } from '@ionic/react';
import React from 'react';
import { addCircle } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import Rule from './../components/Rule';
import { IRules } from './../constants/interfaces';
import { default_rules } from './../constants/default_rules';
import LOCAL_STORAGE_HELPER from './../helper/localStorage';
class RulesPage extends React.Component<RouteComponentProps> {
	ionViewWillEnter() {
		console.log('ionViewWillEnter event fired');

		if (LOCAL_STORAGE_HELPER.listOfRulesExist()) {
			let listOfRules: IRules = {};

			let i = 1;
			for (let rule in default_rules) {
				listOfRules['Rule' + i] = default_rules['Rule' + i];
				i++;
				console.log(rule);
				console.log(listOfRules['Rule' + i]);
			}

			LOCAL_STORAGE_HELPER.setListOfRules(listOfRules);
		}
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

	rules_list: Array<JSX.Element> = [];

	list_of_rules = () => {
		let listOfRules: IRules = LOCAL_STORAGE_HELPER.getListOfRules();
		for (let key in listOfRules) {
			// skip loop if the property is from prototype
			if (!listOfRules.hasOwnProperty(key)) continue;

			let rule = listOfRules[key];
			const rule_element: JSX.Element = <Rule name={key} title={rule.title} description={rule.description} isUsed={rule.isUsed} />;
			this.rules_list.push(rule_element);
		}

		return this.rules_list;
	};

	render() {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonBackButton defaultHref="/home" />
						</IonButtons>
						<IonTitle>Rules</IonTitle>
						<IonButtons slot="end" onClick={() => this.props.history.push('/rules/add_rule')}>
							<IonIcon icon={addCircle} />
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					{/*-- List of Input Items --*/}
					<IonList>{this.list_of_rules()}</IonList>
				</IonContent>
			</IonPage>
		);
	}
}

export default withIonLifeCycle(RulesPage);
