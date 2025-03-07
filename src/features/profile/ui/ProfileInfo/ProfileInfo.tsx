"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/styles.module.scss";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import userState, { IUser } from "@/src/entities/user";
import { getMe } from "@/src/entities/profile";
import { convertGender } from "@/src/entities/user";
import { Loader } from "@/src/shared";

export const ProfileInfo: React.FC = observer(() => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getMe()
      .then((res) => {
        userState.setUser(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleEditInfo() {
    router.replace("/profile/edit");
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.params}>
        <div
          style={{
            backgroundImage: user?.avatar_url && `url(${user.avatar_url})`,
          }}
          className={styles.avatar}
        ></div>
        <h1 className={styles.fullname}>
          {user?.surname} {user?.name}{" "}
          {user?.name && user?.patronymic && user?.patronymic}
        </h1>
      </div>
      <div className={styles.params}>
        <div className={styles.param}>
          <p className={styles.paramTitle}>Пол</p>
          <p className={styles.paramValue}>{convertGender(user?.sex)}</p>
        </div>
        <div className={styles.param}>
          <p className={styles.paramTitle}>Возраст</p>
          <p className={styles.paramValue}>
            {user?.age === 0 ? "Не указан" : user?.age}
          </p>
        </div>
        <div className={styles.param}>
          <p className={styles.paramTitle}>Регион</p>
          <p className={styles.paramValue}>{user?.region}</p>
        </div>
        <div className={styles.param}>
          <p className={styles.paramTitle}>Город</p>
          <p className={styles.paramValue}>{user?.city}</p>
        </div>
      </div>
      <ParallelogramButton onClick={handleEditInfo}>
        Редактировать
      </ParallelogramButton>
    </div>
  );
});
