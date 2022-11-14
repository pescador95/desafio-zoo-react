import React from "react";
import "./index.css";
import { useState } from "react";
import { ENDPOINTS } from "../../services/endpoints";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const axios = useAxios();
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (email) => {
    const response = await axios.get(ENDPOINTS.recoverPassword + email);
    alert(response);
    navigate("/login");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit(email);
  };

  return (
    <div class="container d-flex flex-column">
      <div
        class="row align-items-center justify-content-center
                min-vh-100 g-0"
      >
        <div class="col-12 col-md-8 col-lg-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="mb-4">
                <h5>Esqueceu sua senha?</h5>
                <p class="mb-2">
                  Entre com seu email cadastrado no sistema para receber uma
                  nova
                </p>
              </div>
              <form onSubmit={onSubmit}>
                <div class="mb-3">
                  <label for="email" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    name="email"
                    placeholder="Digite seu email"
                    required=""
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div class="mb-3 d-grid">
                  <div class="btn box">
                    <button type="submit" class="btn btn-primary">
                      ENVIAR
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => navigate("/login")}
                    >
                      VOLTAR
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
