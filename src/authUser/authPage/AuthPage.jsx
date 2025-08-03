const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      <button onClick={() => setIsRegister(false)}>Login</button>
      <button onClick={() => setIsRegister(true)}>Register</button>
      {isRegister ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};
