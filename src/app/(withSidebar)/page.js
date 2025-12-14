
import { redirect } from "next/navigation";
import HomeWrapper from "../components/HomeWrapper";
import { cookies } from "next/headers";

export default async function Home() {
  let id=(await cookies()).get('id')
  if(!id)redirect('/login')
return (
    <HomeWrapper></HomeWrapper>

  )
}
