import { Sidebar } from '../components/Sidebar.js';

export class VisitorDashboardView {
    static async render() {
        const user = window.authService.getCurrentUser();
        const events = await window.eventService.getAllEvents();
        
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="dashboard-layout">
                ${Sidebar.render(user, '/dashboard')}
                <div class="main-content">
                    <div class="content-header">
                        <h1>Eventos Disponibles</h1>
                    </div>
                    <div class="events-grid">
                        ${events.map(event => this.renderEventCard(event, user.id)).join('')}
                    </div>
                </div>
            </div>
        `;

        Sidebar.attachEventListeners();
        this.attachEventListeners();
    }

    static renderEventCard(event, userId) {
        const isFull = window.eventService.isEventFull(event);
        const isEnrolled = window.eventService.isUserEnrolled(event, userId);
        
        let buttonText = 'Inscribirse';
        let buttonClass = 'btn-primary';
        let buttonDisabled = false;
        
        if (isEnrolled) {
            buttonText = 'Inscrito';
            buttonClass = 'btn-secondary';
            buttonDisabled = true;
        } else if (isFull) {
            buttonText = 'Lleno';
            buttonClass = 'btn-disabled';
            buttonDisabled = true;
        }
        
        return `
            <div class="event-card">
                <img src="${event.image}" alt="${event.name}" class="event-image">
                <div class="event-title">${event.name}</div>
                <div class="event-description">${event.description}</div>
                <div class="event-details">
                    <span>Fecha: ${new Date(event.date).toLocaleDateString()}</span>
                    <span>Cupos: ${event.enrolledUsers.length}/${event.capacity}</span>
                </div>
                <button 
                    class="enroll-btn ${buttonClass}" 
                    data-event-id="${event.id}"
                    ${buttonDisabled ? 'disabled' : ''}
                >
                    ${buttonText}
                </button>
            </div>
        `;
    }

    static attachEventListeners() {
        const enrollButtons = document.querySelectorAll('.enroll-btn:not([disabled])');

        enrollButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const eventId = e.target.dataset.eventId;
                const user = window.authService.getCurrentUser();
                
                const result = await window.eventService.enrollUser(eventId, user.id);
                
                if (result.success) {
                    this.render();
                } else {
                    alert('Error al inscribirse: ' + result.message);
                }
            });
        });
    }
} 