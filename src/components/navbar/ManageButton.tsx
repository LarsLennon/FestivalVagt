import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function ManageButton() {
  const navigate = useNavigate();

  const renderButton = () => {

    if (authService.isManager()) {
      return (
        <UncontrolledDropdown>
          <DropdownToggle className="text-dark" nav caret>
            Manage
          </DropdownToggle>
          <DropdownMenu end>
            {authService.isAdmin() ? <DropdownItem onClick={() => navigate("/team")}>Hold</DropdownItem> : ""}
            {authService.isAdmin() ? <DropdownItem onClick={() => navigate("/member/log")}>Log</DropdownItem> : ""}
            {authService.isManager() ? <DropdownItem onClick={() => navigate("/members")}>Medhjælpere</DropdownItem> : ""}
            {authService.isManager() ? <DropdownItem onClick={() => navigate("/statistics")}>Statistik</DropdownItem> : ""}
            
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
  };


  return (
    <div>{renderButton()}</div>


  );
}
