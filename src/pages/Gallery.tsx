import * as React from "react";
import {
  Text,
  Center,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import ImageList from "../components/common/ImageList";
import PageTitle from "../components/common/PageTitle";
import { useGalleries, GalleryInfo } from "../hooks/UseGallery";

const galleryIds = ["1", "2", "4"];

export default function Gallery() {
  const { loading, galleries, error } = useGalleries(galleryIds);
  return (
    <>
      <PageTitle title="作品展示" />
      {getErrorMessage(error)}
      {getGallery(loading, galleries)}
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

const getGallery = (loading: boolean, galleries: GalleryInfo[]) => {
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

        <Tabs
          colorScheme="red"
          borderColor="blue.500"
          isFitted
          isLazy
          lazyBehavior="keepMounted"
          variant="enclosed"
          defaultIndex={0}
        >
          <TabList mb="1em">
            <Tab _focus={{ boxShadow: "none" }}>ポスター</Tab>
            <Tab _focus={{ boxShadow: "none" }}>授業</Tab>
            <Tab _focus={{ boxShadow: "none" }}>有志</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text m={1} fontSize="xl">
                ポスター、Tシャツデザイン
              </Text>
              <ImageList imageList={galleries[0].images}></ImageList>
            </TabPanel>
            <TabPanel>
              <Text m={1} fontSize="xl">
                授業作品
              </Text>
              <ImageList imageList={galleries[1].images}></ImageList>
            </TabPanel>
            <TabPanel>
              <Text mb={2} fontSize="xl">
                有志作品
              </Text>
              <ImageList imageList={galleries[2].images}></ImageList>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    );
  }
};
