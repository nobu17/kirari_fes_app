import * as React from "react";
import EventBreadcrumb from "../components/specialevent/EventBreadcrumb";
import CommonGalleryPage from "../components/common/CommonGalleryPage";

type GalleryInput = {
  id: string;
  title: string;
};

type Input = {
  globalTitle: string;
  galleries: GalleryInput[];
};

export default function KirariGallery() {
  const input: Input = {
    globalTitle: "キラリギャラリー",
    galleries: [{ id: "3", title: "" }],
  };
  return (
    <>
      <EventBreadcrumb currentName="キラリギャラリー"></EventBreadcrumb>
      <CommonGalleryPage {...input} />
    </>
  );
}
