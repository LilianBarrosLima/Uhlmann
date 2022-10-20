package uhlmann.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import javax.persistence.Column;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import uhlmann.api.dto.FormularioDto;
import uhlmann.api.model.Formulario;
import uhlmann.api.model.Usuario;
import uhlmann.api.repository.FormularioRepository;
import uhlmann.api.repository.UsuarioRepository;

@RestController
@RequestMapping("/formularios")
@RequiredArgsConstructor
@Api(value = "Rest Formularios")
@CrossOrigin(origins="*")
public class FormularioController{
    private final FormularioRepository repository;
    private final UsuarioRepository usuarioRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Esse método salva um formulario.")
    public Formulario salvar(@RequestBody @Valid FormularioDto dto ){
        Integer idUsuario = dto.getIdUsuario();
        Usuario usuario =
                usuarioRepository
                        .findById(idUsuario)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST, "Usuario inexistente."));

        Formulario formularios = new Formulario();
        formularios.setDataCadastro(dto.getDataCadastro());
        formularios.setFerramentalDeFormacao(dto.getFerramentalDeFormacao());
        formularios.setUsuario(usuario);
        formularios.setFabricanteDePVC(dto.getFabricanteDePVC());
        formularios.setQuantidadeDoBlister(dto.getQuantidadeDoBlister());
        formularios.setVelocidadeRPM(dto.setVelocidadeRPM());
        formularios.setSuperiorInferior1(dto.getSuperiorInferior1());
        formularios.setSuperiorInferior2(dto.getSuperiorInferior2());
        formularios.setSuperiorInferior3(dto.getSuperiorInferior3());
        formularios.setPreAquecimento(dto.getPreAquecimento());
        formularios.setRetardoDeAbertura(dto.getRetardoDeAbertura());
        formularios.setTempoDeFormacao(dto.getTempoDeFormacao());
        formularios.setOffsetDoAr(dto.getOffsetDoAr());
        formularios.setProfundidadeDaBolsa(dto.getProfundidadeDaBolsa());
        formularios.setTempoDeTransporte(dto.getTempoDeTransporte());
        formularios.setOffsetDeCorrecao(dto.getOffsetDeCorrecao());
        formularios.setProblemas(dto.getProblemas());

        return repository.save(formularios);
    }

    @GetMapping(value="")
    @ApiOperation("Esse método retorna uma lista de formularios.")
    public List<Formulario> obterTodos(){
        return repository.findAll();
    }

    @GetMapping("{ferramentalDeFormacao}")
    @ApiOperation("Esse método retorna um formulario consultando pelo id.")
    public Optional<Formulario> acharPorFerramental( @PathVariable String ferramentalDeFormacao ){
        return Optional.ofNullable(repository
                .findByFerramentalDeFormacao(ferramentalDeFormacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formulario não encontrado")));
    }

    @DeleteMapping("{ferramentalDeFormacao}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Esse método apaga um formulario pelo id.")
    public void deletar( @PathVariable String ferramentalDeFormacao ){
        repository
                .findByFerramentalDeFormacao(ferramentalDeFormacao)
                .map( formulario -> {
                    repository.delete(formulario);
                    return Void.TYPE;
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formulario não encontrado") );
    }

    @PutMapping("{ferramentalDeFormacao}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation("Esse método atualiza um formulario.")
    public void atualizar( @PathVariable String ferramentalDeFormacao,
                           @RequestBody @Valid Formulario formularioAtualizado ) {
        repository
                .findByFerramentalDeFormacao(ferramentalDeFormacao)
                .map( formulario -> {
                    formulario.setDataCadastro(formularioAtualizado.getDataCadastro());
                    formulario.setFerramentalDeFormacao(formularioAtualizado.getFerramentalDeFormacao());
                    //formulario.setUsuario(usuario);
                    formulario.setFabricanteDePVC(formularioAtualizado.getFabricanteDePVC());
                    formulario.setQuantidadeDoBlister(formularioAtualizado.getQuantidadeDoBlister());
                    formulario.setSuperiorInferior1(formularioAtualizado.getSuperiorInferior1());
                    formulario.setSuperiorInferior2(formularioAtualizado.getSuperiorInferior2());
                    formulario.setSuperiorInferior3(formularioAtualizado.getSuperiorInferior3());
                    formulario.setPreAquecimento(formularioAtualizado.getPreAquecimento());
                    formulario.setRetardoDeAbertura(formularioAtualizado.getRetardoDeAbertura());
                    formulario.setTempoDeFormacao(formularioAtualizado.getTempoDeFormacao());
                    formulario.setOffsetDoAr(formularioAtualizado.getOffsetDoAr());
                    formulario.setProfundidadeDaBolsa(formularioAtualizado.getProfundidadeDaBolsa());
                    formulario.setTempoDeTransporte(formularioAtualizado.getTempoDeTransporte());
                    formulario.setOffsetDeCorrecao(formularioAtualizado.getOffsetDeCorrecao());
                    formulario.setProblemas(formularioAtualizado.getProblemas());
                    formulario.setDataEdicao(formularioAtualizado.getDataEdicao());
                    return repository.save(formulario);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formulario não encontrado") );
    }
}
