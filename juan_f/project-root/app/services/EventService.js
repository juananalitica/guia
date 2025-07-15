export class EventService {
    constructor() {
        this.baseURL = 'http://localhost:3000';
    }

    async getAllEvents() {
        try {
            const response = await fetch(`${this.baseURL}/events`);
            return await response.json();
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
            return [];
        }
    }

    async getEventById(id) {
        try {
            const response = await fetch(`${this.baseURL}/events/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error obteniendo evento:', error);
            return null;
        }
    }

    async createEvent(eventData) {
        try {
            const response = await fetch(`${this.baseURL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...eventData,
                    enrolledUsers: []
                })
            });
            
            if (response.ok) {
                return { success: true, event: await response.json() };
            } else {
                return { success: false, message: 'Error al crear el evento' };
            }
        } catch (error) {
            console.error('Error creando evento:', error);
            return { success: false, message: 'Error de conexión' };
        }
    }

    async updateEvent(id, eventData) {
        try {
            const response = await fetch(`${this.baseURL}/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            
            if (response.ok) {
                return { success: true, event: await response.json() };
            } else {
                return { success: false, message: 'Error al actualizar el evento' };
            }
        } catch (error) {
            console.error('Error actualizando evento:', error);
            return { success: false, message: 'Error de conexión' };
        }
    }

    async deleteEvent(id) {
        try {
            const response = await fetch(`${this.baseURL}/events/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                return { success: true };
            } else {
                return { success: false, message: 'Error al eliminar el evento' };
            }
        } catch (error) {
            console.error('Error eliminando evento:', error);
            return { success: false, message: 'Error de conexión' };
        }
    }

    async enrollUser(eventId, userId) {
        try {
            // Obtener el evento actual
            const event = await this.getEventById(eventId);
            if (!event) {
                return { success: false, message: 'Evento no encontrado' };
            }

            // Verificar si hay capacidad
            if (event.enrolledUsers.length >= event.capacity) {
                return { success: false, message: 'El evento está lleno' };
            }

            // Verificar si el usuario ya está inscrito
            if (event.enrolledUsers.includes(userId)) {
                return { success: false, message: 'Ya estás inscrito en este evento' };
            }

            // Agregar usuario al evento
            const updatedEvent = {
                ...event,
                enrolledUsers: [...event.enrolledUsers, userId]
            };

            const response = await fetch(`${this.baseURL}/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedEvent)
            });

            if (response.ok) {
                // Crear registro de inscripción
                await fetch(`${this.baseURL}/enrollments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId,
                        eventId,
                        enrollmentDate: new Date().toISOString().split('T')[0]
                    })
                });

                return { success: true };
            } else {
                return { success: false, message: 'Error al inscribirse' };
            }
        } catch (error) {
            console.error('Error inscribiendo usuario:', error);
            return { success: false, message: 'Error de conexión' };
        }
    }

    // Métodos de utilidad
    getAvailableSpots(event) {
        return event.capacity - event.enrolledUsers.length;
    }

    isEventFull(event) {
        return event.enrolledUsers.length >= event.capacity;
    }

    isUserEnrolled(event, userId) {
        return event.enrolledUsers.includes(userId);
    }
} 