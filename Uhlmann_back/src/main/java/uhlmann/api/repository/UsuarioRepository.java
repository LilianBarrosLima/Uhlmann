package uhlmann.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uhlmann.api.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsername(String username);

    boolean existsByUsername(String username);

    Optional<Usuario> findById(Integer id);
}