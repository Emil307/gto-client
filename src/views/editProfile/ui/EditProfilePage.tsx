import { Header } from "@/src/widgets/header";
import { EditProfile } from "@/src/widgets/profile";

export default function EditProfilePage() {
  return (
    <>
      <Header title="Редактирование Профиля" confirmClose={true} />
      <EditProfile />
    </>
  );
}
