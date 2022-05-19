showMenu('cadastro');
showFooter();

async function trocarSenha() {
      var email = input_email.value;
      var novaSenha = input_novaSenha.value;
      if (email == '') {
            erro.innerHTML = `Preencha o E-mail`;
            erro.className = 'erro';
      } else if (email.indexOf('@') == -1) {
            erro.innerHTML = `Seu e-mail está invalido.`;
            erro.className = 'erro';
      } else if (email.length < 4) {
            erro.innerHTML = `E-mail deve possuir 4 ou mais caracteres.`;
            erro.className = 'erro';
      } else {



            console.log("FORM LOGIN: ", email);



            var req = await fetch("/usuarios/validar", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                        emailServer: email,

                  })
            })
            var res = await req.json();
            console.log(res)

            if (res != undefined) {

                  erro.innerHTML = `trocamos sua senha com sucesso`;
                  erro.className = 'success';

                  await fetch("/usuarios/trocarSenha", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                              emailServer: email,
                              novaSenhaServer: novaSenha

                        })


                  });

            } else {

                  erro.innerHTML = `Houve um erro ao trocar senha`;
                  erro.className = 'erro';
            }
      }
}