import { redirect } from "next/navigation";

export default function LoginPage() {
  const userSession = {
    user: "1",
  };
  const user = userSession.user;
  if (!user) {
    redirect("/i/flow/login");
  }
  {
    redirect("/home");
  }
}
