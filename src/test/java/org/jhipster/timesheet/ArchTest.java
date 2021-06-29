package org.jhipster.timesheet;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("org.jhipster.timesheet");

        noClasses()
            .that()
            .resideInAnyPackage("org.jhipster.timesheet.service..")
            .or()
            .resideInAnyPackage("org.jhipster.timesheet.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..org.jhipster.timesheet.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
