<script>
import Modal from "./Modal.svelte";
import { writable } from "svelte/store";

const isModalOpen = writable(false); // Using a Svelte store for modal state

    const isPrivacyModalOpen = writable(false);

    
    function handleOpenModal(event) {
      event.preventDefault();
      isModalOpen.set(true);
    }

    // Content for the Terms & Conditions modal
    const termsContent = `

<p class="dark:text-slate-400 text-slate-500 italic mb-2">Last updated: 13 Aug 2023</p>

<p class="mb-2 leading-relaxed">Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using Swift Proposal (the "Service") operated by SwiftThings ("us", "we", or "our").</p>

<p class="mb-2 leading-relaxed">Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all users and others who access or use the Service.</p>

<p class="mb-2 leading-relaxed">By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

<h3 class="text-lg mb-1 mt-3">1. Accounts</h3>
<p class="leading-relaxed">When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

<h3 class="text-lg mb-1 mt-3">2. Use of the Service</h3>
<p class="leading-relaxed">You agree to use the Service in accordance with all applicable local, state, national, and international laws, rules, and regulations.</p>

<h3 class="text-lg mb-1 mt-3">3. Termination</h3>
<p class="leading-relaxed">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

<h3 class="text-lg mb-1 mt-3">4. Governing Law</h3>
<p class="leading-relaxed">These Terms shall be governed and construed in accordance with the laws of Cairo, Egypt, without regard to its conflict of law provisions.</p>

<h3 class="text-lg mb-1 mt-3">5. Changes</h3>
<p class="leading-relaxed">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 7 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

<p class="leading-relaxed">If you have any questions about these Terms, please <a href="mailto:contact@example.com">contact us</a>.</p>
`;

const privacyContent = `
<p class="dark:text-slate-400 text-slate-500 italic mb-2">Last updated: 13 Aug 2023</p>


<h4 class="text-lg mb-1 mt-3">1. Introduction</h4>
<p class="leading-relaxed">At Swift Proposal, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.</p>

<h4 class="text-lg mb-1 mt-3">2. Information We Collect</h4>
<p class="leading-relaxed">We may collect the following types of information:</p>
<ul>
  <li class="leading-relaxed"><strong>Personal Information:</strong> Such as your name, email address, and contact details.</li>
  <li class="leading-relaxed"><strong>Usage Data:</strong> Information about how you use our service.</li>
  <li class="leading-relaxed"><strong>Cookies and Tracking Data:</strong> We may use cookies to track activity on our website.</li>
</ul>

<h4 class="text-lg mb-1 mt-3">3. How We Use Your Information</h4>
<p class="leading-relaxed">We may use your personal information for the following purposes:</p>
<ul>
  <li class="leading-relaxed">To provide and maintain our service.</li>
  <li class="leading-relaxed">To notify you about changes to our service.</li>
  <li class="leading-relaxed">To provide customer support.</li>
  <li class="leading-relaxed">To gather analysis or valuable information to improve our service.</li>
  <li class="leading-relaxed">To monitor the usage of our service.</li>
</ul>

<h4 class="text-lg mb-1 mt-3">4. Sharing Your Information</h4>
<p class="leading-relaxed">We do not sell or share your personal information with third parties for marketing purposes. We may share your information with third-party service providers to provide and support our service.</p>

<h4 class="text-lg mb-1 mt-3">5. Security</h4>
<p class="leading-relaxed">We take the security of your information seriously and use appropriate security measures to prevent unauthorized access, disclosure, alteration, or destruction of your information.</p>

<h4 class="text-lg mb-1 mt-3">6. Your Rights</h4>
<p class="leading-relaxed">You have the right to access, update, or delete the personal information we have on you. You can contact us at any time to exercise these rights.</p>

<h4 class="text-lg mb-1 mt-3">7. Changes to This Privacy Policy</h4>
<p class="leading-relaxed">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

<h4 class="text-lg mb-1 mt-3">8. Contact Us</h4>
<p class="leading-relaxed">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
<address>
  Email: support@fekryaiad.com<br>
</address>

`;

function handleOpenPrivacyModal(event) {
  event.preventDefault();
  isPrivacyModalOpen.set(true);
}

function handleClosePrivacyModal() {
  isPrivacyModalOpen.set(false);
}



    // Function to close the modal
    function handleCloseModal() {
      isModalOpen.set(false);
    }


</script>

<footer class="  border-t dark:border-slate-900 border-slate-200 shadow-2xl dark:shadow-slate-950 shadow-slate-50  min-w-full bottom-0 flex gap-y-3 flex-col sm:flex-row items-center justify-center py-6   dark:bg-slate-950 bg-slate-50">
    <a href="#" on:click={handleOpenModal} class="text-sm text-slate-500 hover:text-slate-300 transition-all mx-3">Terms & Conditions</a>
    <a href="#" on:click={handleOpenPrivacyModal} class="text-sm text-slate-500 hover:text-slate-300 transition-all mx-3">Privacy Policy</a>
    <a href="https://twitter.com/FekryAiad" class="text-sm text-slate-500 hover:text-slate-300 transition-all mx-3" >Reach Out</a>
  </footer>
  <Modal {isModalOpen} title="Terms & Conditions" content={termsContent} on:close={handleCloseModal} />
  <Modal {isPrivacyModalOpen} title="Privacy Policy" content={privacyContent} on:close={handleClosePrivacyModal} />

  