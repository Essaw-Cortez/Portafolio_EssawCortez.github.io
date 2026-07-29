document.addEventListener("DOMContentLoaded", () => {
    // 1. Animación Reveal al hacer Scroll
    const revealElements = document.querySelectorAll(
        "section, .card, .contacto-item, #expertise .col"
    );

    revealElements.forEach((el) => el.classList.add("reveal"));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Ejecutar al cargar la página

    // 2. Resaltar enlace de la Navbar según la sección activa (Scrollspy)
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const activateNavLink = () => {
        let scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", activateNavLink);

    // 3. Cerrar el menú desplegable en móvil al hacer clic en un enlace
    const navItems = document.querySelectorAll(".navbar-collapse .nav-link, .navbar-collapse .btn");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (navbarCollapse.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // 4. Efecto de elevación en la Navbar al hacer Scroll
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.8)";
        } else {
            header.style.boxShadow = "none";
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (event) {
        // Evitar el comportamiento de envío predeterminado (redirección)
        event.preventDefault();

        // Obtener los datos del formulario
        const formData = new FormData(this);

        // Enviar datos de forma asincrónica a la URL de Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    // Éxito: Mostrar un mensaje y restablecer el formulario
                    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
                    contactForm.reset();
                } else {
                    // Error del servidor: Mostrar un mensaje de error
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert('Oops, hubo un problema al enviar tu mensaje: ' + data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert('Oops, hubo un problema al enviar tu mensaje. Inténtalo de nuevo más tarde.');
                        }
                    })
                }
            })
            .catch(error => {
                // Error de red: Mostrar un mensaje de error
                alert('Hubo un problema de red al enviar tu mensaje. Verifica tu conexión e inténtalo de nuevo.');
                console.error('Error:', error);
            });
    });
});