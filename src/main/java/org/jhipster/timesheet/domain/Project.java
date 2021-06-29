package org.jhipster.timesheet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "project_name")
    private String projectName;

    @OneToMany(mappedBy = "project")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "userInfo", "project" }, allowSetters = true)
    private Set<Module> modules = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "projects" }, allowSetters = true)
    private Client client;

    @ManyToOne
    @JsonIgnoreProperties(value = { "projects" }, allowSetters = true)
    private TypeProject typeProject;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project id(Long id) {
        this.id = id;
        return this;
    }

    public String getProjectName() {
        return this.projectName;
    }

    public Project projectName(String projectName) {
        this.projectName = projectName;
        return this;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public Set<Module> getModules() {
        return this.modules;
    }

    public Project modules(Set<Module> modules) {
        this.setModules(modules);
        return this;
    }

    public Project addModule(Module module) {
        this.modules.add(module);
        module.setProject(this);
        return this;
    }

    public Project removeModule(Module module) {
        this.modules.remove(module);
        module.setProject(null);
        return this;
    }

    public void setModules(Set<Module> modules) {
        if (this.modules != null) {
            this.modules.forEach(i -> i.setProject(null));
        }
        if (modules != null) {
            modules.forEach(i -> i.setProject(this));
        }
        this.modules = modules;
    }

    public Client getClient() {
        return this.client;
    }

    public Project client(Client client) {
        this.setClient(client);
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public TypeProject getTypeProject() {
        return this.typeProject;
    }

    public Project typeProject(TypeProject typeProject) {
        this.setTypeProject(typeProject);
        return this;
    }

    public void setTypeProject(TypeProject typeProject) {
        this.typeProject = typeProject;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Project)) {
            return false;
        }
        return id != null && id.equals(((Project) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", projectName='" + getProjectName() + "'" +
            "}";
    }
}
