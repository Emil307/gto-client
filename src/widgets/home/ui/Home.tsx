"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.scss";
import { Event } from "@/src/features/events";
import { Trigger } from "@/src/features/rating";
import { observer } from "mobx-react-lite";
import userState, { IUser } from "@/src/entities/user";
import { getMe } from "@/src/entities/profile";
import { HistoryButton } from "@/src/features/request";

export const Home: React.FC = observer(() => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (userState.user) {
      setUser(userState.user);
      return;
    }

    getMe()
      .then((res) => {
        userState.setUser(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.offer}>
          <h1 className={styles.title}>
            Привет
            {user?.name ? (
              <>
                , <span>{user.name}</span>
              </>
            ) : (
              <>!</>
            )}
          </h1>
          <p className={styles.quote}>
            Запиши и пришли видео, попади во всероссийский рейтинг и поборись за
            призовой фонд! Вместе с тобой участвует вся страна!
          </p>
        </div>
        <div className={styles.articles}>
          <Trigger />
          <HistoryButton />
          <Event />
        </div>
      </div>
    </div>
  );
});
