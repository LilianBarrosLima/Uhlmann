package uhlmann.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import uhlmann.api.model.Formulario;

public interface FormularioRepository extends JpaRepository<Formulario, String>{

    Optional<Formulario> findByFerramentalDeFormacao(String ferramentalDeFormacao);
    boolean existsByFerramentalDeFormacao (String ferramentalDeFormacao);
}




	
