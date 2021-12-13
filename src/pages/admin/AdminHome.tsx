import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import { Link, Box } from "@chakra-ui/react";

export default function AdminHome() {
  return (
    <>
      <PageTitle title="管理メニュー"></PageTitle>
      {MenuItems.map((menu, index) => (
        <Box key={index} color="blue">
          <Link p={2} as={RouterLink} to={menu.url} textStyle="admenu">
            {menu.displayName}
          </Link>
        </Box>
      ))}
    </>
  );
}

type MenuItem = {
  displayName: string;
  url: string;
};

const MenuItems: Array<MenuItem> = [
  { displayName: "作品展示編集(ポスター、パンフレット)", url: "/gallery_edit/1" },
  { displayName: "作品展示編集(授業)", url: "/gallery_edit/2" },
  { displayName: "作品展示編集(有志)", url: "/gallery_edit/4" },
  { displayName: "キラリギャラリー編集", url: "/gallery_edit/3" },
  { displayName: "オリジナルTシャツ編集", url: "/tgallery_edit/1" },
  { displayName: "ステージ情報編集", url: "/stage_edit/1" },
  { displayName: "実行委員編集", url: "/staff_edit/1" },
];
