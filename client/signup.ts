const signupForm = document.querySelector<HTMLFormElement>('#email-signup');

if (signupForm) {
  const email = document.querySelector<HTMLInputElement>('#email')!;
  const modal = document.querySelector<HTMLDialogElement>('#signup-modal')!;
  const title = document.querySelector<HTMLElement>('#modal-title')!;
  const message = document.querySelector<HTMLElement>('#modal-message')!;
  signupForm.addEventListener('submit', event => {
    event.preventDefault();
    const valid = email.checkValidity();
    title.textContent = valid ? 'Subscription confirmed' : 'Subscription not confirmed';
    message.textContent = valid ? 'Thank you for exploring with us. This sample signup does not send emails.' : 'Enter an email address in the format you@example.com.';
    modal.showModal();
    if (valid) signupForm.reset();
  });
  document.querySelector('#close-modal')!.addEventListener('click', () => modal.close());
}

const addToBasket = document.querySelector<HTMLButtonElement>('.product-form button[type="button"]');

if (addToBasket) {
  const modal = document.createElement('dialog');
  modal.innerHTML = '<button class="modal-close" aria-label="Close confirmation" type="button">X</button><h2>Added to basket</h2><p>Your bicycle has been added to the basket.</p>';
  document.body.append(modal);
  let timeout: ReturnType<typeof setTimeout>;
  const closeModal = () => modal.close();
  addToBasket.addEventListener('click', () => {
    clearTimeout(timeout);
    modal.showModal();
    timeout = setTimeout(closeModal, 5000);
  });
  modal.querySelector('.modal-close')!.addEventListener('click', closeModal);
  modal.addEventListener('close', () => clearTimeout(timeout));
}
