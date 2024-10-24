export const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          data-testid="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
        />
        <br />
        <label>Password:</label>
        <input
          data-testid="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
