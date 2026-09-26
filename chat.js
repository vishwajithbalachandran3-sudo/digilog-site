(function () {
  const markup = `<button class="chat-launcher" aria-label="Open Digilog support chat">◌</button><section class="chat-window" aria-label="Digilog support chat"><header class="chat-top"><div><strong>Digilog Support</strong><small>Online support assistant</small></div><button class="chat-close" aria-label="Close chat">×</button></header><div class="chat-messages"><div class="chat-message bot">Hello. How can we help you today?</div></div><div class="chat-options"><button data-question="power">Power conditioning</button><button data-question="solar">Solar systems</button><button data-question="tracking">Vehicle tracking</button><button data-question="custom">Custom requirement</button></div><form class="chat-form"><input aria-label="Chat message" placeholder="Type your question…"><button aria-label="Send message">→</button></form></section>`;
  document.body.insertAdjacentHTML('beforeend', markup);
  const win = document.querySelector('.chat-window');
  const messages = document.querySelector('.chat-messages');
  const input = document.querySelector('.chat-form input');
  const answers = { power: 'Tell us the required power rating, application, quantity, and operating conditions.', solar: 'Let us know whether you need solar monitoring, charge control, or solar street lighting, along with the project scale.', tracking: 'Please share the vehicle type, fleet size, tracking requirements, and expected deployment schedule.', custom: 'Describe the product, application, quantity, delivery schedule, and customization you require.' };
  function add(text, type) { const item = document.createElement('div'); item.className = `chat-message ${type}`; item.textContent = text; messages.appendChild(item); messages.scrollTop = messages.scrollHeight; }
  function respond(text, key) { add(text, 'user'); setTimeout(() => add(answers[key] || 'Thanks for your message. For direct assistance, email digilogmicro@info.com and our team will reply during business hours.', 'bot'), 350); }
  document.querySelector('.chat-launcher').addEventListener('click', () => { win.classList.toggle('open'); if (win.classList.contains('open')) input.focus(); });
  document.querySelector('.chat-close').addEventListener('click', () => win.classList.remove('open'));
  document.querySelectorAll('.chat-options button').forEach(button => button.addEventListener('click', () => respond(button.textContent, button.dataset.question)));
  document.querySelector('.chat-form').addEventListener('submit', event => { event.preventDefault(); const text = input.value.trim(); if (!text) return; respond(text); input.value = ''; });
})();
