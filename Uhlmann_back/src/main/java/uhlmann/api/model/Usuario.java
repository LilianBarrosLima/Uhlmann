package uhlmann.api.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 30)
    @NotEmpty(message = "{campo.nome.obrigatorio}")
    private String nome;

    @Column(nullable = false, length = 30)
    @NotNull(message = "{campo.email.obrigatorio}")
    private String email;

    @Column(unique = true, name = "login")
    @NotEmpty(message = "{campo.login.obrigatorio}")
    private String username;

    @Column(name = "pass")
    @NotEmpty(message = "{campo.senha.obrigatorio}")
    private String password;
}