import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
} from "@chakra-ui/react";

type AdminBreadcrumbProps = {
  currentName: string;
};
export default function AdminBreadcrumb(props: AdminBreadcrumbProps) {
  return (
    <Box my={5}>
      <Breadcrumb fontSize="md" color="blue">
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/admin">
          管理メニュー
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage isLastChild>
        {props.currentName}
          <BreadcrumbLink as={RouterLink} isCurrentPage to="#">
            {props.currentName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
}
