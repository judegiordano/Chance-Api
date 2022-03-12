import Chance from "chance";

import { IUser } from "../models";
import { faceApi } from "./rest";

export const chance = new Chance();
const emailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "outlook.com", "msn.com"];

export async function mockUsers(length: number): Promise<Pick<IUser, "profile" | "contact" | "address">[]> {
	const profiles = await Promise.all(
		Array.from({ length }).map(() => {
			return faceApi.get("json", {
				params: {
					minimum_age: 25,
					maximum_age: 40,
					gender: chance.bool() ? "male" : "female"
				}
			});
		})
	) as { data: { image_url: string } }[];
	return profiles.map(({ data }): Pick<IUser, "profile" | "contact" | "address"> => {
		const gender = data.image_url.split("rest/")[1].split("_")[0] as "male" | "female";
		return {
			profile: {
				name: chance.name({ middle_initial: true, gender }),
				gender,
				birthday: chance.birthday({ type: "adult", string: true }),
				profession: chance.profession(),
				social_last_four: chance.ssn({ ssnFour: true }),
				profile_url: data.image_url,
			},
			contact: {
				phone: chance.phone(),
				email: chance.email({ domain: chance.pickone(emailDomains) }),
			},
			address: {
				street: chance.address(),
				city: chance.city(),
				country: chance.country({ full: true }),
			}
		};
	});
}
