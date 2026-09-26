(function () {
  const markup = `<button class="chat-launcher" aria-label="Open Digilog support chat">◌</button><section class="chat-window" aria-label="Digilog support chat"><header class="chat-top"><div><strong>Digilog Support</strong><small>Online support assistant</small></div><button class="chat-close" aria-label="Close chat">×</button></header><div class="chat-messages"><div class="chat-message bot">Hello. How can we help you today?</div></div><div class="chat-options"><button data-question="project">Engineering project</button><button data-question="hardware">Hardware design</button><button data-question="firmware">Firmware development</button><button data-question="automation">Automation support</button></div><form class="chat-form"><input aria-label="Chat message" placeholder="Type your question…"><button aria-label="Send message">→</button></form></section>`;
  document.body.insertAdjacentHTML('beforeend', markup);
  const win = document.querySelector('.chat-window');
  const messages = document.querySelector('.chat-messages');
  const input = document.querySelector('.chat-form input');
  const answers = { project: 'For embedded systems, firmware, IoT, or automation work, use the inquiry form on our Company page or email digilogmicro@info.com.', hardware: 'Tell us about the device, operating environment, interfaces, and current development stage.', firmware: 'Share the microcontroller or platform, required functions, interfaces, and any existing code or hardware.', automation: 'Describe the equipment, process, current controls, and the result you want to achieve.' };
  function add(text, type) { const item = document.createElement('div'); item.className = `chat-message ${type}`; item.textContent = text; messages.appendChild(item); messages.scrollTop = messages.scrollHeight; }
  function respond(text, key) { add(text, 'user'); setTimeout(() => add(answers[key] || 'Thanks for your message. For direct assistance, email digilogmicro@info.com and our team will reply during business hours.', 'bot'), 350); }
  document.querySelector('.chat-launcher').addEventListener('click', () => { win.classList.toggle('open'); if (win.classList.contains('open')) input.focus(); });
  document.querySelector('.chat-close').addEventListener('click', () => win.classList.remove('open'));
  document.querySelectorAll('.chat-options button').forEach(button => button.addEventListener('click', () => respond(button.textContent, button.dataset.question)));
  document.querySelector('.chat-form').addEventListener('submit', event => { event.preventDefault(); const text = input.value.trim(); if (!text) return; respond(text); input.value = ''; });
})();
