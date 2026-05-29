        // Obtener elementos del DOM
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navbarMenu = document.getElementById('navbarMenu');
        const navbarOverlay = document.getElementById('navbarOverlay');
        const navbarLinks = document.querySelectorAll('.navbar-link');
        const body = document.body;

        // Función para abrir/cerrar el menú
        function toggleMenu() {
            hamburgerBtn.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            navbarOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        }

        // Función para cerrar el menú
        function closeMenu() {
            hamburgerBtn.classList.remove('active');
            navbarMenu.classList.remove('active');
            navbarOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }

        // Evento al hacer click en el botón hamburguesa
        hamburgerBtn.addEventListener('click', toggleMenu);

        // Evento al hacer click en el overlay para cerrar el menú
        navbarOverlay.addEventListener('click', closeMenu);

        // Cerrar el menú cuando se hace click en un enlace
        navbarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                closeMenu();
            });
        });

        // Cerrar el menú cuando se hace click fuera del menú en móvil
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = navbarMenu.contains(e.target);
            const isClickOnHamburger = hamburgerBtn.contains(e.target);

            if (!isClickInsideMenu && !isClickOnHamburger && navbarMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Cerrar el menú cuando se redimensiona la ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });