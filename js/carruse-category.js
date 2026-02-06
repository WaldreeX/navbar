
    const track = document.getElementById('track');
    // Función para los botones Pag-1 y Pag-2
    function scrollToEnd(direction) {
        const scrollAmount = direction === 'left' ? -track.offsetWidth : track.offsetWidth;
        track.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    // Evitar que el scroll horizontal bloquee el scroll vertical de la página
    let isScrolling;
    track.addEventListener('scroll', function ( e ) {
        window.clearTimeout( isScrolling );
        isScrolling = setTimeout(function() {
            // Finalizó el scroll
        }, 66);
    }, false);

    