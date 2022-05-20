showMenu('cadastro');
showFooter();

async function trocarSenha () {
      var novaSenha = input_novaSenha;
      var confSenha = input_confSenha;
      if (
            checkInput(novaSenha, 60, 4) &&
            checkInput(confSenha, 60, 4))
      {
            var req = await fetch("/usuarios/validar", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                        emailServer: email,

                  })
            });
            var res = await req.json();
            console.log(res);
            return;
            if (res != undefined)
            {
                  showMessageSuccess('Sua senha foi alterada!');

                  await fetch("/usuarios/trocarSenha", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                              novaSenhaServer: novaSenha
                        })
                  });

            } else
            {
                  showMessageError('Houve um erro ao trocar senha');
            }
      }
}