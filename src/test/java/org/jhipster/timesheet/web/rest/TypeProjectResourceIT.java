package org.jhipster.timesheet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.jhipster.timesheet.IntegrationTest;
import org.jhipster.timesheet.domain.TypeProject;
import org.jhipster.timesheet.repository.TypeProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TypeProjectResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TypeProjectResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/type-projects";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TypeProjectRepository typeProjectRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeProjectMockMvc;

    private TypeProject typeProject;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeProject createEntity(EntityManager em) {
        TypeProject typeProject = new TypeProject().type(DEFAULT_TYPE);
        return typeProject;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeProject createUpdatedEntity(EntityManager em) {
        TypeProject typeProject = new TypeProject().type(UPDATED_TYPE);
        return typeProject;
    }

    @BeforeEach
    public void initTest() {
        typeProject = createEntity(em);
    }

    @Test
    @Transactional
    void createTypeProject() throws Exception {
        int databaseSizeBeforeCreate = typeProjectRepository.findAll().size();
        // Create the TypeProject
        restTypeProjectMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeProject)))
            .andExpect(status().isCreated());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeCreate + 1);
        TypeProject testTypeProject = typeProjectList.get(typeProjectList.size() - 1);
        assertThat(testTypeProject.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void createTypeProjectWithExistingId() throws Exception {
        // Create the TypeProject with an existing ID
        typeProject.setId(1L);

        int databaseSizeBeforeCreate = typeProjectRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeProjectMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeProject)))
            .andExpect(status().isBadRequest());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTypeProjects() throws Exception {
        // Initialize the database
        typeProjectRepository.saveAndFlush(typeProject);

        // Get all the typeProjectList
        restTypeProjectMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeProject.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }

    @Test
    @Transactional
    void getTypeProject() throws Exception {
        // Initialize the database
        typeProjectRepository.saveAndFlush(typeProject);

        // Get the typeProject
        restTypeProjectMockMvc
            .perform(get(ENTITY_API_URL_ID, typeProject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeProject.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }

    @Test
    @Transactional
    void getNonExistingTypeProject() throws Exception {
        // Get the typeProject
        restTypeProjectMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTypeProject() throws Exception {
        // Initialize the database
        typeProjectRepository.saveAndFlush(typeProject);

        int databaseSizeBeforeUpdate = typeProjectRepository.findAll().size();

        // Update the typeProject
        TypeProject updatedTypeProject = typeProjectRepository.findById(typeProject.getId()).get();
        // Disconnect from session so that the updates on updatedTypeProject are not directly saved in db
        em.detach(updatedTypeProject);
        updatedTypeProject.type(UPDATED_TYPE);

        restTypeProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTypeProject.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTypeProject))
            )
            .andExpect(status().isOk());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeUpdate);
        TypeProject testTypeProject = typeProjectList.get(typeProjectList.size() - 1);
        assertThat(testTypeProject.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingTypeProject() throws Exception {
        int databaseSizeBeforeUpdate = typeProjectRepository.findAll().size();
        typeProject.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, typeProject.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeProject))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTypeProject() throws Exception {
        int databaseSizeBeforeUpdate = typeProjectRepository.findAll().size();
        typeProject.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeProjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeProject))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTypeProject() throws Exception {
        int databaseSizeBeforeUpdate = typeProjectRepository.findAll().size();
        typeProject.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeProjectMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeProject)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTypeProjectWithPatch() throws Exception {
        // Initialize the database
        typeProjectRepository.saveAndFlush(typeProject);

        int databaseSizeBeforeUpdate = typeProjectRepository.findAll().size();

        // Update the typeProject using partial update
        TypeProject partialUpdatedTypeProject = new TypeProject();
        partialUpdatedTypeProject.setId(typeProject.getId());

        restTypeProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeProject.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeProject))
            )
            .andExpect(status().isOk());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeUpdate);
        TypeProject testTypeProject = typeProjectList.get(typeProjectList.size() - 1);
        assertThat(testTypeProject.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateTypeProjectWithPatch() throws Exception {
        // Initialize the database
        typeProjectRepository.saveAndFlush(typeProject);

        int databaseSizeBeforeUpdate = typeProjectRepository.findAll().size();

        // Update the typeProject using partial update
        TypeProject partialUpdatedTypeProject = new TypeProject();
        partialUpdatedTypeProject.setId(typeProject.getId());

        partialUpdatedTypeProject.type(UPDATED_TYPE);

        restTypeProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeProject.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeProject))
            )
            .andExpect(status().isOk());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeUpdate);
        TypeProject testTypeProject = typeProjectList.get(typeProjectList.size() - 1);
        assertThat(testTypeProject.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingTypeProject() throws Exception {
        int databaseSizeBeforeUpdate = typeProjectRepository.findAll().size();
        typeProject.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, typeProject.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeProject))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTypeProject() throws Exception {
        int databaseSizeBeforeUpdate = typeProjectRepository.findAll().size();
        typeProject.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeProjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeProject))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTypeProject() throws Exception {
        int databaseSizeBeforeUpdate = typeProjectRepository.findAll().size();
        typeProject.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeProjectMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(typeProject))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeProject in the database
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTypeProject() throws Exception {
        // Initialize the database
        typeProjectRepository.saveAndFlush(typeProject);

        int databaseSizeBeforeDelete = typeProjectRepository.findAll().size();

        // Delete the typeProject
        restTypeProjectMockMvc
            .perform(delete(ENTITY_API_URL_ID, typeProject.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeProject> typeProjectList = typeProjectRepository.findAll();
        assertThat(typeProjectList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
