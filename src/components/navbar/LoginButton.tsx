import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
} from "reactstrap";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../hooks/GlobalContent";

interface Iprops {
  refresh: Function;
}

export default function LoginButton(props: Iprops) {
  const { setUserName } = useGlobalContext()
  const navigate = useNavigate();


  const handleLogout = () => {
    authService.logout();
    setUserName("");
    navigate("/login");
  };

  const renderButton = () => {
    if (authService.isAuth()) {
      props.refresh(true);
      return (
        <UncontrolledDropdown>
          <DropdownToggle className="text-dark" nav caret>
            {authService.getCurrentUsername()}
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem onClick={() => navigate("/members")}>Medhjælpere</DropdownItem>
            <DropdownItem onClick={() => navigate("/team")}>Hold</DropdownItem>    
            <DropdownItem onClick={() => navigate("/test")}>Test</DropdownItem> 
            <DropdownItem divider />
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
    else {
      props.refresh(false);
      return (
        <NavLink href="/login" className="text-dark">
          Login
        </NavLink>
      );
    }
  };


  return (
    <div>{renderButton()}</div>


  );
}
