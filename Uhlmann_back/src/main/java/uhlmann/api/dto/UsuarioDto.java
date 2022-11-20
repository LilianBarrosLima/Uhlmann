package uhlmann.api.dto;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDto {

    private Integer id;

    private String nome;

    @Email
    private String email;

    private String username;
}