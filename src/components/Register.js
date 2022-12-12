import React, { useState, useCallback } from "react";
import AuthorizationForm from "./AuthorizationForm";
import { Link, useHistory } from "react-router-dom";

const Register = ({onRegister, openFailTooltip, openSuccessTooltip}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({email, password})
    .then(resetForm())
    .then(() => {
      openSuccessTooltip()
    })
    .then(() => history.push("/sign-in"))
    .catch((err) => {
          console.error(`Ошибка: ${err}`);
          openFailTooltip();
        }); 
  };

  return (
    <div className="authorization">
      <AuthorizationForm
        title="Регистрация"
        buttonText="Зарегистрироваться"
        handleSubmit={handleSubmit}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        email={email}
        password={password}
      />
      <Link to="/sign-in" className="authorization__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
};

export default Register;
