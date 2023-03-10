import axios from "axios";
import { SectionCreateDTO } from "../interface/interface";
import authHeader from "./auth-header"
const API_URL = "https://localhost:7217/api/";

export const ENDPOINTS = {
  teamController: "team",
  membaController: "memba",
  membersController: "members",
  sectionController: "sections",
  shiftController: "shifts",
  acceptShift: "shiftcrew",
  shiftcrew: "shiftcrew",
  getMembersShifts: "member/shifts",
};

class ApiService {

  //return axios.get(API_URL + 'user', { headers: authHeader() });
  getShifts(id:string) {
    return axios.get(API_URL + ENDPOINTS.shiftController + "/section/" + id, { headers: authHeader() });
  }
  
  getTeams() {
    return axios.get(API_URL + ENDPOINTS.teamController, { headers: authHeader() });
  }
  
  getTeam(id:number) {
    return axios.get(API_URL + ENDPOINTS.teamController + "/" + id, { headers: authHeader() });
  }
  
  getMembaTeams() {
    return axios.get(API_URL + ENDPOINTS.membaController + "/teams", { headers: authHeader() });
  }
  
  importTeam(id:number) {
    return axios.post(API_URL + ENDPOINTS.membaController + "/ImportTeam/" + id,
    { headers: authHeader() });
  }

  getShift(id:number) {
    return axios.get(API_URL + ENDPOINTS.shiftController + "/" + id, { headers: authHeader() });
  }
  getMembersShifts() {
    return axios.get(API_URL + ENDPOINTS.getMembersShifts, { headers: authHeader() });
  }

  /*
  * Members
  */  
  getMembers(sectionId:string) {
    return axios.get(API_URL + ENDPOINTS.membersController + "/section/" + sectionId, { headers: authHeader() });
  }

  /*
  * Sections
  */
  createSection(section:SectionCreateDTO) {
    return axios.post(API_URL + ENDPOINTS.sectionController,
      section,
      { headers: authHeader() });
  }
  
  getSection(id:number) {
    return axios.get(API_URL + ENDPOINTS.sectionController + "/" + id, { headers: authHeader() });
  }
  
  getSections() {
    return axios.get(API_URL + ENDPOINTS.sectionController, { headers: authHeader() });
  }

  
  importShifts(id:string, selectedFile:any) {
      var formData = new FormData();
      formData.append("file", selectedFile);

    return axios.post(API_URL + ENDPOINTS.shiftController + "/import/" + id,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',          
        }
    });
}
  
  acceptShift(shiftId:number) {
    return axios.post(API_URL + ENDPOINTS.shiftcrew,
      { ShiftId: shiftId }, 
      { headers: authHeader() });
  }

  removeShift(id:number) {
    return axios.delete(API_URL + ENDPOINTS.shiftcrew + "/" + id, { headers: authHeader() });
  }

  // AcceptShift() {
  //   return localStorage.getItem('token');
  // }
  
}

export default new ApiService();