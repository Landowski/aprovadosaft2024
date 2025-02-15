const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function copiarTexto(id) {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    const texto = elemento.innerText;
    navigator.clipboard.writeText(texto).then(() => {
        exibirToast('Copiado!');
    }).catch(err => console.error('Erro ao copiar:', err));
}

function exibirToast(mensagem) {
    const toast = document.createElement('div');
    toast.innerText = mensagem;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.fontSize = '16px';
    toast.style.zIndex = '1000';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function adicionarEventoDeCopia(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.addEventListener('click', () => copiarTexto(id));
    }
}

adicionarEventoDeCopia('chave-pix');
adicionarEventoDeCopia('copiar-pix');