import React from 'react';

const Card = (props: { title: string; description: string; backgroundColor: string; fontColor: string }) => {
	return (
		<div className="center">
			<div id="title">
				<h1>{props.title}</h1>
			</div>
			<div id="description" hidden>
				<h1>{props.description}</h1>
			</div>
		</div>
	);
};
export default Card;
