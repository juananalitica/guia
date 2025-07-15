import { Router } from './router/Router.js';
import { AuthService } from './services/AuthService.js';
import { EventService } from './services/EventService.js';
import { EnrollmentService } from './services/EnrollmentService.js';

// Inicializar servicios
window.authService = new AuthService();
window.eventService = new EventService();
window.enrollmentService = new EnrollmentService();

// Inicializar router
const router = new Router();
window.router = router;

// Configurar rutas
router.addRoute('/', () => {
    const user = window.authService.getCurrentUser();
    if (user) {
        router.navigate('/dashboard');
    } else {
        router.navigate('/login');
    }
});

router.addRoute('/login', () => {
    const user = window.authService.getCurrentUser();
    if (user) {
        router.navigate('/dashboard');
        return;
    }
    import('./views/LoginView.js').then(module => {
        module.LoginView.render();
    });
});

router.addRoute('/register', () => {
    const user = window.authService.getCurrentUser();
    if (user) {
        router.navigate('/dashboard');
        return;
    }
    import('./views/RegisterView.js').then(module => {
        module.RegisterView.render();
    });
});

router.addRoute('/dashboard', () => {
    const user = window.authService.getCurrentUser();
    if (!user) {
        router.navigate('/login');
        return;
    }
    
    if (user.role === 'admin') {
        import('./views/AdminDashboardView.js').then(module => {
            module.AdminDashboardView.render();
        });
    } else {
        import('./views/VisitorDashboardView.js').then(module => {
            module.VisitorDashboardView.render();
        });
    }
});

router.addRoute('/dashboard/events/create', () => {
    const user = window.authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
        router.navigate('/not-found');
        return;
    }
    import('./views/CreateEventView.js').then(module => {
        module.CreateEventView.render();
    });
});

router.addRoute('/dashboard/enrollments', () => {
    const user = window.authService.getCurrentUser();
    if (!user || user.role !== 'visitor') {
        router.navigate('/not-found');
        return;
    }
    import('./views/EnrollmentsView.js').then(module => {
        module.EnrollmentsView.render();
    });
});

router.addRoute('/not-found', () => {
    import('./views/NotFoundView.js').then(module => {
        module.NotFoundView.render();
    });
});

// Iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    router.init();
}); 