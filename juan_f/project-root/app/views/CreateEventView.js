import { Sidebar } from '../components/Sidebar.js';

export class CreateEventView {
    static render() {
        const user = window.authService.getCurrentUser();
        
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="dashboard-layout">
                ${Sidebar.render(user, '/dashboard')}
                <div class="main-content">
                    <div class="content-header">
                        <h1>Crear Evento</h1>
                    </div>
                    <div class="form-container">
                        <form id="create-event-form">
                            <div class="form-group">
                                <label for="name">Nombre</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="description">Descripción</label>
                                <textarea id="description" name="description" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="date">Fecha</label>
                                <input type="date" id="date" name="date" required>
                            </div>
                            <div class="form-group">
                                <label for="capacity">Capacidad</label>
                                <input type="number" id="capacity" name="capacity" min="1" required>
                            </div>
                            <div class="form-group">
                                <label for="image">URL de la Imagen</label>
                                <input type="url" id="image" name="image" required>
                            </div>
                            <div class="form-actions">
                                <button type="button" id="cancel-btn" class="btn-secondary">Cancelar</button>
                                <button type="submit" class="btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        Sidebar.attachEventListeners();
        this.attachEventListeners();
    }

    static attachEventListeners() {
        const form = document.getElementById('create-event-form');
        const cancelBtn = document.getElementById('cancel-btn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const eventData = {
                name: formData.get('name'),
                description: formData.get('description'),
                date: formData.get('date'),
                capacity: parseInt(formData.get('capacity')),
                image: formData.get('image')
            };

            const result = await window.eventService.createEvent(eventData);
            
            if (result.success) {
                window.router.navigate('/dashboard');
            } else {
                this.showError(result.message);
            }
        });

        cancelBtn.addEventListener('click', () => {
            window.router.navigate('/dashboard');
        });
    }

    static showError(message) {
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            const form = document.getElementById('create-event-form');
            form.insertBefore(errorDiv, form.firstChild);
        }
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
} 