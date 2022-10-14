package uhlmann.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import uhlmann.api.exception.UsuarioCadastradoException;
import uhlmann.api.model.Usuario;
import uhlmann.api.repository.UsuarioRepository;
import uhlmann.api.service.UsuarioService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@Api(value = "Rest Cadastro Usuario")
@CrossOrigin(origins="*")
public class UsuarioController {

    private final UsuarioService service;
    private final UsuarioRepository repository;

    @GetMapping(value="")
    @ApiOperation("Esse método exibe uma lista de usuarios.")
    public List<Usuario> obterTodos(){
        return repository.findAll();
    }

    @GetMapping("{id}")
    @ApiOperation("Esse método exibe um usuario pelo id.")
    public Usuario acharPorId( @PathVariable Integer id ){
        return repository
                .findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado") );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Esse método salva um usuario.")
    public void salvar(@RequestBody @Valid Usuario usuario){
        try{
            service.salvar(usuario);
        }catch (UsuarioCadastradoException e){
            throw new ResponseStatusException( HttpStatus.BAD_REQUEST, e.getMessage() );
        }
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Esse método apaga um usuario.")
    public void deletar( @PathVariable Integer id ){
        repository
                .findById(id)
                .map( usuario -> {
                    repository.delete(usuario);
                    return Void.TYPE;
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado") );
    }
    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Esse método altera um usuario.")
    public void atualizar( @PathVariable Integer id,
                           @RequestBody @Valid Usuario usuarioAtualizado ) {
        repository
                .findById(id)
                .map( usuario -> {
                    usuario.setNome(usuarioAtualizado.getNome());
                    usuario.setEmail(usuarioAtualizado.getEmail());
                    usuario.setUsername(usuarioAtualizado.getUsername());
                    usuario.setPassword(usuarioAtualizado.getPassword());
                    return repository.save(usuario);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado") );
    }
}