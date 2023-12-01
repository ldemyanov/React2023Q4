const UncontrolledForm: React.FC = () => {
  return (
    <form>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" placeholder="Leonid" />
      </div>

      <div>
        <label htmlFor="age">Age: </label>
        <input type="number" name="age" placeholder="23" />
      </div>

      <div>
        <label htmlFor="email">Email: </label>
        <input type="text" name="email" placeholder="de17eon@gmail.com" />
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" />
      </div>

      <div>
        <label htmlFor="password2">Repeat password: </label>
        <input type="password" name="password2" />
      </div>
    </form>
  );
};

export default UncontrolledForm;
