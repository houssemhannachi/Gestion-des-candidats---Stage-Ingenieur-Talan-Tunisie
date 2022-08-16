package com.talan.spring.login.payload.dto;

public class EntretienDto {
    private int idDossier;
    private DataDto data;

    public int getIdDossier() {
        return idDossier;
    }

    public void setIdDossier(int idDossier) {
        this.idDossier = idDossier;
    }

    public DataDto getData() {
        return data;
    }

    public void setData(DataDto data) {
        this.data = data;
    }
}
