function logout () {
    window.location = '../paginas/inicio.html';
}
function showFooter (container = 'footer') {
    var place = document.getElementById(container);
    var html =
        `
    <div class="container-lg">
        <div class="logo">
            <a href="/">
                <img src="../../image/magna/logoBranco.png" alt="Magna, Logotipo, Empresa">
            </a>
        </div>
        <div class="footer-meio flex-center">
            <span class="endereco">Av. Angélica, 1048 São Paulo - SP, 01227100
            </span>
            <span class="copyright">Copyright © 2010-2022 Magna Company S.L. Todos os direitos reservados.</span>
        </div>
        <div class="footer-redes">
            <span class="email">magna.sptech@gmail.com</span>
            <div class="redes-sociais">
                <a href="https://www.facebook.com/MagnaItda" class="icon" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-facebook-square"></i>
                </a>
                <a href="https://www.instagram.com/magnaltda/" class="icon" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="link-linkedin" class="icon" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
                <a href="#link-google" class="icon" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-google"></i>
                </a>

            </div>
        </div>
    </div>
    `;

    place.innerHTML = html;

}
function showMenu (page, container = 'header') {
    var html =
        `
        <div class="navbar container-lg ">
            <div class="logo">
                <a href="/">
                    <img src="../../image/magna/logoBranco2.png" alt="Logotipo, Logo, Image, Magna">
                </a>
            </div>
            <ul class="menu">
                <li class="item" title="Inicio"><a href="/" class="link">Inicio</a></li>
                <li class="item" title="Sobre"><a href="/" class="link">Sobre</a></li>
                <li class="item" title="Contato"><a href="/" class="link">Contato</a></li>
                <li class="item" title="Simulador Financeiro"><a href="simulador.html" class="link">Simulador</a></li>
                <li class="item" title="Entrar"><a href="login.html" class="link">Entrar</a></li>
                <li class="item" title="Cadastrar"><a href="/cadastro.html" class="link">Cadastrar</a></li>
            </ul>
        </div>
    `;
    var doc = document.getElementById(container);
    doc.innerHTML = html;
    if (page == 'index')
    {
        doc.querySelector("li[title='Inicio'] a").classList.add('bold');
        doc.querySelector("li[title='Sobre'] a").href = '#body_sobre';
        doc.querySelector("li[title='Contato'] a").href = '#contact';
    } else if (page == 'simulador')
    {
        doc.querySelector("li[title='Simulador Financeiro'] a").classList.add('bold');

    } else if (page == 'login')
    {
        doc.querySelector("li[title='Entrar'] a").classList.add('bold');
    } else if (page == 'cadastro')
    {
        doc.querySelector("li[title='Cadastrar'] a").classList.add('bold');
    }

}