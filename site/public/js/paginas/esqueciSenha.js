showMenu('login');
showFooter();
async function validar() {
      var email = input_email;
      var emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;

      if (checkInput(email, 100, 3, emailRegex)) {
            openLoad();

            try {
                  let req = await fetch("/usuarios/validar", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                              emailServer: email.value,
                        })
                  });
                  let res = await req.json();
                  if (res.length > 0) {
                        showMessageSuccess('Enviamos sua senha no seu E-mail!');

                        let resF = await fetch("/usuarios/enviar_email", {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify({
                                    emailServer: email.value,
                                    id: res[0].idUsuario
                              })
                        });
                        let responseEmail = await resF.json();
                        console.log(responseEmail, res);
                        if (resF.status == 200) {
                              closeLoad();
                        }
                  } else {
                        showMessageWarning('Usuário não encontrado!')
                  }
                  closeLoad();
                  console.log(res);
            } catch (error) {
                  showMessageWarning(error);
                  console.log(error);
                  closeLoad();
            }


      }
}