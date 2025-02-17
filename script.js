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

if (linksContainer) {
    if (!window.firebase) {
        const firebaseConfig = {
            apiKey: "AIzaSyA2PWKSieVPMWn93SPd6TVSCUzqHKrQBaw",
            authDomain: "aprovados-aft.firebaseapp.com",
            projectId: "aprovados-aft",
            storageBucket: "aprovados-aft.firebasestorage.app",
            messagingSenderId: "39369780349",
            appId: "1:39369780349:web:55ede04cf7ca3864de9514"
        };
        firebase.initializeApp(firebaseConfig);
    }

    firebase.firestore()
        .collection('link_instagram')
        .orderBy('data', 'desc')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const linkElement = document.createElement('div');
                linkElement.className = 'link-item';
                linkElement.innerHTML = `
                    <div class="link-name">${data.nome}</div>
                    <a href="${data.url}" target="_blank" class="link-url">${data.url}</a>
                `;
                linksContainer.appendChild(linkElement);
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar links:", error);
            const errorElement = document.createElement('div');
            errorElement.style.textAlign = 'center';
            errorElement.style.color = '#dc3545';
            errorElement.style.padding = '2rem';
            errorElement.innerText = 'Erro ao carregar os links. Por favor, tente novamente mais tarde.';
            linksContainer.appendChild(errorElement);
        });
}
