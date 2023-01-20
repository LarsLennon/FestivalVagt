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
  
  acceptShift(id:string, item:string) {
    return axios.post(API_URL + ENDPOINTS.acceptShift, {
      tetw: 2,
      test: 2
    });
  }

  // AcceptShift() {
  //   return localStorage.getItem('token');
  // }


  
}
export default new ApiService();