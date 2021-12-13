import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Text, SimpleGrid, Center, Button } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import StaffEditForm from "../../components/admin/StaffEditForm";
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";
import useStaff from "../../hooks/UseStaff";
import { StaffInfo } from "../../lib/StaffApi";

interface ParamTypes {
  id: string;
}

const pageTitle = "実行委員編集";

export default function StaffEdit() {
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  const {
    staffs,
    addNewStaff,
    exchangeInfo,
    isEmptyInfo,
    updateInfo,
    uploadImage,
    deleteStaff,
    post,
    error,
    loading,
  } = useStaff(id);

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

  const handleStageUpdate = (staff: StaffInfo, index: number) => {
    updateInfo(staff, index);
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
              {staffs.map((staff, index) => (
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
                      <StaffEditForm
                        key={index}
                        staff={staff}
                        isLoading={loading}
                        onStaffChanged={(e) => {
                          handleStageUpdate(e, index);
                        }}
                        onImageFileChanged={(f) => {
                          handleImageUpload(f, index);
                        }}
                        onDelete={() => {
                          handleDelete(index);
                        }}
                      ></StaffEditForm>
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
