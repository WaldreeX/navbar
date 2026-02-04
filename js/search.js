
    // EJEMPLO DE CÓMO AGREGAR COSAS PARA BUSCAR
    const pagesIndex = [
        {
            title: "Buscador",
            url: "sub-page/search.html", // Página a la que irá al hacer clic
            category: "productos",
            description: "Remera clásica 100% algodón, ideal para verano.",
            keywords: ["Buscador", "Escurdiñar", "Buscar", "Ojear", "t-shirt", "mirar"]
        },
        {
            title: "Remera Deportiva Dry-Fit",
            url: "remera-deportiva.html",
            category: "productos",
            description: "Remera para entrenamiento de alto rendimiento.",
            keywords: ["remera", "deporte", "gym", "dryfit", "entrenamiento"]
        },
        {
            title: "Asesoría de Estilo",
            url: "servicios/asesoria.html",
            category: "servicios",
            description: "Te ayudamos a elegir tu mejor look.",
            keywords: ["ayuda", "estilo", "moda", "servicio"]
        }
    ];
    let currentCategory = 'all';
    const searchInput = document.getElementById('search-input');
    const resultsPanel = document.getElementById('results-panel');
    const resultsList = document.getElementById('results-list');
    const noResults = document.getElementById('no-results');
    const clearBtn = document.getElementById('clear-search');
    const filterBtn = document.getElementById('filter-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    const filterBadge = document.getElementById('filter-badge');
    const categoryItems = document.querySelectorAll('.category-item');
    lucide.createIcons();
    function toggleFilterMenu() {
        filterDropdown.classList.toggle('hidden');
        filterDropdown.classList.toggle('show');
    }
    function performSearch() {
        const query = searchInput.value;
        const cleanQuery = query.toLowerCase().trim();
        
        if (cleanQuery.length === 0) {
            resultsPanel.classList.add('hidden');
            clearBtn.classList.add('hidden');
            return;
        }
        clearBtn.classList.remove('hidden');
        
        const filtered = pagesIndex.filter(page => {
            const matchesText = page.title.toLowerCase().includes(cleanQuery) || 
                                page.description.toLowerCase().includes(cleanQuery) ||
                                page.keywords.some(k => k.toLowerCase().includes(cleanQuery));
            
            const matchesCategory = currentCategory === 'all' || page.category === currentCategory;
            return matchesText && matchesCategory;
        });
        renderResults(filtered);
    }
    function renderResults(results) {
        resultsList.innerHTML = '';
        resultsPanel.classList.remove('hidden');
        if (results.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }
        noResults.classList.add('hidden');
        results.forEach(result => {
            const item = document.createElement('a');
            item.href = result.url;
            item.className = "block p-3 hover:bg-blue-50 rounded-lg transition-colors group";
            item.innerHTML = `
                <div class="flex items-start gap-3">
                    <div class="mt-1 text-blue-500 group-hover:scale-110 transition-transform">
                        <i data-lucide="tag" class="w-4 h-4"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-center mb-0.5">
                            <p class="text-sm font-semibold text-gray-800">${result.title}</p>
                            <span class="text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">${result.category}</span>
                        </div>
                        <p class="text-xs text-gray-500 line-clamp-1">${result.description}</p>
                    </div>
                </div>
            `;
            resultsList.appendChild(item);
        });
        lucide.createIcons();
    }
    searchInput.addEventListener('input', performSearch);
    filterBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleFilterMenu(); });
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            categoryItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.check-icon').classList.add('hidden');
            });
            item.classList.add('active');
            item.querySelector('.check-icon').classList.remove('hidden');
            currentCategory = item.dataset.category;
            filterBadge.classList.toggle('hidden', currentCategory === 'all');
            toggleFilterMenu();
            performSearch();
        });
    });
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch();
        searchInput.focus();
    });
    document.addEventListener('click', (e) => {
        if (!document.getElementById('search-component').contains(e.target)) {
            resultsPanel.classList.add('hidden');
            filterDropdown.classList.add('hidden');
            filterDropdown.classList.remove('show');
        }
    });