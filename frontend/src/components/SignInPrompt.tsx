import { SignInButton } from '@clerk/react';

interface SignInPromptProps {
  action: string;
}

function SignInPrompt({ action }: SignInPromptProps) {
  return (
    <div className="sign-in-prompt">
      <div className="sign-in-prompt-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <h3>Sign In Required</h3>
      <p>You need to be signed in to {action}.</p>
      <SignInButton mode="modal">
        <button className="sign-in-prompt-btn">Sign In</button>
      </SignInButton>
    </div>
  );
}

export default SignInPrompt;
