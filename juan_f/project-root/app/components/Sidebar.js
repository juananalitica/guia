export class Sidebar {
    static render(user, activeRoute = '') {
        return `
            <div class="sidebar">
                <div class="user-info">
                    <img src="${user.avatar}" alt="Avatar" class="user-avatar">
                    <h3>${user.fullName}</h3>
                    <p>${user.role === 'admin' ? 'Administrador' : 'Visitante'}</p>
                </div>
                
                <nav>
                    ${user.role === 'admin' ? this.renderAdminNav(activeRoute) : this.renderVisitorNav(activeRoute)}
                </nav>
                
                <button id="logout-btn" class="logout-btn">Cerrar Sesión</button>
            </div>
        `;
    }

    static renderAdminNav(activeRoute) {
        return `
            <button class="nav-btn ${activeRoute === '/dashboard' ? 'active' : ''}" data-route="/dashboard">
                Eventos
            </button>
        `;
    }

    static renderVisitorNav(activeRoute) {
        return `
            <button class="nav-btn ${activeRoute === '/dashboard' ? 'active' : ''}" data-route="/dashboard">
                Eventos
            </button>
            <button class="nav-btn ${activeRoute === '/dashboard/enrollments' ? 'active' : ''}" data-route="/dashboard/enrollments">
                Mis Inscripciones
            </button>
        `;
    }

    static attachEventListeners() {
        // Navegación
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const route = btn.dataset.route;
                window.router.navigate(route);
            });
        });

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.authService.logout();
                window.router.navigate('/login');
            });
        }
    }
} 