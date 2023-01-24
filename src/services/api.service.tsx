import axios from "axios";

const API_URL = "https://localhost:44389/api/";

export const ENDPOINTS = {
  getShifts: "shifts",
  acceptShift: "shiftcrew",
};

class ApiService {

  getShifts() {
    return axios.get(API_URL + ENDPOINTS.getShifts);
  }
  
  getShift(id:number) {
    return axios.get(API_URL + ENDPOINTS.getShifts + "/" + id);
  }
  
  acceptShift(shiftId:number, memberId:number) {
    return axios.post(API_URL + ENDPOINTS.acceptShift, {
      ShiftId: shiftId,
      memberId: memberId
    });
  }

  // AcceptShift() {
  //   return localStorage.getItem('token');
  // }
  
}

export default new ApiService();