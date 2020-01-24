export interface IRule {
	title: string;
	description: string;
	isUsed: boolean;
}

export interface IRules {
	[key: string]: IRule;
}

export interface ICard {
	title: string;
	description: string;
}

export interface IDeck {
	cards: ICard[];
	lenght: number;
}
