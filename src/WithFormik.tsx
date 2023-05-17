import { remult } from "remult";
import { Person } from "./shared/Person";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useField,
  useFormikContext,
} from "formik";

const repo = remult.repo(Person);

function WithFormik() {
  return (
    <div>
      <Formik
        initialValues={new Person()}
        onSubmit={async (values) => {
          await repo.insert(values);
        }}
        validate={async (values) => {
          const errors = await repo.validate(values);
          if (errors && errors.modelState) return errors.modelState;
          return {};
        }}
      >
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" />
            <ErrorMessage name="firstName" component="span" />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" />
            <ErrorMessage name="lastName" component="span" />
          </div>

          <div>
            <label htmlFor="isMarried">Is Married</label>
            <Field type="checkbox" name="isMarried" />
            <ErrorMessage name="isMarried" component="span" />
          </div>

          <div>
            <label htmlFor="birthDate">Birth Date</label>
            <BirthDateField />
            <ErrorMessage name="birthDate" component="span" />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export const BirthDateField = () => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField("birthDate");
  return (
    <input
      {...field}
      value={repo.fields.birthDate.toInput(field.value)}
      type="date"
      onChange={(e) => {
        setFieldValue(
          field.name,
          repo.fields.birthDate.fromInput(e.target.value)
        );
      }}
    />
  );
};

export default WithFormik;
