import { SignInButton, SignedOut, UserButton, SignedIn } from '@clerk/nextjs'

export const TopBar = () => {
    return (
        <div>
       <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
    );
}