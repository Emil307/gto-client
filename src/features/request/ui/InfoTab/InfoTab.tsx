import { FlushedInput } from "@/src/shared/ui/flushedInput";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.scss";
import { FlushedSelect } from "@/src/shared/ui/FlushedSelect";
import { getRegions } from "@/src/entities/profile";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";

const genders = [
  {
    label: "Мужской",
    value: "male",
  },
  {
    label: "Женский",
    value: "female",
  },
];

const categories = [
  {
    label: "Любитаель",
    value: "amateur",
  },
  {
    label: "Профессионал",
    value: "first_try",
  },
  {
    label: "КМС",
    value: "lovers",
  },
  {
    label: "Мастер спорта",
    value: "pro",
  },
];

const BinVariants = [
  {
    label: "Да",
    value: "true",
  },
  {
    label: "Нет",
    value: "false",
  },
];

export const InfoTab = () => {
  const [regions, setRegions] = useState([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const [isGto, setIsGto] = useState<string | null>(null);
  // const [isPro, setIsPro] = useState<string | null>(null);
  // const [isCms, setIsCms] = useState<string | null>(null);
  // const [isCompetition, setIsCompetition] = useState<string | null>(null);

  useEffect(() => {
    handleGetRegions();
  }, []);

  function handleGetRegions() {
    getRegions()
      .then((res) => {
        const searchedRegions: any = [];

        res.data.forEach((region: any) => {
          searchedRegions.push({
            label: region.title,
            value: region.title,
          });
        });

        setRegions(searchedRegions);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className={styles.infoTab}>
      <div className={styles.inputs}>
        <FlushedInput
          id="surname"
          required
          name="surname"
          label="Фамилия"
          placeholder="Иванов"
          type="text"
        />
        <div className={styles.inputsRow}>
          <FlushedInput
            id="name"
            required
            name="name"
            label="Имя"
            placeholder="Иван"
            type="text"
          />
          <FlushedInput
            id="patronymic"
            required
            name="patronymic"
            label="Отчество"
            placeholder="Иванович"
            type="text"
          />
        </div>
        <FlushedInput
          id="email"
          required
          name="email"
          label="E-mail"
          placeholder="example@gmail.com"
          type="E-mail"
        />
        <FlushedInput
          defaultValue="+7 "
          id="phone"
          required
          name="phone"
          label="Телефон"
          placeholder="example@gmail.com"
          type="phone"
        />
        <FlushedSelect
          data={genders}
          label="Пол"
          value={selectedGender}
          onChange={setSelectedGender}
          placeholder="Выберите пол"
        />
        <FlushedSelect
          data={regions}
          label="Регион"
          value={selectedRegion}
          onChange={setSelectedRegion}
          placeholder="Выберите регион"
        />
        {/* <FlushedSelect
          data={categories}
          label="В какой максимальной категории вы занимали призовое место в играх?"
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Выберите ответ"
        /> */}
        {/* <FlushedSelect
          data={BinVariants}
          label="Вы являетесь обладателем знака отличия ГТО?"
          value={isGto}
          onChange={setIsGto}
          placeholder="Выберите ответ"
        /> */}
        {/* <FlushedSelect
          data={BinVariants}
          label="Вы являетесь профессиональным спортсменом или тренером?"
          value={isPro}
          onChange={setIsPro}
          placeholder="Выберите ответ"
        /> */}
        {/* <FlushedSelect
          data={BinVariants}
          label="У вас есть спортивный разряд, звание, КМС?"
          value={isCms}
          onChange={setIsCms}
          placeholder="Выберите ответ"
        /> */}
        {/* <FlushedSelect
          data={BinVariants}
          label="Вы являетесь участником спортивных соревнований  (по кроссфиту, полиатлону, триатлону, лёгкой/тяжелой атлетике, гонки героев)?"
          value={isCompetition}
          onChange={setIsCompetition}
          placeholder="Выберите ответ"
        /> */}
        <ParallelogramButton>Далее</ParallelogramButton>
        <p className={styles.credits}>
          Нажимая на кнопку «Далее», вы подтверждаете, что заполненные вами
          данные соответствуют действительности и введены корректно. Вы случае
          предоставления ложной информации ваша заявка будет аннулирована.
        </p>
      </div>
    </div>
  );
};
