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

// Verifica se o elemento 'linksContainer' existe (página 'enjamento')
const linksContainer = document.getElementById('linksContainer');

// Executa o código apenas se o elemento existir
if (linksContainer) {
    // Função para detectar dispositivo móvel
    function isMobileDevice() {
        // Testes para identificar dispositivos móveis ou tablets
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        
        return (
            mobileRegex.test(navigator.userAgent) || 
            screenWidth <= 1024 || // Considera tablets e celulares
            ('ontouchstart' in window) || // Verifica suporte a toque
            navigator.maxTouchPoints > 0 // Número de pontos de toque
        );
    }

    // Elemento de aviso móvel e conteúdo desktop
    const mobileWarning = document.getElementById('mobileWarning');
    const desktopContent = document.getElementById('desktopContent');

    // Executa verificação ao carregar a página
    window.addEventListener('load', () => {
        if (isMobileDevice()) {
            // Dispositivo móvel
            mobileWarning.style.display = 'block';
            desktopContent.style.display = 'none';
        } else {
            // Desktop
            mobileWarning.style.display = 'none';
            desktopContent.style.display = 'block';
        }
    });

    const linksArea = document.getElementById('linksArea');
    const openLinksBtn = document.getElementById('openLinksBtn');
    const clearLinksBtn = document.getElementById('clearLinksBtn');

    openLinksBtn.addEventListener('click', () => {
        // Remove espaços em branco antes e depois do conteúdo
        const links = linksArea.value.trim().split('\n');
        
        // Filtra links vazios
        const validLinks = links
            .map(link => link.trim())
            .filter(link => link !== '');

        // Verifica se há links
        if (validLinks.length === 0) {
            alert('Por favor, insira alguns links.');
            return;
        }

        // Abre cada link em uma nova aba
        validLinks.forEach((link, index) => {
            try {
                // Verifica se o link é válido
                new URL(link);
                
                console.log(`Abrindo link ${index + 1}:`, link);
                
                // Abre o link em nova aba
                window.open(link, '_blank');
            } catch (error) {
                console.error(`Link inválido: ${link}`, error);
            }
        });
    });

    // Adiciona evento de clique para limpar a textarea
    clearLinksBtn.addEventListener('click', () => {
        linksArea.value = '';
        linksArea.focus();
    });
}
