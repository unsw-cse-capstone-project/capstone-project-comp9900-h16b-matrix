package com.matrix.filmfinder.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Person {
    @Id
    @Column(name = "id")
    @NonNull
    private Integer id;
    @Column(name = "name")
    private String name;

    public Person() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return id.equals(person.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
