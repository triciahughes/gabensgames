import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";

const Signin = ({ setUser }) => {
  const [error, setError] = useState(false);
  const history = useHistory();
  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Must enter username.")
      .email("Must enter valid username."),
    password: yup.string().required("Must enter password."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            setUser(user);
            // fetchUser();
            history.push("/games");
          });
        } else {
          res.json().then((error) => setError(error));
        }
      });
    },
  });
  return (
    <>
      <div>
        <h3>Please Sign In</h3>
        <Link to="/signup">
          <h2>Don't have an account? Sign up!</h2>
        </Link>
        {error["error"] ? <p>{error["error"]}</p> : null}
        <form onSubmit={formik.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors["email"] ? <p>{formik.errors["username"]}</p> : null}
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors["password"] ? (
              <p>{formik.errors["password"]}</p>
            ) : null}
          </label>
          <br />
          <input type="submit" value="Sign In" />
        </form>
      </div>
    </>
  );
};

export default Signin;
