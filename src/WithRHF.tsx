import { remult } from "remult";
import { Person } from "./shared/Person";
import { useForm } from "react-hook-form";

const repo = remult.repo(Person);

function WithRHF() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Person>({
    mode: "all",
    defaultValues: {
      ...new Person(),
      birthDate: repo.fields.birthDate.toInput(new Date()) as any,
    },
    resolver: async (values) => {
      const errors = await repo.validate(values);
      if (errors && errors.modelState)
        return {
          values,
          errors: Object.fromEntries(
            Object.entries(errors.modelState).map(([key, value]) => [
              key,
              { message: value },
            ])
          ),
        };
      return { values, errors: {} };
    },
  });
  const onSubmit = async (values: Person) => {
    console.log(values);
    await repo.insert(values);
  };

  return (
    <div>
      <h1>Remult Form Validation - React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register("firstName")} />
          <span>{errors.firstName?.message}</span>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input {...register("lastName")} />
          <span>{errors.lastName?.message}</span>
        </div>
        <div>
          <label htmlFor="isMarried">Is Married</label>
          <input type="checkbox" {...register("isMarried")} />
          <span>{errors.isMarried?.message}</span>
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            {...register("birthDate", { valueAsDate: true })}
          />
          <span>{errors.birthDate?.message}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default WithRHF;
