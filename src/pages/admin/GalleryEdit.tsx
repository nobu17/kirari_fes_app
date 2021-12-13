import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Text, SimpleGrid, Center, Button } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GalleryEditForm from "../../components/common/GalleryEditForm";
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";
import useGallery from "../../hooks/UseGallery";

interface ParamTypes {
  id: string;
}

const TitleMap: { [id: string]: string } = {};
TitleMap["1"] = "ギャラリー編集(ポスター、パンフレット)";
TitleMap["2"] = "ギャラリー編集(授業)";
TitleMap["3"] = "ギャラリー編集(キラリギャラリー)";
TitleMap["4"] = "ギャラリー編集(有志)";
TitleMap["5"] = "ギャラリー編集(Tシャツ)";

export default function GalleryEdit() {
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  const {
    images,
    exchangeInfo,
    isEmptyInfo,
    deleteImage,
    addNewImage,
    updateAuthorInfo,
    updateImageFile,
    post,
    updateCacheMetadata,
    loading,
    error,
  } = useGallery(id);

  if (!id) {
    return <Text textStyle="error">IDが不正です。</Text>;
  }

  const getError = (error: Error | undefined) => {
    if (error) {
      return <Text textStyle="error">エラーが発生しました。</Text>;
    } else {
      return <></>;
    }
  };

  function handleOnDragEnd(result: any) {
    exchangeInfo(result.source.index, result.destination.index);
  }

  const handleAuthorUpdate = (authorInfo: string, index: number) => {
    updateAuthorInfo(authorInfo, index);
  };

  const handleImageUpload = async (file: File, index: number) => {
    await updateImageFile(file, index);
  };

  const handleDelete = (index: number) => {
    if (isEmptyInfo(index)) {
      deleteImage(index);
    } else if (window.confirm("データがありますが、削除しますか?")) {
      deleteImage(index);
    }
  };

  const handleAdd = () => {
    addNewImage();
  };

  const handleSubmit = async () => {
    if (window.confirm("確定してよろしいですか?")) {
      try {
        await post();
      } catch (err) {
        alert("確定に失敗しました。");
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm("確定せずに終了してよろしいですか?")) {
      history.push("/admin");
    }
  };

  const getSubmitArea = (
    handleAdd: VoidFunction,
    handleSubmit: VoidFunction,
    handleCancel: VoidFunction,
  ) => {
    return (
      <SimpleGrid m={4} spacing={2}>
        <Center>
          <Button
            isLoading={loading}
            colorScheme="teal"
            w="90%"
            onClick={handleAdd}
          >
            新規データ追加
          </Button>
        </Center>
        <Center>
          <Button
            isLoading={loading}
            colorScheme="blue"
            w="90%"
            onClick={handleSubmit}
          >
            確定
          </Button>
        </Center>
        <Center>
          <Button
            isLoading={loading}
            colorScheme="red"
            w="90%"
            onClick={handleCancel}
          >
            キャンセル
          </Button>
        </Center>
      </SimpleGrid>
    );
  };

  return (
    <>
      <AdminBreadcrumb currentName={TitleMap[id]}></AdminBreadcrumb>
      <Text textStyle="h2">{TitleMap[id]}</Text>
      {getError(error)}
      {getSubmitArea(handleAdd, handleSubmit, handleCancel)}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {images.map(({ thumbNailUrl, authorInfo }, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Box
                      key={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <GalleryEditForm
                        key={index}
                        authorInfo={authorInfo}
                        imageUrl={thumbNailUrl}
                        isLoading={loading}
                        onAuthorInfoChanged={(e) => {
                          handleAuthorUpdate(e, index);
                        }}
                        onImageFileChanged={(f) => {
                          handleImageUpload(f, index);
                        }}
                        onDelete={() => {
                          handleDelete(index);
                        }}
                      ></GalleryEditForm>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      {getSubmitArea(handleAdd, handleSubmit, handleCancel)}
    </>
  );
}
