import { saveUserToDb } from "@/actions/save-user";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

function DashboardPage() {
  saveUserToDb();
  return (
    <>
      <LogoutLink>Logout</LogoutLink>
    </>
  );
}
export default DashboardPage;
