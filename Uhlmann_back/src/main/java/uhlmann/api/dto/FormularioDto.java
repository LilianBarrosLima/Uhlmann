package uhlmann.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FormularioDto {

    private Date dataCadastro;

    private String ferramentalDeFormacao;

    private Integer idUsuario;

    private String fabricanteDePVC;

    private int quantidadeDoBlister;

    private int superiorInferior1;

    private int superiorInferior2;

    private int superiorInferior3;

    private int preAquecimento;

    private int retardoDeAbertura;

    private int tempoDeFormacao;

    private float offsetDoAr;

    private int profundidadeDaBolsa;

    private float tempoDeTransporte;

    private float offsetDeCorrecao;

    private String problemas;
}
