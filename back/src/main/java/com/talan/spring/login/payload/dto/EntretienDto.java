package com.talan.spring.login.payload.dto;

import com.talan.spring.login.models.*;

public class EntretienDto {
    private int idDossier;

    private EStateEntretien state;
    private long id;

    private DataDto data;

    public int getIdDossier() {
        return idDossier;
    }

    public void setIdDossier(int idDossier) {
        this.idDossier = idDossier;
    }

    public EStateEntretien getState() {
        return state;
    }

    public void setState(EStateEntretien state) {
        this.state = state;
    }

    public DataDto getData() {
        return data;
    }

    public void setData(DataDto data) {
        this.data = data;
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
