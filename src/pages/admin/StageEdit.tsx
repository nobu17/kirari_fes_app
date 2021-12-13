import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Text, SimpleGrid, Center, Button } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import StageEditForm from "../../components/admin/StageEditForm";
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";
import useStage from "../../hooks/UseStage";

interface ParamTypes {
  id: string;
}

type StageInfo = {
  name: string;
  kindName: string;
  title: string;
  message: string;
  movieUrl: string;
};

const pageTitle = "ステージ発表編集";

export default function StageEdit() {
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  const {
    stages,
    addNewStage,
    exchangeInfo,
    isEmptyInfo,
    updateInfo,
    deleteStage,
    post,
    error,
    loading,
  } = useStage(id);

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

  const handleStageUpdate = (stage: StageInfo, index: number) => {
    updateInfo(stage, index);
  };

  const handleDelete = (index: number) => {
    if (isEmptyInfo(index)) {
      deleteStage(index);
    } else if (window.confirm("データがありますが、削除しますか?")) {
      deleteStage(index);
    }
  };

  const handleAdd = () => {
    addNewStage();
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
              {stages.map((stage, index) => (
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
                      <StageEditForm
                        key={index}
                        stage={stage}
                        isLoading={loading}
                        onStageInfoChanged={(e) => {
                          handleStageUpdate(e, index);
                        }}
                        onDelete={() => {
                          handleDelete(index);
                        }}
                      ></StageEditForm>
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
