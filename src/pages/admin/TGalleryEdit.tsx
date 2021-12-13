import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Text, SimpleGrid, Center, Button } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TGalleryEditForm from "../../components/admin/TGalleryEditForm";
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";
import UseTGallery from "../../hooks/UseTGallery";
import { TGalleryInfo } from "../../lib/TGalleryApi";

interface ParamTypes {
  id: string;
}

const pageTitle = "実行委員編集";

export default function TGalleryEdit() {
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  const {
    tGallery,
    addNewStaff,
    exchangeInfo,
    isEmptyInfo,
    updateInfo,
    uploadImage,
    deleteStaff,
    post,
    error,
    loading,
  } = UseTGallery(id);

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

  const handleStageUpdate = (t: TGalleryInfo, index: number) => {
    updateInfo(t, index);
  };

  const handleImageUpload = async (file: File, index: number) => {
    await uploadImage(file, index);
  };

  const handleDelete = (index: number) => {
    if (isEmptyInfo(index)) {
      deleteStaff(index);
    } else if (window.confirm("データがありますが、削除しますか?")) {
      deleteStaff(index);
    }
  };

  const handleAdd = () => {
    addNewStaff();
  };

  const handleSubmit = async () => {
    if (window.confirm("確定してよろしいですか?")) {
      await post();
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
    handleCancel: VoidFunction
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
      <AdminBreadcrumb currentName={pageTitle}></AdminBreadcrumb>
      <Text textStyle="h2">{pageTitle}</Text>
      {getError(error)}
      {getSubmitArea(handleAdd, handleSubmit, handleCancel)}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {tGallery.map((t, index) => (
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
                      <TGalleryEditForm
                        key={index}
                        info={t}
                        isLoading={loading}
                        onTGalleryChanged={(e) => {
                          handleStageUpdate(e, index);
                        }}
                        onImageFileChanged={(f) => {
                          handleImageUpload(f, index);
                        }}
                        onDelete={() => {
                          handleDelete(index);
                        }}
                      ></TGalleryEditForm>
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
