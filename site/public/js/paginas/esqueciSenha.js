showMenu('login');
showFooter();
async function validar () {
      var email = input_email;
      var emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;

      if (checkInput(email, 100, 3, emailRegex))
      {
            var req = await fetch("/usuarios/validar", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                        emailServer: email.value,
                  })
            });

            if (req.ok)
            {
                  var res = await req.json();
                  console.log(res.idUsuario);
                  showMessageSuccess('Enviamos sua senha no seu E-mail!');

                  await fetch("/usuarios/enviar_email", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                              emailServer: email.value,
                              id: res.idUsuario
                        })
                  });
            }
      }
}