showMenuRestrito();
let user = get_user_session();
console.log(user);
if (user) {
  dados.innerHTML = `
    <span>Nome: ${user.nomeShopping || "Nome Shopping"}</span>
    <span>Telefone: ${user.telefone || "(XX) XXXXX-XXXX"}</span>
    <span>Email: ${user.email || "shopping@gmail.com"}</span>
    <span>CEP: ${user.cep || "XXXXX-XXX"}</span>
    <span>Número: ${user.numeroEndereco || "shopping@gmail.com"}</span>
    <span>CNPJ: ${user.cnpj || "CNPJ"}</span>
    `;
}
