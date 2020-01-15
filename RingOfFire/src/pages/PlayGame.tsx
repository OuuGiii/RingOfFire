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
	useIonViewWillLeave
} from '@ionic/react';
import React from 'react';
import { informationCircleOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';

const PlayGame: React.FC<RouteComponentProps> = props => {
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
					<IonButtons slot="start">
						<IonBackButton defaultHref="/home" />
					</IonButtons>

					<IonTitle>Game</IonTitle>
					<IonButtons slot="end">
						<IonIcon icon={informationCircleOutline} />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent></IonContent>
		</IonPage>
	);
};

export default PlayGame;
