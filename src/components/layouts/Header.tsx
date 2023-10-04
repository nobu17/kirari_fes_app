import * as React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { state } = useAdminAuth();
  const history = useHistory();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("#fff700", "#fff700")}
        color={useColorModeValue("#610081", "#610081")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 3 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("white", "gray.900")}
        align={"center"}
      >
        <HStack>
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 8 }} justify={{ base: "center", md: "start" }}>
            <Text
              ml={3}
              textStyle="p"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              color={useColorModeValue("#610081", "#610081")} // title color
              onClick={() => {
                history.push("/");
              }}
            >
              キラリ高校★オンライン輝祭 2022
            </Text>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav isAuthrized={state.isAuthrized} />
            </Flex>
          </Flex>
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav callback={onToggle} isAuthrized={state.isAuthrized} />
      </Collapse>
    </Box>
  );
}

interface DesktopNavItems {
  isAuthrized: boolean;
}

const DesktopNav = ({ isAuthrized }: DesktopNavItems) => {
  const linkColor = useColorModeValue("#610081", "gray.200");
  const linkHoverColor = useColorModeValue("red", "red");
  const popoverContentBgColor = useColorModeValue("purple.300", "gray.800");

  return (
    <Stack direction={"row"} mt={1} spacing={4}>
      {getFilteredNaviItem(isAuthrized).map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                as={RouterLink}
                to={navItem.href ?? "#"}
                textStyle="menu"
                fontWeight={200}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={RouterLink}
      to={href ?? "#"}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ callback, isAuthrized }: MobileNavItems) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {getFilteredNaviItem(isAuthrized).map((navItem, index) => (
        <Box key={index} onClick={callback}>
          <MobileNavItem key={navItem.label} {...navItem} />
        </Box>
      ))}
    </Stack>
  );
};

interface MobileNavItems {
  callback: VoidFunction;
  isAuthrized: boolean;
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  const handleClick = (item: NavItem) => {
    if (item.children == null) {
    } else {
      onToggle();
    }
  };

  return (
    <Stack
      spacing={4}
      //onClick={children && onToggle}
      onClick={() => handleClick({ label, children, href })}
    >
      <Flex
        py={2}
        as={RouterLink}
        to={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                as={RouterLink}
                to={child.href ?? "/"}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  isNeedAdminAuth?: boolean;
}

const getFilteredNaviItem = (isAuthrized: boolean): Array<NavItem> => {
  const menus = Array<NavItem>();

  for (const item of NAV_ITEMS) {
    if (!item.isNeedAdminAuth) {
      menus.push(item);
    } else {
      if (isAuthrized) {
        menus.push(item);
      }
    }
  }
  return menus;
};

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "トップ",
    href: "/",
  },
  {
    label: "ごあいさつ",
    href: "/greeting",
  },
  {
    label: "ステージ発表",
    href: "/stage",
  },
  {
    label: "作品展示",
    href: "/gallery",
  },
  {
    label: "特別企画",
    href: "/special",
  },
  {
    label: "実行委員",
    href: "/staff",
  },
  {
    label: "管理",
    isNeedAdminAuth: true,
    children: [
      {
        label: "管理メニュー",
        href: "/admin",
      },
      {
        label: "ログアウト",
        href: "/admin_logout",
      },
    ],
  },
];
