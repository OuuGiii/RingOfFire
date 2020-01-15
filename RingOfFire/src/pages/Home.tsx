import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import './css/home.css';

const Home: React.FC<RouteComponentProps> = props => {
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

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Ring Of Fire</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding content center">
				<IonButton class="button" onClick={() => props.history.push('/play_game')}>
					Start Game
				</IonButton>
				<IonButton class="button" onClick={() => props.history.push('/rules')}>
					Rules
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Home;
