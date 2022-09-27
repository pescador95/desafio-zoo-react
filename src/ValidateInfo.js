export default function validateInfo(values) {
    let errors = {}
    
    //Validação do email
    if(!values.email.trim()) { 
        errors.email = "Email obrigatório"
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email inválido"
    }

    //Validação da senha
    if(!values.senha) {
        errors.senha = "Senha obrigatória"
    }

    return errors;
}