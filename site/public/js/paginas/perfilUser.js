showMenuRestritoUser();
let user = get_user_session();
console.log(user);
if (user) {
  dados.innerHTML = `
    <span>Nome: ${user.nome || "Nome Shopping"}</span>
    <span>Email: ${user.email || "shopping@gmail.com"}</span>
    ${user.cpf ? `<span>CPF: ${user.cpf}</span>` : ""}
    ${user.dtNasc ? `<span>Data de Nascimento: ${user.dtNasc}</span>` : ""}
    ${user.cpf ? `<span>
    Disponibilidade
    </span>
    <small style='font-size: 16px'>Disponivel</small> 
    <input type='radio' value='S' name='disp' ${
      user.disponibilidade == "S" && "checked"
    }><br>
    <small style='font-size: 16px'>Não disponível</small> 
    <input type='radio' value='N' name='disp' ${
      user.disponibilidade == "N" && "checked"
    }>` : ''}
    
    `;

  document.querySelectorAll("[name='disp']").forEach((el, k) => {
    el.style.width = "18px";
    el.style.height = "18px";
    el.addEventListener("change", (ev) => {
      let conf = confirm("Certeza que deseja alterar a disponibilidade?");
      if (conf) {
        openLoad();
        el.checked = true;
        fetch("usuarios/mudarDisponibilidade", {
          cache: "default",
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          body: JSON.stringify({
            id: user.idUsuario,
            disponibilidade: el.value,
          }),
        })
          .then((res) =>
            res.json().then((json) => {
              console.log(res, json);
              if (res.status == 200) {
                sessionStorage.removeItem("user");
                sessionStorage.setItem("user", JSON.stringify(json));
                showMessageSuccess("Disponibilidade alterada.");

                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              } else {
                showMessageWarning(json.message);
              }
            })
          )
          .catch((err) => showMessageError(err))
          .finally(()=>closeLoad());
        console.log("req");
      } else {
        el.checked = false;
      }
    });
  });
}
