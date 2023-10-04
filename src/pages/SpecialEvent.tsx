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
        "正答数上位者には後日景品贈呈！\n「実行委員」ページの動画がヒント！",
      linkUrl: getEnv("REACT_APP_FORM_URL")!,
      color: "#fff300",
      iconType: ImQuestion,
    },
    {
      title: "キラリギャラリー",
      explaination:
        "生徒と教職員が撮影した「黄色」の写真を公開中！\n独創的な写真をお楽しみください！",
      linkUrl: "/kirari_gallery",
      color: "#fff300",
      iconType: ImFilePicture,
    },
    {
      title: "輝祭チャリTシャツ2022",
      explaination:
        "「令和4年台風15号災害静岡県義援金」へ\n売上の一部を寄付します！",
      linkUrl: "/t_gallery",
      color: "#fff300",
      iconType: FaTshirt,
    },
    {
      title: "輝祭当日の各会場の様子",
      explaination:
        "当日の様子を後日配信予定です\n白熱の2日間をお楽しみに！",
      linkUrl: "",
      color: "#fff300",
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
