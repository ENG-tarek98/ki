document.getElementById('login').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === '1235' && password === '1235') {
    window.location.href = 'administration.html';
  } else {
    alert('Invalid email or password');
  }
});