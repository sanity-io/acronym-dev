import { redirect, json, Form, useActionData } from "remix";
import Suggestion from "~/components/suggestion";

export async function action({ request: any }) {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const term = form.get("term");
  const description = form.get("description");
  const errors = {};
  const data = {
    term,
    description,
  };
  // validate the fields
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "That doesn't look like an email address";
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return json(errors, { status: 422 });
  }
  return {
    data,
  };
}

export default function NewSuggestion() {
  const { errors, data } = useActionData();

  return (
    <>
      <h1>New Suggestion</h1>
    </>
  );
}
