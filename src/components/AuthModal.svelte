<script>
  import { auth } from '../../api/firebase';
  import { GoogleAuthProvider } from 'firebase/auth';  // Import GoogleAuthProvider directly
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();  // Use GoogleAuthProvider directly
    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      console.log("User signed in:", user);
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };
</script>

<div class="w-screen h-screen bg-slate-950/10">
  <button on:click={signInWithGoogle}>Sign In with Google</button>
</div>
