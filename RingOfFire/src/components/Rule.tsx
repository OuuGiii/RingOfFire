import { IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import React from 'react';

const Rule = (props: { title: React.ReactNode; description: React.ReactNode; isUsed: boolean }) => {
	return (
		<IonItem>
			<IonCheckbox slot="start" checked={props.isUsed} />
			<IonLabel>{props.title}</IonLabel>
		</IonItem>
	);
};
export default Rule;
