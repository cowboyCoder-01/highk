package com.highk.model;

import javax.persistence.Entity;    // JPA annotation for entity
import javax.persistence.Id;       // JPA annotation for primary key
import javax.persistence.Column;    // JPA annotation for specifying column details
import javax.persistence.Table;     // JPA annotation for table mapping

@Entity
@Table(name = "people")  // Specifies the name of the table in the database
public class User {

    @Id  // Username is now the primary key
    @Column(name = "username", unique = true, nullable = false) // Username is unique and non-nullable
    private String username;

    @Column(name = "firstname", nullable = false) // First Name column (non-nullable)
    private String firstName;

    @Column(name = "lastname", nullable = false)  // Last Name column (non-nullable)
    private String lastName;

    @Column(name = "password", nullable = false) // Password column (non-nullable)
    private String password;

    @Column(name = "email", nullable = false) // Email column (non-nullable)
    private String email;

    // Constructors
    public User() {
        // Default constructor for JPA
    }

    public User(String username, String firstName, String lastName, String password, String email) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Optionally override toString, equals, and hashCode if necessary
    @Override
    public String toString() {
        return "User{" +
               "username='" + username + '\'' +
               ", firstName='" + firstName + '\'' +
               ", lastName='" + lastName + '\'' +
               ", email='" + email + '\'' +
               '}';
    }
}
