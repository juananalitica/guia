import { Sidebar } from '../components/Sidebar.js';

export class EnrollmentsView {
    static async render() {
        const user = window.authService.getCurrentUser();
        const enrollments = await window.enrollmentService.getUserEnrollments(user.id);
        
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="dashboard-layout">
                ${Sidebar.render(user, '/dashboard/enrollments')}
                <div class="main-content">
                    <div class="content-header">
                        <h1>Mis Inscripciones</h1>
                    </div>
                    <div>
                        ${enrollments.length > 0 ? this.renderEnrollmentsTable(enrollments) : this.renderEmptyState()}
                    </div>
                </div>
            </div>
        `;

        Sidebar.attachEventListeners();
        this.attachEventListeners();
    }

    static renderEnrollmentsTable(enrollments) {
        return `
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha del Evento</th>
                        <th>Fecha de Inscripción</th>
                    </tr>
                </thead>
                <tbody>
                    ${enrollments.map(enrollment => this.renderEnrollmentRow(enrollment)).join('')}
                </tbody>
            </table>
        `;
    }

    static renderEnrollmentRow(enrollment) {
        return `
            <tr>
                <td>${enrollment.event.name}</td>
                <td>${enrollment.event.description}</td>
                <td>${new Date(enrollment.event.date).toLocaleDateString()}</td>
                <td>${new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
            </tr>
        `;
    }

    static renderEmptyState() {
        return `
            <div class="empty-state">
                <h3>No tienes inscripciones</h3>
                <p>Aún no te has inscrito en ningún evento. ¡Ve a Eventos para encontrar algo interesante!</p>
                <button id="go-to-events-btn" class="btn-primary">Ir a Eventos</button>
            </div>
        `;
    }

    static attachEventListeners() {
        const goToEventsBtn = document.getElementById('go-to-events-btn');
        
        if (goToEventsBtn) {
            goToEventsBtn.addEventListener('click', () => {
                window.router.navigate('/dashboard');
            });
        }
    }
} 