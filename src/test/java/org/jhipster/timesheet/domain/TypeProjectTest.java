package org.jhipster.timesheet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.jhipster.timesheet.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TypeProjectTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeProject.class);
        TypeProject typeProject1 = new TypeProject();
        typeProject1.setId(1L);
        TypeProject typeProject2 = new TypeProject();
        typeProject2.setId(typeProject1.getId());
        assertThat(typeProject1).isEqualTo(typeProject2);
        typeProject2.setId(2L);
        assertThat(typeProject1).isNotEqualTo(typeProject2);
        typeProject1.setId(null);
        assertThat(typeProject1).isNotEqualTo(typeProject2);
    }
}
