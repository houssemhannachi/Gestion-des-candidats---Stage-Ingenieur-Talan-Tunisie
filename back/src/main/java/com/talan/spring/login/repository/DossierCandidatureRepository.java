package com.talan.spring.login.repository;


import com.talan.spring.login.models.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;


@Repository
public interface DossierCandidatureRepository extends JpaRepository<DossierCandidature, Integer> {
    List<DossierCandidature> findDossierCandidatureByUser_Id(long id);

    List<DossierCandidature> findDossierCandidatureByCandidat_IdCandidat(int id);
}
