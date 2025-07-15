export class RegisterView {
    static render() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Registro</h2>
                    <form id="register-form">
                        <div class="form-group">
                            <label for="fullName">Nombre Completo</label>
                            <input type="text" id="fullName" name="fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">Confirmar Contraseña</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required>
                        </div>
                        <button type="submit" class="btn-primary">Registrarse</button>
                    </form>
                    <div class="auth-link">
                        ¿Ya tienes cuenta? <a href="#" id="login-link">Inicia Sesión</a>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    static attachEventListeners() {
        const form = document.getElementById('register-form');
        const loginLink = document.getElementById('login-link');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validaciones básicas
            if (password !== confirmPassword) {
                this.showError('Las contraseñas no coinciden');
                return;
            }

            if (password.length < 6) {
                this.showError('La contraseña debe tener al menos 6 caracteres');
                return;
            }

            const result = await window.authService.register(fullName, email, password);
            
            if (result.success) {
                window.router.navigate('/dashboard');
            } else {
                this.showError(result.message);
            }
        });

        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.router.navigate('/login');
        });
    }

    static showError(message) {
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            const form = document.getElementById('register-form');
            form.insertBefore(errorDiv, form.firstChild);
        }
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
} 