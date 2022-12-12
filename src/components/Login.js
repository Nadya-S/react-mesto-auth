import React, { useState, useCallback } from "react";
import AuthorizationForm from "./AuthorizationForm";
import { useHistory } from "react-router-dom";

const Login = ({onLogin, openFailTooltip}) => {
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
    onLogin({email, password})
    .then(resetForm())
    .then(() => history.push("/"))
    .catch((err) => {
          console.error(`Ошибка: ${err}`);
          openFailTooltip();
        }); 
  };

  return (
    <div className="authorization">
      <AuthorizationForm 
        title="Вход" 
        buttonText="Войти"
        handleSubmit={handleSubmit}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        email={email}
        password={password}
     />
    </div>
  );
};

export default Login;
