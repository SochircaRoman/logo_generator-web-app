import GenericService from './generic.service';

class UploadFilesService {
  async uploadFile(file) {

    // Create an Form Data object
    const formData = new FormData();
    formData.append("file", file);

    const uploadedFile = await GenericService.request({
      url: "users/upload",
      method: 'post',
      data: {
        file: formData,
      }
    });


  }
}