export class NotFoundView {
    static render() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="not-found-container">
                <div class="not-found-content">
                    <h1>404</h1>
                    <h2>Página no encontrada</h2>
                    <p>La página que buscas no existe.</p>
                    <button id="go-home-btn" class="btn-primary">Ir al Inicio</button>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    static attachEventListeners() {
        const goHomeBtn = document.getElementById('go-home-btn');
        
        goHomeBtn.addEventListener('click', () => {
            const user = window.authService.getCurrentUser();
            if (user) {
                window.router.navigate('/dashboard');
            } else {
                window.router.navigate('/login');
            }
        });
    }
} 