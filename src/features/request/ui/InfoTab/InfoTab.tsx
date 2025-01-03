"use client";

import { FlushedInput } from "@/src/shared/ui/flushedInput";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.scss";
import { FlushedSelect } from "@/src/shared/ui/FlushedSelect";
import { getMe, getRegions } from "@/src/entities/profile";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import requestState, {
  IInfoData,
} from "@/src/entities/request/store/requestState";
import { observer } from "mobx-react-lite";

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

export const InfoTab = observer(() => {
  const [surname, setSurname] = useState<string>(
    requestState.infoData?.surname as string
  );
  const [name, setName] = useState<string>(
    requestState.infoData?.name as string
  );
  const [patronymic, setPatronymic] = useState<string>(
    requestState.infoData?.patronymic as string
  );
  const [email, setEmail] = useState<string>(
    requestState.infoData?.email as string
  );
  const [phone, setPhone] = useState<string>(
    requestState.infoData?.phone as string
  );
  const [regions, setRegions] = useState([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(
    requestState.infoData?.gender as string
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    requestState.infoData?.region as string
  );
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  useEffect(() => {
    handleGetRegions();
    handleGetUser();
  }, []);

  useEffect(() => {
    if (
      name &&
      surname &&
      patronymic &&
      email &&
      phone &&
      selectedGender &&
      selectedRegion
    ) {
      setIsNextDisabled(false);
      return;
    }
    setIsNextDisabled(true);
    return;
  }, [name, surname, patronymic, email, phone, selectedGender, selectedRegion]);

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

  function handleGetUser() {
    if (!requestState.infoData) {
      getMe()
        .then((res) => {
          setSurname(res.data.surname);
          setName(res.data.name);
          setPatronymic(res.data.patronymic);
          setEmail(res.data.email);
          if (res.data.sex !== "default") {
            setSelectedGender(res.data.sex);
          }
          if (res.data.region) {
            setSelectedRegion(res.data.region);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  function handleClickNext() {
    const infoData: IInfoData = {
      surname: surname,
      name: name,
      patronymic: patronymic,
      email: email,
      phone: phone,
      gender: selectedGender,
      region: selectedRegion,
    };

    requestState.setInfoData(infoData);
    requestState.setActiveTab("category");
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
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <div className={styles.inputsRow}>
          <FlushedInput
            id="name"
            required
            name="name"
            label="Имя"
            placeholder="Иван"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FlushedInput
            id="patronymic"
            required
            name="patronymic"
            label="Отчество"
            placeholder="Иванович"
            type="text"
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
          />
        </div>
        <FlushedInput
          id="email"
          required
          name="email"
          label="E-mail"
          placeholder="example@gmail.com"
          type="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FlushedInput
          id="phone"
          required
          name="phone"
          label="Телефон"
          placeholder="+7 900 000 00 00"
          type="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        <ParallelogramButton
          onClick={handleClickNext}
          disabled={isNextDisabled}
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
