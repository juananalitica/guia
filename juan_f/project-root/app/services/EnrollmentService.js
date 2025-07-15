export class EnrollmentService {
    constructor() {
        this.baseURL = 'http://localhost:3000';
    }

    async getUserEnrollments(userId) {
        try {
            const response = await fetch(`${this.baseURL}/enrollments?userId=${userId}`);
            const enrollments = await response.json();
            
            // Obtener detalles de los eventos
            const eventsWithDetails = await Promise.all(
                enrollments.map(async (enrollment) => {
                    const eventResponse = await fetch(`${this.baseURL}/events/${enrollment.eventId}`);
                    const event = await eventResponse.json();
                    return {
                        ...enrollment,
                        event
                    };
                })
            );
            
            return eventsWithDetails;
        } catch (error) {
            console.error('Error obteniendo inscripciones:', error);
            return [];
        }
    }

    async getAllEnrollments() {
        try {
            const response = await fetch(`${this.baseURL}/enrollments`);
            return await response.json();
        } catch (error) {
            console.error('Error obteniendo todas las inscripciones:', error);
            return [];
        }
    }

    async createEnrollment(userId, eventId) {
        try {
            const enrollment = {
                userId,
                eventId,
                enrollmentDate: new Date().toISOString().split('T')[0]
            };

            const response = await fetch(`${this.baseURL}/enrollments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enrollment)
            });

            if (response.ok) {
                return { success: true, enrollment: await response.json() };
            } else {
                return { success: false, message: 'Error al crear la inscripción' };
            }
        } catch (error) {
            console.error('Error creando inscripción:', error);
            return { success: false, message: 'Error de conexión' };
        }
    }

    async deleteEnrollment(enrollmentId) {
        try {
            const response = await fetch(`${this.baseURL}/enrollments/${enrollmentId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                return { success: true };
            } else {
                return { success: false, message: 'Error al eliminar la inscripción' };
            }
        } catch (error) {
            console.error('Error eliminando inscripción:', error);
            return { success: false, message: 'Error de conexión' };
        }
    }

    async isUserEnrolled(userId, eventId) {
        try {
            const response = await fetch(`${this.baseURL}/enrollments?userId=${userId}&eventId=${eventId}`);
            const enrollments = await response.json();
            return enrollments.length > 0;
        } catch (error) {
            console.error('Error verificando inscripción:', error);
            return false;
        }
    }
} 