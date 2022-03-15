import { Schema, IModel, model } from "../services";

export interface IUser extends IModel {
	profile: {
		name: string
		gender: "male" | "female"
		birthday: string | Date
		profession: string
		social_last_four: string
		profile_url: string
	},
	contact: {
		phone: string
		email: string
	},
	address: {
		street: string
		city: string
		country: string
	}
}

export const user = model<IUser>("User",
	new Schema({
		profile: {
			name: {
				type: String,
				required: true
			},
			gender: {
				type: String,
				enum: ["male", "female"],
				required: true
			},
			birthday: {
				type: String,
				required: true
			},
			profession: {
				type: String,
				required: true
			},
			social_last_four: {
				type: String,
				required: true
			},
			profile_url: {
				type: String,
				required: true
			}
		},
		contact: {
			phone: {
				type: String,
				required: true
			},
			email: {
				type: String,
				required: true
			}
		},
		address: {
			street: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			}
		}
	})
);

export class UserService {

}
