import * as React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import EventSplitCard from "../components/specialevent/EventSplitCard";
import PageTitle from "../components/common/PageTitle";
import useEnviroment from "../hooks/UseEnviroment";
import { FaTshirt } from "react-icons/fa";
import { ImQuestion, ImFilePicture } from "react-icons/im";
import { AiFillTrophy } from "react-icons/ai";
import { IconType } from "react-icons/lib";

type EventInfo = {
  title: string;
  explaination: string;
  linkUrl: string;
  color: string;
  iconType: IconType;
};

export default function SpecialEvent() {
  const { getEnv } = useEnviroment();
  const eventList: EventInfo[] = [
    {
      title: "キラリの謎",
      explaination:
        "キラリ高校の謎にチャレンジ！君は何問解けるかな...？\n正答数によっては景品がもらえるかも!? (外部リンクに飛びます)",
      linkUrl: getEnv("REACT_APP_FORM_URL")!,
      color: "green.400",
      iconType: ImQuestion,
    },
    {
      title: "キラリギャラリー",
      explaination:
        "「紫」のテーマに募集した写真を公開中！\nぜひご覧ください。",
      linkUrl: "/kirari_gallery",
      color: "blue.400",
      iconType: ImFilePicture,
    },
    {
      title: "オリジナルTシャツ",
      explaination:
        "生徒がデザインしたステキなTシャツをご紹介！\n当日はこのTシャツで参加しましょう！",
      linkUrl: "/t_gallery",
      color: "red.400",
      iconType: FaTshirt,
    },
    {
      title: "キラリカップ",
      explaination:
        "やってまいりました、巷で噂のキラリカップ 2021！\n当日の模様を後日配信いたしますのでお楽しみに。",
      linkUrl: "",
      color: "yellow.400",
      iconType: AiFillTrophy,
    },
  ];
  return (
    <>
      <PageTitle title="特別企画"></PageTitle>
      {/* <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing="20px">
        {eventList.map((e, index) => (
          <EventCard key={index} {...e}></EventCard>
        ))}
      </SimpleGrid> */}
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing="20px">
        {eventList.map((e, index) => (
          <EventSplitCard key={index} {...e}></EventSplitCard>
        ))}
      </SimpleGrid>
    </>
  );
}
