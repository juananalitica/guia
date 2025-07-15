export class LoginView {
    static render() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Iniciar Sesión</h2>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn-primary">Iniciar Sesión</button>
                    </form>
                    <div class="auth-link">
                        ¿No tienes cuenta? <a href="#" id="register-link">Regístrate</a>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    static attachEventListeners() {
        const form = document.getElementById('login-form');
        const registerLink = document.getElementById('register-link');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const result = await window.authService.login(email, password);
            
            if (result.success) {
                window.router.navigate('/dashboard');
            } else {
                this.showError(result.message);
            }
        });

        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.router.navigate('/register');
        });
    }

    static showError(message) {
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            const form = document.getElementById('login-form');
            form.insertBefore(errorDiv, form.firstChild);
        }
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
} 