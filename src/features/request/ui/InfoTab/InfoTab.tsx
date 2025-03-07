"use client";

import { FlushedInput } from "@/src/shared/ui/flushedInput";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.scss";
import { FlushedSelect } from "@/src/shared/ui/FlushedSelect";
import { editProfile, getMe, getRegions } from "@/src/entities/profile";
import { ParallelogramButton } from "@/src/shared/ui/parallelogramButton";
import requestState, {
  IInfoData,
} from "@/src/entities/request/store/requestState";
import { observer } from "mobx-react-lite";
import { genders } from "@/src/entities/user";
import { Loader } from "@/src/shared";
import { Checkbox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import datepickerStyles from "../../styles/datepicker/styles.module.scss";
import dayjs from "dayjs";
import {
  getParticipationChildDocument,
  getPersonalTermsDocument,
} from "@/src/entities/documnets";
import Link from "next/link";

export const InfoTab = observer(() => {
  const [dob, setDob] = useState<Date | null>(null);
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
    requestState.infoData?.phone ? requestState.infoData?.phone : "+7"
  );
  const [regions, setRegions] = useState([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(
    requestState.infoData?.gender as string
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    requestState.infoData?.region as string
  );
  const [acceptProccessing, setAcceptProccessing] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [document, setDocument] = useState("");
  const [childDocument, setChildDocument] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    handleGetDocuments();
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
      selectedRegion &&
      acceptProccessing
    ) {
      setIsNextDisabled(false);
      return;
    }
    setIsNextDisabled(true);
    return;
  }, [
    name,
    surname,
    patronymic,
    email,
    phone,
    selectedGender,
    selectedRegion,
    acceptProccessing,
  ]);

  useEffect(() => {
    if (!requestState.isChild) {
      setDob(null);
    }
  }, [requestState.isChild]);

  function handleGetDocuments() {
    getPersonalTermsDocument()
      .then((res) => {
        setDocument(res.data.pdf);
      })
      .catch((e) => {
        console.log(e);
      });
    getParticipationChildDocument()
      .then((res) => {
        setChildDocument(res.data.pdf);
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
          setPhone(res.data.phone);
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

  function handleUpdatePhone() {
    setIsLoading(true);
    editProfile({ phone: phone })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleClickNext() {
    handleUpdatePhone();

    const infoData: IInfoData = {
      surname: surname,
      name: name,
      patronymic: patronymic,
      email: email,
      phone: phone,
      gender: selectedGender,
      region: selectedRegion,
      is_child: requestState.isChild,
      birthDate: dob
        ? dayjs(String(dob)).format("YYYY/MM/DD").replaceAll("/", "-")
        : null,
    };

    requestState.setInfoData(infoData);
    requestState.setActiveTab("category");
  }

  return (
    <div className={styles.infoTab}>
      <Checkbox
        checked={requestState.isChild}
        onChange={(event) =>
          requestState.setIsChild(event.currentTarget.checked)
        }
        label="Подать заявку за несовершеннолетнего"
        style={{ color: "var(--main-white)" }}
      />
      {requestState.isChild && (
        <DatePickerInput
          placeholder="Не указана"
          label="Дата рождения несовершеннолетнего"
          classNames={datepickerStyles}
          value={dob}
          onChange={setDob}
          maxDate={new Date(dayjs().format("YYYY/MM/DD"))}
        />
      )}
      <div className={styles.inputs}>
        <FlushedInput
          id="surname"
          required
          name="surname"
          label={requestState.isChild ? "Фамилия" : "Фамилия"}
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
            label={requestState.isChild ? "Имя" : "Имя"}
            placeholder="Иван"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FlushedInput
            id="patronymic"
            required
            name="patronymic"
            label={requestState.isChild ? "Отчество" : "Отчество"}
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
          label={requestState.isChild ? "Пол несовершеннолетнего" : "Пол"}
          value={selectedGender}
          onChange={setSelectedGender}
          placeholder="Выберите пол"
        />
        <FlushedSelect
          data={regions}
          label={requestState.isChild ? "Регион несовершеннолетнего" : "Регион"}
          value={selectedRegion}
          onChange={setSelectedRegion}
          placeholder="Выберите регион"
          searchable
        />
        <div className={styles.documents}>
          <Checkbox
            checked={acceptProccessing}
            onChange={(event) =>
              setAcceptProccessing(event.currentTarget.checked)
            }
            label=""
            style={{ color: "var(--main-white)" }}
          />
          <Link
            href={`/pdf?url=${API}${
              requestState.isChild ? childDocument : document
            }`}
          >
            Соглашаюсь с Правилами обработки персональных данных, фото- и
            видео-изображений {requestState.isChild && "несовершеннолетнего"}
          </Link>
        </div>
        <ParallelogramButton
          onClick={handleClickNext}
          disabled={isNextDisabled}
        >
          {isLoading ? <Loader /> : <>Далее</>}
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
