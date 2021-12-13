import * as React from "react";
import { Text, Center, Spinner } from "@chakra-ui/react";
import PageTitle from "../components/common/PageTitle";
import EventBreadcrumb from "../components/specialevent/EventBreadcrumb";
import useTGallery from "../hooks/UseTGallery";
import { TGalleryInfo } from "../lib/TGalleryApi";
import TGalleryCard from "../components/tgallery/TGalleryCard";

const galleryId = "1";

export default function TGallery() {
  const { loading, tGallery, error } = useTGallery(galleryId);
  return (
    <>
      <EventBreadcrumb currentName="Tシャツギャラリー"></EventBreadcrumb>
      <PageTitle title="Tシャツギャラリー" />
      {getErrorMessage(error)}
      {getGallery(loading, tGallery)}
    </>
  );
}

const getErrorMessage = (error: Error | undefined) => {
  if (error) {
    return (
      <Text textStyle="error">
        エラーが発生しました。お手数ですがリロードしていただくか、しばらく時間をおいてアクセスしてください。
      </Text>
    );
  }
};

const getGallery = (loading: boolean, galleries: TGalleryInfo[]) => {
  if (loading) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  } else {
    return (
      <>
        <Text textStyle="p" m={4}>
          (画像はクリックして拡大してご覧いただけます)
        </Text>
        {galleries.map((m, index) => (
          <TGalleryCard key={index} {...m}></TGalleryCard>
        ))}
      </>
    );
  }
};
