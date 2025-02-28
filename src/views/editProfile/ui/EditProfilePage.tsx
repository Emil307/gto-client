import { Header } from "@/src/widgets/header";
import { EditProfile } from "@/src/widgets/profile";

export default function EditProfilePage() {
  return (
    <>
      <Header
        title="Изменение Профиля"
        confirmClose={false}
        backButtonLink="/profile"
      />
      <EditProfile />
    </>
  );
}
