import { remultExpress } from "remult/remult-express";
import { Person } from "../shared/Person";

export const api = remultExpress({
  entities: [Person],
});
