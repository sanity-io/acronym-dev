import { Form, useActionData } from "remix";

export default function Suggestion() {
  const errors = useActionData();
  return <pre>Suggestion box comes here</pre>;
  return (
    <div>
      <h2>Suggest an acronym, abbreviation or initialism</h2>
      <Form method="post" action="/suggestion">
        <p>
          <label>
            Term
            <br />
            <input type="text" name="term" />
            {errors?.term && <span>{errors.term}</span>}
          </label>
        </p>
        <p>
          <label>
            Description
            <br />
            <textarea name="description"></textarea>
            {errors?.term && <span>{errors.term}</span>}
          </label>
        </p>
        <p>
          <label htmlFor="name">
            Your name
            <br />
            <input name="name" type="text" />
          </label>
        </p>
        <p>
          <label htmlFor="email">
            Email
            <br />
            <input type="email" />
          </label>
        </p>
        <p>
          <button type="submit" className="button">
            Submit
          </button>
        </p>
      </Form>
    </div>
  );
}
