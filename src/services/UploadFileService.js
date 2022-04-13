// import http from "../http-common";
import axios from "axios";
class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post("http://127.0.0.1:8000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
  getFiles() {
    // return http.get("/files/1");
    return axios.get("http://127.0.0.1:8000/api/upload");
  }
}
export default new UploadFilesService();
