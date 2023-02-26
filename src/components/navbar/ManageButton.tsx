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
            {authService.isManager() ? <DropdownItem onClick={() => navigate("/team")}>Hold</DropdownItem> : ""}
            {authService.isManager() ? <DropdownItem onClick={() => navigate("/members")}>Medhjælpere</DropdownItem> : ""}
            
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
  };


  return (
    <div>{renderButton()}</div>


  );
}
