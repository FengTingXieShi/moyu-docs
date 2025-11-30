import { signIn } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = await signIn(email, password);
    if (user) {
      alert('登录成功');
      window.location.href = 'index.html';
    }
  });
});
