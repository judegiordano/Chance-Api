export { CommonError, NotFoundError, UnauthorizedError } from "./errors";
import { IModel } from "../services";

export type Ref<T extends IModel> = T["_id"]
