import { Sidebar } from '../components/Sidebar.js';

export class AdminDashboardView {
    static async render() {
        const user = window.authService.getCurrentUser();
        const events = await window.eventService.getAllEvents();
        
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="dashboard-layout">
                ${Sidebar.render(user, '/dashboard')}
                <div class="main-content">
                    <div class="content-header">
                        <h1>Gestión de Eventos</h1>
                        <button id="add-event-btn" class="btn-primary">Crear Evento</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Capacidad</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${events.map(event => this.renderEventRow(event)).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        Sidebar.attachEventListeners();
        this.attachEventListeners();
    }

    static renderEventRow(event) {
        const isFull = window.eventService.isEventFull(event);
        
        return `
            <tr>
                <td>
                    <img src="${event.image}" alt="${event.name}" style="width: 60px; height: 40px; object-fit: cover;">
                </td>
                <td>${event.name}</td>
                <td>${event.description}</td>
                <td>
                    ${event.enrolledUsers.length}/${event.capacity}
                    ${isFull ? ' (LLENO)' : ''}
                </td>
                <td>${new Date(event.date).toLocaleDateString()}</td>
                <td>
                    <button class="btn-edit" data-event-id="${event.id}">Editar</button>
                    <button class="btn-delete" data-event-id="${event.id}">Eliminar</button>
                </td>
            </tr>
        `;
    }

    static attachEventListeners() {
        const addEventBtn = document.getElementById('add-event-btn');
        const editButtons = document.querySelectorAll('.btn-edit');
        const deleteButtons = document.querySelectorAll('.btn-delete');

        addEventBtn.addEventListener('click', () => {
            window.router.navigate('/dashboard/events/create');
        });

        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = e.target.dataset.eventId;
                // Por simplicidad, redirigimos a crear evento
                window.router.navigate('/dashboard/events/create');
            });
        });

        deleteButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const eventId = e.target.dataset.eventId;
                
                if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
                    const result = await window.eventService.deleteEvent(eventId);
                    
                    if (result.success) {
                        this.render();
                    } else {
                        alert('Error al eliminar el evento: ' + result.message);
                    }
                }
            });
        });
    }
} 