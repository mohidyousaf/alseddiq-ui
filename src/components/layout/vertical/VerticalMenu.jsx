// MUI Imports
import { useTheme } from "@mui/material/styles";

// Third-party Imports
import PerfectScrollbar from "react-perfect-scrollbar";

// Component Imports
import { Menu, MenuItem } from "@menu/vertical-menu";

// Hook Imports
import useVerticalNav from "@menu/hooks/useVerticalNav";

// Styled Component Imports
import StyledVerticalNavExpandIcon from "@menu/styles/vertical/StyledVerticalNavExpandIcon";

// Style Imports
import menuItemStyles from "@core/styles/vertical/menuItemStyles";
import menuSectionStyles from "@core/styles/vertical/menuSectionStyles";

import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LoopIcon from "@mui/icons-material/Loop";
import DoneIcon from "@mui/icons-material/Done";

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon
    open={open}
    transitionDuration={transitionDuration}
  >
    <i className="tabler-chevron-right" />
  </StyledVerticalNavExpandIcon>
);

const VerticalMenu = ({ scrollMenu }) => {
  // Hooks
  const theme = useTheme();
  const verticalNavOptions = useVerticalNav();

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions;
  const ScrollWrapper = isBreakpointReached ? "div" : PerfectScrollbar;

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: "bs-full overflow-y-auto overflow-x-hidden",
            onScroll: (container) => scrollMenu(container, false),
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: (container) => scrollMenu(container, true),
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => (
          <RenderExpandIcon
            open={open}
            transitionDuration={transitionDuration}
          />
        )}
        renderExpandedMenuItemIcon={{
          icon: <i className="tabler-circle text-xs" />,
        }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href="/home" icon={<HomeIcon />}>
          Home
        </MenuItem>
        <MenuItem href="/add-patient" icon={<AssignmentIcon />}>
          Add Patient
        </MenuItem>
        <MenuItem href="/add-blood-sample" icon={<ListAltIcon />}>
          All Tests
        </MenuItem>
        {/* <MenuItem href="/add-blood-sample" icon={<AssignmentIcon />}>
          New Blood Sample
        </MenuItem> */}
        <MenuItem href="/test-template" icon={<AssignmentIcon />}>
          Test Templates
        </MenuItem>
        <MenuItem href="/add-template" icon={<NoteAddIcon />}>
          Add Template
        </MenuItem>
        <MenuItem href="/invoice" icon={<ReceiptIcon />}>
          Invoice
        </MenuItem>
        <MenuItem href="/patient" icon={<PeopleIcon />}>
          Patients
        </MenuItem>
        
        <MenuItem href="/test/pending-test" icon={<HourglassEmptyIcon />}>
          Pending Tests
        </MenuItem>
        <MenuItem href="/test/ongoing-test" icon={<LoopIcon />}>
          Ongoing Tests
        </MenuItem>
        <MenuItem href="/test/completed-test" icon={<DoneIcon />}>
          Completed Tests
        </MenuItem>
      </Menu>
      {/* <Menu
          popoutMenuOffset={{ mainAxis: 23 }}
          menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
          renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
          renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
          menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        >
          <GenerateVerticalMenu menuData={menuData(dictionary)} />
        </Menu> */}
    </ScrollWrapper>
  );
};

export default VerticalMenu;
