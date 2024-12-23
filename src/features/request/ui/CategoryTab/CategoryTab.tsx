"use client";

import Image from "next/image";
import React from "react";
import styles from "../../styles/styles.module.scss";
import requestState from "@/src/entities/request/store/requestState";
import { observer } from "mobx-react-lite";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";

const categories = [
  {
    id: 1,
    label: "Любитель",
    value: "amateur",
  },
  {
    id: 2,
    label: "Профессионал",
    value: "professional",
  },
  {
    id: 3,
    label: "КМС",
    value: "сms",
  },
  {
    id: 4,
    label: "Мастер спорта",
    value: "master",
  },
];

export const CategoryTab = observer(() => {
  function handleSelectCategory(value: string) {
    requestState.setCategory(value);
  }

  return (
    <div className={styles.categoryTab}>
      <div className={styles.ageCategory}>
        <Image
          priority={true}
          src="/icons/info.svg"
          width={24}
          height={24}
          alt="info"
        />
        <p>Ваша возрастная категория: 18-34</p>
      </div>
      <div className={styles.categories}>
        <h5>Выберите одну из доступных вам категорий:</h5>
        {categories.map((category) => (
          <button
            style={{
              background:
                requestState.category === category.value ? "#F70115" : "",
            }}
            onClick={() => handleSelectCategory(category.value)}
            key={category.id}
            className={styles.category}
          >
            {category.label}
          </button>
        ))}
      </div>
      {requestState.category && (
        <div className={styles.rules}>
          <h3>Правила участия в данной категории:</h3>
          <div>
            <p>
              Регистрация: Все участники должны пройти обязательную регистрацию
              до установленного срока. Регистрация возможна онлайн или на месте
              мероприятия.
            </p>
            <br />
            <p>
              Медицинская справка: Каждый участник обязан предоставить
              медицинскую справку о состоянии здоровья, подтверждающую
              возможность участия в спортивных испытаниях.
            </p>
            <br />
            <p>
              Обязательная экипировка: Участники обязаны использовать подходящую
              спортивную одежду и обувь, соответствующую виду испытаний.
            </p>
            <br />
            <p>
              Спортивные этапы: Участники проходят несколько этапов испытаний
              (например, бег, подтягивания, плавание, метание, прыжки и т.д.), в
              зависимости от возрастной категории и пола.
            </p>
            <br />
            <p>
              Инструктаж: Перед каждым этапом соревнований проводится
              обязательный инструктаж по правилам безопасности и выполнению
              упражнений.
            </p>
            <br />
            <p>
              Техника выполнения: Все упражнения должны выполняться согласно
              установленным стандартам, чтобы результат был засчитан.
            </p>
            <br />
            <p>
              Тайминг: Для каждого испытания устанавливается максимальное время
              выполнения. В случае превышения времени результат не
              засчитывается.
            </p>
            <br />
            <p>
              Судейство: Судьи контролируют правильность выполнения упражнений и
              фиксируют результаты каждого участника.
            </p>
            <br />
            <p>
              Оценка результатов: Каждое испытание оценивается по системе
              баллов. Итоговый результат формируется на основе суммирования
              баллов за все этапы.
            </p>
            <br />
            <p>
              Нормативы: Для каждой возрастной и половой категории разработаны
              отдельные нормативы, которые необходимо выполнить для получения
              наград.
            </p>
            <br />
            <p>
              Дисквалификация: Участник может быть дисквалифицирован за
              нарушение правил, использование запрещённых препаратов, неэтичное
              поведение или отказ от прохождения обязательных этапов.
            </p>
            <br />
            <p>
              Повторное выполнение: При наличии весомых причин (например,
              технические сбои или нарушение правил со стороны организаторов)
              участнику может быть разрешено повторное выполнение испытания.
            </p>
          </div>
        </div>
      )}
      <div className={styles.creditsWrapper}>
        <ParallelogramButton
          onClick={() => requestState.setActiveTab("video")}
          disabled={Boolean(!requestState.category)}
        >
          Далее
        </ParallelogramButton>
        <p className={styles.credits}>
          Нажимая на кнопку «Далее», вы подтверждаете, что заполненные вами
          данные соответствуют действительности и введены корректно. Вы случае
          предоставления ложной информации ваша заявка будет аннулирована.
        </p>
      </div>
    </div>
  );
});
