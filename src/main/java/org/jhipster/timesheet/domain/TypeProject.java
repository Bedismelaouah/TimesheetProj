package org.jhipster.timesheet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TypeProject.
 */
@Entity
@Table(name = "type_project")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TypeProject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "type")
    private String type;

    @OneToMany(mappedBy = "typeProject")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "modules", "client", "typeProject" }, allowSetters = true)
    private Set<Project> projects = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TypeProject id(Long id) {
        this.id = id;
        return this;
    }

    public String getType() {
        return this.type;
    }

    public TypeProject type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Project> getProjects() {
        return this.projects;
    }

    public TypeProject projects(Set<Project> projects) {
        this.setProjects(projects);
        return this;
    }

    public TypeProject addProject(Project project) {
        this.projects.add(project);
        project.setTypeProject(this);
        return this;
    }

    public TypeProject removeProject(Project project) {
        this.projects.remove(project);
        project.setTypeProject(null);
        return this;
    }

    public void setProjects(Set<Project> projects) {
        if (this.projects != null) {
            this.projects.forEach(i -> i.setTypeProject(null));
        }
        if (projects != null) {
            projects.forEach(i -> i.setTypeProject(this));
        }
        this.projects = projects;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypeProject)) {
            return false;
        }
        return id != null && id.equals(((TypeProject) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TypeProject{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
