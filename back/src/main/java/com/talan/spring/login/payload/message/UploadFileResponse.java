package com.talan.spring.login.payload.message;

public class UploadFileResponse {
    private Long idFile;
    private String message;

    public UploadFileResponse(Long idFile, String message) {
        this.idFile = idFile;
        this.message = message;
    }

    public Long getIdFile() {
        return idFile;
    }

    public void setIdFile(Long idFile) {
        this.idFile = idFile;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
