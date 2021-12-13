import * as React from "react";
import { Text, Center, Spinner } from "@chakra-ui/react";
import ImageList from "./ImageList";
import PageTitle from "./PageTitle";
import { useGalleries, GalleryInfo } from "../../hooks/UseGallery";

type GalleryInput = {
  id: string;
  title: string;
};

type CommonGalleryProps = {
  globalTitle: string;
  galleries: GalleryInput[];
};

export default function Gallery(props: CommonGalleryProps) {
  const { loading, galleries, error } = useGalleries(
    props.galleries.map((m) => m.id)
  );
  return (
    <>
      <PageTitle title={props.globalTitle} />
      {getErrorMessage(error)}
      {getGallery(
        loading,
        props.galleries.map((m) => m.title),
        galleries
      )}
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

const getGallery = (
  loading: boolean,
  titles: string[],
  galleries: GalleryInfo[]
) => {
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
          (クリックして拡大してご覧いただけます)
        </Text>
        {galleries.map((g, index) => (
          <>
            <Text m={4} fontSize="2xl">
              {titles[index]}
            </Text>
            <ImageList imageList={g.images}></ImageList>
          </>
        ))}
      </>
    );
  }
};
