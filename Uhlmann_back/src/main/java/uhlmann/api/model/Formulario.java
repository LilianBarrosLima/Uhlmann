package uhlmann.api.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
public class Formulario {

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss", timezone = "GMT-3")
	@Column(name = "data_cadastro", updatable = false)//updatable: Not null when update
    private Date dataCadastro;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss", timezone = "GMT-3")
    @Column(name = "data_edicao")
    private Date dataEdicao;

	@Id
    private String ferramentalDeFormacao;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    
    @Column(nullable = false, length = 10)
    private String fabricanteDePVC;
    
    @Column(length = 2)
    private int quantidadeDoBlister;
    
    @Column(length = 3)
    private int superiorInferior1; 
    
    @Column(length = 3)
    private int superiorInferior2; 
    
    @Column(length = 3)
    private int superiorInferior3; 
    
    @Column(length = 1)
    private int preAquecimento;
    
    @Column(length = 1)
    private int retardoDeAbertura;
    
    @Column(length = 3)
    private int tempoDeFormacao;
    
    @Column(length = 3)
    private float offsetDoAr;
    
    @Column(length = 4)
    private int profundidadeDaBolsa;
    
    @Column(length = 3)
    private float tempoDeTransporte;
    
    @Column(length = 4)
    private float offsetDeCorrecao;
    
    @Column(length = 200)
    private String problemas;
    
}

