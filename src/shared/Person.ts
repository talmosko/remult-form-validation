import { Fields, Entity, Validators } from "remult";

@Entity("person", { allowApiCrud: true })
export class Person {
  @Fields.string<Person>({
    validate: (person) => {
      if (person.firstName.length < 3) throw Error("too short");
    },
  })
  firstName = "";

  @Fields.string({ validate: Validators.required })
  lastName = "";

  @Fields.boolean({
    validate: (person) => {
      if (person.isMarried) throw Error("must be false");
    },
  })
  isMarried = true;

  @Fields.dateOnly({
    validate(person) {
      if (person.birthDate > new Date()) throw Error("must be in the past");
    },
  })
  birthDate = new Date();
}
