package org.jhipster.timesheet.repository;

import org.jhipster.timesheet.domain.TypeProject;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TypeProject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeProjectRepository extends JpaRepository<TypeProject, Long> {}
