import classNames from "classnames/bind";
import styles from "./signUp.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { USER_SIGNUP } from "../../models/user";
import { Register } from "../../apis/user";
import { TextInput, Button, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
const cx = classNames.bind(styles);
function SignUp() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: { ...USER_SIGNUP.user },
    validate: {
      username: (value) =>
        value.length < 5 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)
          ? null
          : "Password must have at least 8 characters and contain both letters and numbers",
    },
  });
  const handleSubmit = async (value) => {
    let user = { user: { ...value } };
    setLoading(true);
    try {
      await Register(user);
      notifications.show({
        title: "Đăng kí thành công",
        message: "Vui lòng đăng nhập 😍 ",
        color: "green",
      });
      nav("/signIn");
    } catch (error) {
      let errors = error.response.data.errors;

      Object.keys(errors).forEach((key) => {
        let fieldErrors = errors[key];

        fieldErrors.forEach((message) => {
          notifications.show({
            title: "Đăng kí thất bại",
            message: `${key}: ${message} 🤥`,
            color: "red",
          });
        });
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box maw={500} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)} className={cx("wrapper")}>
          <div className={cx("title")}>
            <h1>Sign Up</h1>
            <Link to={"/signUp"}>Need an account</Link>
          </div>
          <TextInput
            placeholder="username"
            label="username"
            {...form.getInputProps("username")}
          />
          <TextInput
            placeholder="email"
            label="email"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="password"
            placeholder="password"
            mt="md"
            type="password"
            {...form.getInputProps("password")}
          />
          <Button
            disabled={loading}
            className={cx("button-submit")}
            type="submit"
            mt="md"
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}

export default SignUp;
