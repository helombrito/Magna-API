showMenu('cadastro');
showFooter();
var email = '';
var nome = '';
var cnpj = '';
var telefone = '';
var senha = '';
var confirmarSenha = '';
var termos = '';

var div_alertas = '';

function cadastrar () {

    email = in_email;
    nome = in_nome;
    cnpj = in_cnpj;
    telefone = in_tel;
    senha = in_senha;
    confirmarSenha = in_conf;
    termos = privacidade;

    div_alertas = alertas;

    if (validarCampos())
    {
        showMessageSuccess('Todos os campos validados!');
    }

}

function validarCampos () {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
    var cnpjRegex = /^\d{14}$/gm;

    if (
        checkInput(nome, 100, 3, /^[a-zA-Z\s]*$/gm) &&
        checkInput(email, 100, 5, emailRegex) &&
        // cpnj only numbers
        checkInput(cnpj, 14, 14, cnpjRegex) &&
        // telefone only numbers 
        checkInput(telefone, 11, 9, /^\d{9,11}$/gm) &&
        checkInput(senha, 60, 4) &&
        checkInput(confirmarSenha, 60, 4) &&
        checkCheckbox(termos, div_alertas)
    )
    {
        if (senha.value.trim() !== confirmarSenha.value.trim())
        {
            return inputErrorMessage(confirmarSenha, 'Senhas não são identicas');
        } else
        {
            inputErrorMessageClear(confirmarSenha);
        }
        return true;
    }
}
