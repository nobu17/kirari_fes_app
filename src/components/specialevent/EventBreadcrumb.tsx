import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
} from "@chakra-ui/react";

type EventBreadcrumbProps = {
  currentName: string;
};
export default function EventBreadcrumb(props: EventBreadcrumbProps) {
  return (
    <Box my={5}>
      <Breadcrumb fontSize="md" color="blue">
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/special">
            特別企画
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={RouterLink} to="#">
            {props.currentName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
}
