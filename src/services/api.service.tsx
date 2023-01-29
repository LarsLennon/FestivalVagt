import axios from "axios";
import authHeader from "./auth-header"
const API_URL = "https://localhost:7217/api/";

export const ENDPOINTS = {
  getShifts: "shifts",
  acceptShift: "shiftcrew",
  shiftcrew: "shiftcrew",
  getMembersShifts: "member/shifts",
};

class ApiService {

  //return axios.get(API_URL + 'user', { headers: authHeader() });
  getShifts() {
    return axios.get(API_URL + ENDPOINTS.getShifts, { headers: authHeader() });
  }
  
  getShift(id:number) {
    return axios.get(API_URL + ENDPOINTS.getShifts + "/" + id, { headers: authHeader() });
  }
  
  getMembersShifts() {
    return axios.get(API_URL + ENDPOINTS.getMembersShifts, { headers: authHeader() });
  }
  
  acceptShift(shiftId:number) {
    return axios.post(API_URL + ENDPOINTS.shiftcrew, {
      ShiftId: shiftId
    }, { headers: authHeader() });
  }

  removeShift(id:number) {
    return axios.delete(API_URL + ENDPOINTS.shiftcrew + "/" + id, { headers: authHeader() });
  }

  // AcceptShift() {
  //   return localStorage.getItem('token');
  // }
  
}

export default new ApiService();