import React, {useState, useEffect} from "react";
import validateInfo from "./ValidateInfo";

const UseForm = (callback, ValidateInfo) => {

    //[<estado>, <função que altera o estado>]
    const [values, setValues] = useState({//aqui dentro são passados os valores default para o values
        email: '',
        senha: ''
    })

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


     const handleChange = e => {
         console.log("Valor de handle change " + e.target);
         const {name, value} = e.target//name e value são os campos referidos dentro da input. name="senha" e value={value.senha}, por exemplo
         setValues({//Atualiza o valor das input em tempo real
             ...values,//retorna o objeto inteiro. 
             [name]: value
         })
     }

    const handleSubmit = e => {
        e.preventDefault();//impede o refresh da página

        setErrors(validateInfo(values));

        setIsSubmitting(true);
    }

    return {handleChange, values, handleSubmit, errors}
}

export default UseForm;