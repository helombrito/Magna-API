showMenu('cadastro');
showFooter();

async function trocarSenha () {
      var novaSenha = input_novaSenha;
      var confSenha = input_confSenha;
      // console.log(confSenha, novaSenha);
      // return;
      if (
            checkInput(novaSenha, 60, 4) &&
            checkInput(confSenha, 60, 4))
      {
            openLoad();
            let id = document.URL.split('?id=')[ 1 ];


            let req = await fetch(`/usuarios/trocarSenha/${id}`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                        novaSenhaServer: novaSenha.value
                  })
            });
            if (req.ok)
            {
                  closeLoad();
                  showMessageSuccess('Sua senha foi alterada!');

                  setTimeout(() => {
                        window.location.href = 'login.html'
                  }, 3000);
            } else
            {
                  closeLoad();
                  showMessageError('Houve um erro ao trocar senha');
            }

      }
}