import { signUp } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  if (!signupForm) return;

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = await signUp(email, password);
    if (user) {
      alert('注册成功，请登录');
      window.location.href = 'login.html';
    }
  });
});
