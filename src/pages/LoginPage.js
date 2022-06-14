import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../apis/api";
import { AuthContext } from "../contexts/authContext";
import doty from "../assets/img/Doty.svg";

function LoginPage() {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", { ...state, role: "adopter" });
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div className="flex flex-col md:flex md:flex-row h-screen md:bg-white">
      <div className="hidden items-start px-3 md:bg-white md:flex md:flex-col md:justify-center md:mb-10 lg:text-3xl text-secondary-blue text-2xl font-bold">
        Vocês está quase lá...
        <p className="text-gray-700 mt-5 text-base font-normal lg:text-lg">
          Para concluir a sua candidatura e acompanhar todo o processo de
          adoção, solicitamos que entre ou crie sua conta.
        </p>
      </div>
      <div className="flex flex-col py-8 px-10 md:bg-slate-900 md:w-screen md:flex-row md:justify-end lg:justify-center lg:border lg:rounded-sm relative">
        <form
          onSubmit={handleSubmit}
          className="bg-white md:rounded-lg md:p-5 md:h-fit md:flex md:flex-col md:mt-20 lg:p-10 lg:rounded-lg xl:p-20"
        >
          <div className="mb-10 flex justify-center">
            <img src={doty} alt="Logo da DOTY" />
          </div>
          <div className="mb-8">
            <label htmlFor="signupFormEmail">Email</label>
            <input
              type="email"
              name="email"
              id="signupFormEmail"
              value={state.email}
              error={errors.email}
              onChange={handleChange}
              className="mt-2 text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="signupFormPassword">Senha</label>
            <input
              type="password"
              name="password"
              id="signupFormPassword"
              value={state.password}
              error={errors.password}
              onChange={handleChange}
              className="mt-2 text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
            />
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full text-white bg-primary disabled:bg-neutral focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-base px-11 py-2.5 mr-2 mb-2 focus:outline-none"
            >
              Entrar
            </button>
          </div>
          <div className="flex flex-row mt-8 text-sm justify-center md:pb-5">
            <div>Novo por aqui?</div>
            <Link
              to="/signuppage"
              className="font-extrabold pl-2 text-secondary-blue"
            >
              Crie a sua conta
            </Link>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center mt-5 px-3 text-secondary-blue text-xl font-bold md:hidden">
        Vocês está quase lá...
        <p className="text-gray-700 mt-5 text-base font-normal">
          Para concluir a sua candidatura e acompanhar todo o processo de
          adoção, solicitamos que entre ou crie sua conta.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
