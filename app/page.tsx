import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <>
      <LoginLink>Sign In</LoginLink>
      <RegisterLink>Sign Up</RegisterLink>
    </>
  );
}
