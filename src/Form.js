import React from "react";
import UseForm from "./UseForm";
import validateInfo from "./ValidateInfo";
import './Form.css';


const Form = (submitForm) => {
    const {handleChange, values, handleSubmit, errors} = UseForm(submitForm, validateInfo);

    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}> 
                <h1>Faça seu login</h1>
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input id="email" type="text" name="email" className="form-input" placeholder="Entre com seu email" value={values.email} onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="senha" className="form-label">Senha:</label>
                    <input id="senha" type="password" name="senha" className="form-input" placeholder="********" value={values.senha} onChange={handleChange}/>
                    {errors.senha && <p>{errors.senha}</p>}
                </div>
                <button className="form-input-btn" type="submit">Login</button>
            </form>
            <div id="divTeste">
            
            </div>
        </div>
        
    )
}

export default Form;

/*
Linhas 10 e 14: deixar o id igual ao htmlFor possibilita que, ao clicar no label, o ponteiro do mouse direcione a digitação para o input
*/