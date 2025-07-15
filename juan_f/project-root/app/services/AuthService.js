export class AuthService {
    constructor() {
        this.baseURL = 'http://localhost:3000';
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/users?email=${email}`);
            const users = await response.json();
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // No almacenar la contraseña en localStorage
                const { password, ...userWithoutPassword } = user;
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                return { success: true, user: userWithoutPassword };
            } else {
                return { success: false, message: 'Email o contraseña incorrectos' };
            }
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, message: 'Error de conexión' };
        }
    }

    async register(fullName, email, password) {
        try {
            // Verificar si el usuario ya existe
            const response = await fetch(`${this.baseURL}/users?email=${email}`);
            const existingUsers = await response.json();
            
            if (existingUsers.length > 0) {
                return { success: false, message: 'El email ya está registrado' };
            }

            // Crear nuevo usuario
            const newUser = {
                fullName,
                email,
                password,
                role: 'visitor', // Por defecto todos son visitantes
                avatar: `https://via.placeholder.com/50x50/8B5CF6/FFFFFF?text=${fullName.charAt(0)}`
            };

            const createResponse = await fetch(`${this.baseURL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (createResponse.ok) {
                const createdUser = await createResponse.json();
                const { password, ...userWithoutPassword } = createdUser;
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                return { success: true, user: userWithoutPassword };
            } else {
                return { success: false, message: 'Error al crear el usuario' };
            }
        } catch (error) {
            console.error('Error en registro:', error);
            return { success: false, message: 'Error de conexión' };
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }

    isVisitor() {
        const user = this.getCurrentUser();
        return user && user.role === 'visitor';
    }
} 