export class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        
        // Manejar navegación del navegador
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname);
        });
    }

    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    async navigate(path) {
        window.history.pushState({}, '', path);
        await this.handleRoute(path);
    }

    async handleRoute(path) {
        const handler = this.routes.get(path);
        
        if (handler) {
            this.currentRoute = path;
            await handler();
        } else {
            // Ruta no encontrada
            window.history.pushState({}, '', '/not-found');
            const notFoundHandler = this.routes.get('/not-found');
            if (notFoundHandler) {
                await notFoundHandler();
            }
        }
    }

    init() {
        const path = window.location.pathname;
        this.handleRoute(path);
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
} 