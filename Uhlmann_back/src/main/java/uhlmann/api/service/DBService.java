package uhlmann.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uhlmann.api.model.Usuario;
import uhlmann.api.repository.UsuarioRepository;

import java.util.Arrays;

@Service
public class DBService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public void instanciaBaseDeDados() throws NullPointerException{
        Usuario user = new Usuario(null, "Davi E Santos", "davi@uhlmann.com", "Davi", "123");
        usuarioRepository.saveAll(Arrays.asList(user));

    }
}
